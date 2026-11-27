import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserRound, LockKeyhole, ArrowRight } from 'lucide-react';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState('manager');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const changeRole = (selectedRole) => {
    setRole(selectedRole);
    setUsername('');
    setPassword('');
    setMessage('');
    setShowPassword(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const endpoint = role === 'cashier'
        ? '/api/auth/cashier-login'
        : '/api/auth/login';

      const body = role === 'cashier'
        ? { username, pin: password }
        : { email: username, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Unable to sign in.');
        return;
      }

      navigate(role === 'cashier' ? '/cashier' : '/dashboard', { replace: true });
    } catch (error) {
      setMessage('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background-shape login-shape-one" />
      <div className="login-background-shape login-shape-two" />

      <div className="login-container">
        <section className="login-welcome">
          <div className="login-brand">
            <span className="login-brand-mark">B</span>
            <span>BOTANICO <small>ERP</small></span>
          </div>

          <div className="login-welcome-content">
            <span className="login-eyebrow">BUSINESS MANAGEMENT SYSTEM</span>
            <h1>Welcome<br />back.</h1>
            <h2>Your business, under control.</h2>
            <p>
              Manage your sales, inventory, customers and daily
              business operations from one place.
            </p>
          </div>

          <div className="login-welcome-footer">
            <span>BOTANICO ERP</span>
            <span>Simple business management.</span>
          </div>
        </section>

        <section className="login-form-section">
          <div className="login-form-wrapper">
            <div className="login-heading">
              <span className="login-mobile-brand">BOTANICO ERP</span>
              <h2>Sign in</h2>
              <p>Enter your account details to access your workspace.</p>
            </div>

            <div className="login-role-switch">
              <button
                type="button"
                className={role === 'manager' ? 'selected' : ''}
                onClick={() => changeRole('manager')}
              >
                Manager
              </button>

              <button
                type="button"
                className={role === 'cashier' ? 'selected' : ''}
                onClick={() => changeRole('cashier')}
              >
                Cashier
              </button>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="login-username">
                {role === 'manager' ? 'Email address' : 'Employee username'}
              </label>

              <div className="login-input-wrapper">
                <UserRound size={19} />
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder={
                    role === 'manager'
                      ? 'Enter your email address'
                      : 'Enter your employee username'
                  }
                  autoComplete="username"
                  required
                />
              </div>

              <label htmlFor="login-password">
                {role === 'manager' ? 'Password' : 'Assigned PIN'}
              </label>

              <div className="login-input-wrapper">
                <LockKeyhole size={19} />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={
                    role === 'manager'
                      ? 'Enter your password'
                      : 'Enter your assigned PIN'
                  }
                  autoComplete={role === 'manager' ? 'current-password' : 'off'}
                  inputMode={role === 'cashier' ? 'numeric' : undefined}
                  pattern={role === 'cashier' ? '[0-9]+' : undefined}
                  required
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {role === 'cashier' && (
                <p className="login-pin-note">
                  Your PIN is assigned by your manager. Contact your manager if you need a new PIN.
                </p>
              )}

              {role === 'manager' && (
                <div className="login-form-options">
                  <label className="login-remember">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                </div>
              )}

              {message && (
                <p className="login-message" role="alert">{message}</p>
              )}

              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="login-divider">
              <span>SECURE ACCESS</span>
            </div>

            <p className="login-help">
              Having trouble signing in? Contact your system administrator.
            </p>
          </div>
        </section>
      </div>

      <p className="login-copyright">
        © {new Date().getFullYear()} Botanico ERP. All rights reserved.
      </p>
    </div>
  );
}
