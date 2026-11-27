import React from 'react';
import { ShieldCheck, MapPin, Calculator, BarChart2, Layers, CreditCard } from 'lucide-react';
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
          <div className="hero-logos">
            <div className="hero-logo-placeholder"></div>
            <div className="hero-logo-placeholder"></div>
            <div className="hero-logo-placeholder"></div>
          </div>
        </div>
        <div className="hero-image-container">
          <ProtectedImage src="/images/image1.png" alt="ERP Hero Illustration" className="hero-img" />
        </div>
      </section>

      {/* 2. Alternating Section 1 */}
      <section className="section section-alt">
        <div className="split-layout">
          <div className="split-content">
            <h2 className="section-title text-cyan">Sell in-store and online simultaneously.</h2>
            <p className="section-text">
              Integrate your offline and online sales. Monitor all transactions from a single dashboard without the hassle.
            </p>
          </div>
          <div className="split-image-container">
            <ProtectedImage src="/images/image2.png" alt="Online and Offline Sales" className="section-img" />
          </div>
        </div>
      </section>

      {/* 3. Alternating Section 2 */}
      <section className="section">
        <div className="split-layout reverse">
          <div className="split-content">
            <h2 className="section-title text-cyan">Set up your POS system in minutes.</h2>
            <p className="section-text">
              No technical skills required. Add products, set prices, and start accepting payments quickly.
            </p>
            <div className="hero-logos" style={{ marginTop: '24px' }}>
               <div className="hero-logo-placeholder"></div>
               <div className="hero-logo-placeholder"></div>
               <div className="hero-logo-placeholder"></div>
            </div>
          </div>
          <div className="split-image-container">
            <ProtectedImage src="/images/image3.png" alt="POS Setup" className="section-img" />
          </div>
        </div>
      </section>

      {/* 4. Features Grid */}
      <section className="section section-alt">
        <div className="features-header">
          <h2>Features that meet all your needs.</h2>
          <a href="#">View all features &rarr;</a>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-placeholder"><ShieldCheck size={24} /></div>
            <h3>Role & Access Control</h3>
            <p>Manage user access and ensure your business data remains secure.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-placeholder"><MapPin size={24} /></div>
            <h3>Inventory Management</h3>
            <p>Track stock in real-time across all your store branches.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-placeholder"><Calculator size={24} /></div>
            <h3>Customer Management</h3>
            <p>Store customer data and build loyalty with special programs.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-placeholder"><BarChart2 size={24} /></div>
            <h3>Comprehensive Reports</h3>
            <p>Gain business insights from detailed sales and financial reports.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-placeholder"><Layers size={24} /></div>
            <h3>Multi-Store Support</h3>
            <p>Manage multiple branches with one account and a single dashboard.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-placeholder"><CreditCard size={24} /></div>
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
            <ProtectedImage src="/images/image4.png" alt="Payment Hardware" className="section-img" />
          </div>
        </div>
      </section>
    </div>
  );
}
