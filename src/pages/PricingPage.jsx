import React from 'react';
import BackButton from '../components/BackButton';
import '../components/ContentPage.css';

export default function PricingPage() {
  return (
    <div className="page-container">
      <BackButton />
      <div className="page-header">
        <h1 className="page-title text-cyan">Simple, transparent pricing.</h1>
        <p className="page-subtitle">Choose the plan that fits your business stage.</p>
      </div>
      <div className="pricing-grid">
        <div className="pricing-tier">
          <h3>Starter</h3>
          <div className="pricing-price">$19<span style={{fontSize: '14px', color: '#6B7280'}}>/mo</span></div>
          <p>Perfect for single-store businesses.</p>
          <button className="pricing-btn">Choose Starter</button>
        </div>
        <div className="pricing-tier" style={{ borderTopColor: '#111827' }}>
          <h3>Growth</h3>
          <div className="pricing-price">$49<span style={{fontSize: '14px', color: '#6B7280'}}>/mo</span></div>
          <p>For expanding businesses with multiple branches.</p>
          <button className="pricing-btn">Choose Growth</button>
        </div>
        <div className="pricing-tier">
          <h3>Enterprise</h3>
          <div className="pricing-price">Custom</div>
          <p>Advanced controls and dedicated support.</p>
          <button className="pricing-btn">Contact Sales</button>
        </div>
      </div>
    </div>
  );
}
