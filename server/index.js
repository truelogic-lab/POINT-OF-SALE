require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
  throw new Error('DATABASE_URL and JWT_SECRET are required.');
}

if (process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must contain at least 32 characters.');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

app.disable('x-powered-by');
app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));
app.use(require('cookie-parser')());

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Try again later.' },
});

const COOKIE_NAME = 'botanico_session';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 8 * 60 * 60 * 1000,
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Botanico ERP API is running' });
});

// Manager authentication
app.post('/api/auth/login', loginLimiter, async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password || email.length > 254 || password.length > 128) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const result = await pool.query(`
      SELECT
        u.id,
        u.email,
        u."passwordHash",
        u."firstName",
        u."lastName",
        u."isActive",
        COALESCE(
          ARRAY_AGG(DISTINCT r.name)
          FILTER (WHERE r.name IS NOT NULL),
          ARRAY[]::text[]
        ) AS roles
      FROM users u
      LEFT JOIN user_roles ur ON ur."userId" = u.id
      LEFT JOIN roles r ON r.id = ur."roleId"
      WHERE LOWER(u.email) = $1
      GROUP BY u.id
      LIMIT 1
    `, [email]);

    const user = result.rows[0];

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const validPassword = await argon2.verify(user.passwordHash, password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const allowedRoles = ['Super Admin', 'Branch Manager', 'Accountant'];

    if (!user.roles.some(role => allowedRoles.includes(role))) {
      return res.status(403).json({ message: 'This account cannot access manager login.' });
    }

    const branches = await pool.query(`
      SELECT b.id, b.name, b."businessId"
      FROM user_branch_access uba
      JOIN branches b ON b.id = uba."branchId"
      WHERE uba."userId" = $1
        AND b."isActive" = true
    `, [user.id]);

    if (branches.rows.length === 0) {
      return res.status(403).json({ message: 'No active branch access assigned.' });
    }

    const token = jwt.sign(
      { sub: user.id, jti: crypto.randomUUID() },
      process.env.JWT_SECRET,
      { expiresIn: '8h', issuer: 'botanico-erp', audience: 'botanico-client' }
    );

    await pool.query(
      'UPDATE users SET "lastLoginAt" = NOW(), "updatedAt" = NOW() WHERE id = $1',
      [user.id]
    );

    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);

    return res.json({
      message: 'Login successful.',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
        branches: branches.rows,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ message: 'Unable to complete login.' });
  }
});


// Cashier authentication using employee username and PIN.
app.post('/api/auth/cashier-login', loginLimiter, async (req, res) => {
  try {
    const username = String(req.body.username || '').trim();
    const pin = String(req.body.pin || '');

    if (!username || !/^[0-9]{4,8}$/.test(pin) || username.length > 80) {
      return res.status(400).json({ message: 'Invalid username or PIN.' });
    }

    const result = await pool.query(`
      SELECT
        u.id,
        u.email,
        u.username,
        u."pinHash",
        u."firstName",
        u."lastName",
        u."isActive",
        COALESCE(
          ARRAY_AGG(DISTINCT r.name)
          FILTER (WHERE r.name IS NOT NULL),
          ARRAY[]::text[]
        ) AS roles
      FROM users u
      LEFT JOIN user_roles ur ON ur."userId" = u.id
      LEFT JOIN roles r ON r.id = ur."roleId"
      WHERE LOWER(u.username) = LOWER($1)
      GROUP BY u.id
      LIMIT 1
    `, [username]);

    const user = result.rows[0];

    if (!user || !user.isActive || !user.pinHash) {
      return res.status(401).json({ message: 'Invalid username or PIN.' });
    }

    if (!user.roles.includes('Cashier')) {
      return res.status(403).json({ message: 'This account cannot access cashier login.' });
    }

    const validPin = await argon2.verify(user.pinHash, pin);

    if (!validPin) {
      return res.status(401).json({ message: 'Invalid username or PIN.' });
    }

    const branches = await pool.query(`
      SELECT b.id, b.name, b."businessId"
      FROM user_branch_access uba
      JOIN branches b ON b.id = uba."branchId"
      WHERE uba."userId" = $1
        AND b."isActive" = true
    `, [user.id]);

    if (branches.rows.length === 0) {
      return res.status(403).json({ message: 'No active branch access assigned.' });
    }

    const token = jwt.sign(
      { sub: user.id, jti: crypto.randomUUID() },
      process.env.JWT_SECRET,
      { expiresIn: '8h', issuer: 'botanico-erp', audience: 'botanico-client' }
    );

    await pool.query(
      'UPDATE users SET "lastLoginAt" = NOW(), "updatedAt" = NOW() WHERE id = $1',
      [user.id]
    );

    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);

    return res.json({
      message: 'Login successful.',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        roles: user.roles,
        branches: branches.rows,
      },
    });
  } catch (error) {
    console.error('Cashier login error:', error.message);
    return res.status(500).json({ message: 'Unable to complete login.' });
  }
});

// Verify session and load current account permissions.
async function authenticate(req, res, next) {
  try {
    const token = req.cookies?.[COOKIE_NAME];

    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'botanico-erp',
      audience: 'botanico-client',
    });

    const result = await pool.query(`
      SELECT
        u.id,
        u.email,
        u."firstName",
        u."lastName",
        u."isActive",
        COALESCE(
          ARRAY_AGG(DISTINCT r.name)
          FILTER (WHERE r.name IS NOT NULL),
          ARRAY[]::text[]
        ) AS roles
      FROM users u
      LEFT JOIN user_roles ur ON ur."userId" = u.id
      LEFT JOIN roles r ON r.id = ur."roleId"
      WHERE u.id = $1
      GROUP BY u.id
    `, [payload.sub]);

    const user = result.rows[0];

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Session is no longer valid.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired session.' });
  }
}

app.get('/api/auth/me', authenticate, async (req, res) => {
  try {
    const branches = await pool.query(`
      SELECT b.id, b.name, b."businessId"
      FROM user_branch_access uba
      JOIN branches b ON b.id = uba."branchId"
      WHERE uba."userId" = $1
        AND b."isActive" = true
    `, [req.user.id]);

    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        roles: req.user.roles,
        branches: branches.rows,
      },
    });
  } catch (error) {
    console.error('Session lookup error:', error.message);
    res.status(500).json({ message: 'Unable to load session.' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  res.json({ message: 'Logged out successfully.' });
});

app.get('/api/auth/protected', authenticate, (req, res) => {
  res.json({ message: 'Authenticated.', userId: req.user.id });
});

app.use((error, req, res, next) => {
  console.error('Server error:', error.message);
  res.status(500).json({ message: 'Internal server error.' });
});

pool.query('SELECT 1')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Botanico API running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });
