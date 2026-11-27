import React from 'react';
import {
  ShieldCheck,
  MapPin,
  Calculator,
  BarChart2,
  Layers,
  CreditCard
} from 'lucide-react';
import './LandingPage.css';

const ProtectedImage = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    draggable="false"
    onContextMenu={(e) => e.preventDefault()}
  />
);

const StoreBadge = ({ icon, smallText, storeName }) => (
  <a
    href="/"
    aria-label={`${storeName} - Botanico`}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      width: '132px',
      height: '44px',
      padding: '5px 9px',
      background: '#050505',
      color: '#ffffff',
      border: '1px solid #555555',
      borderRadius: '7px',
      textDecoration: 'none',
      boxSizing: 'border-box',
      flexShrink: 0
    }}
  >
    {icon}
    <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
      <span style={{ fontSize: '8px', opacity: 0.9 }}>{smallText}</span>
      <strong style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
        {storeName}
      </strong>
    </span>
  </a>
);

const StoreBadges = () => (
  <div
    className="hero-logos"
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '8px'
    }}
  >
    <StoreBadge
      smallText="GET IT ON"
      storeName="Google Play"
      icon={
        <svg width="23" height="23" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#00D7FE" d="M5.3 3.5C4.5 4.3 4 5.5 4 7v34c0 1.5.5 2.7 1.3 3.5L25 24z"/>
          <path fill="#00EF77" d="M5.3 3.5 29 27.2l7.1-7.1L9.3 3.3C7.8 2.4 6.3 2.5 5.3 3.5"/>
          <path fill="#FFBC00" d="m25 24 11.1-11.1 7.1 4.1c3.7 2.1 3.7 5.8 0 7.9l-7.1 4.1z"/>
          <path fill="#FF3A44" d="m5.3 44.5 23.7-23.7 7.1 7.1L9.3 44.7c-1.5.9-3 .8-4-.2"/>
        </svg>
      }
    />

    <StoreBadge
      smallText="DOWNLOAD ON THE"
      storeName="App Store"
      icon={
        <svg width="23" height="23" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
          <path d="M16.37 12.32c.02 2.14 1.88 2.85 1.9 2.86-.02.05-.3 1.02-.98 2.02-.59.87-1.2 1.74-2.16 1.76-.94.02-1.24-.57-2.32-.57-1.08 0-1.42.55-2.31.59-.93.04-1.64-.94-2.23-1.8-1.21-1.75-2.13-4.95-.89-7.1.62-1.07 1.72-1.75 2.91-1.77.91-.02 1.76.62 2.32.62.55 0 1.59-.77 2.68-.66.46.02 1.76.19 2.6 1.43-.07.04-1.55.9-1.52 2.62ZM14.6 7.95c.49-.59.82-1.4.73-2.21-.7.03-1.54.47-2.04 1.06-.45.52-.85 1.34-.74 2.13.78.06 1.57-.39 2.05-.98Z"/>
        </svg>
      }
    />
  </div>
);

export default function LandingPage() {
  return (
    <div className="landing-container">

      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title text-cyan">
            Point of sale system for every business.
          </h1>

          <p className="hero-subtitle">
            Manage your sales, inventory, and financial reports in one easy-to-use platform.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>

          <StoreBadges />
        </div>

        <div className="hero-image-container">
          <ProtectedImage
            src="/images/image1.png"
            alt="ERP Hero Illustration"
            className="hero-img"
          />
        </div>
      </section>

      {/* 2. Alternating Section 1 */}
      <section className="section section-alt">
        <div className="split-layout">
          <div className="split-content">
            <h2 className="section-title text-cyan">
              Sell in-store and online simultaneously.
            </h2>

            <p className="section-text">
              Integrate your offline and online sales. Monitor all transactions from a single dashboard without the hassle.
            </p>
          </div>

          <div className="split-image-container">
            <ProtectedImage
              src="/images/image2.png"
              alt="Online and Offline Sales"
              className="section-img"
            />
          </div>
        </div>
      </section>

      {/* 3. Alternating Section 2 */}
      <section className="section">
        <div className="split-layout reverse">
          <div className="split-content">
            <h2 className="section-title text-cyan">
              Set up your POS system in minutes.
            </h2>

            <p className="section-text">
              No technical skills required. Add products, set prices, and start accepting payments quickly.
            </p>

            <div style={{ marginTop: '24px' }}>
              <StoreBadges />
            </div>
          </div>

          <div className="split-image-container">
            <ProtectedImage
              src="/images/image3.png"
              alt="POS Setup"
              className="section-img"
            />
          </div>
        </div>
      </section>

      {/* 4. Features Grid */}
      <section className="section section-alt">
        <div className="features-header">
          <h2>Features that meet all your needs.</h2>
          <a href="/features">View all features &rarr;</a>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-placeholder">
              <ShieldCheck size={24} />
            </div>
            <h3>Role & Access Control</h3>
            <p>Manage user access and ensure your business data remains secure.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-placeholder">
              <MapPin size={24} />
            </div>
            <h3>Inventory Management</h3>
            <p>Track stock in real-time across all your store branches.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-placeholder">
              <Calculator size={24} />
            </div>
            <h3>Customer Management</h3>
            <p>Store customer data and build loyalty with special programs.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-placeholder">
              <BarChart2 size={24} />
            </div>
            <h3>Comprehensive Reports</h3>
            <p>Gain business insights from detailed sales and financial reports.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-placeholder">
              <Layers size={24} />
            </div>
            <h3>Multi-Store Support</h3>
            <p>Manage multiple branches with one account and a single dashboard.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-placeholder">
              <CreditCard size={24} />
            </div>
            <h3>Multi-Platform</h3>
            <p>Access the system from desktop, tablet, or smartphone anytime.</p>
          </div>
        </div>
      </section>

      {/* 5. Dark Section */}
      <section className="dark-section">
        <div className="split-layout">
          <div className="split-content">
            <h2>Start transactions using Bayar Hardware</h2>
            <p>Enhance customer experience with integrated payment hardware.</p>
          </div>

          <div className="split-image-container">
            <ProtectedImage
              src="/images/image4.png"
              alt="Payment Hardware"
              className="section-img"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
