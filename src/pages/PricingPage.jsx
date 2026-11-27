import React from 'react';
import BackButton from '../components/BackButton';
import '../components/ContentPage.css';

const plans = [
  {
    name: 'Starter',
    price: '32,000',
    description: 'Perfect for single-store businesses.',
    features: [
      'Point of Sale',
      'Inventory Management',
      'Sales Management',
      'Customer Management',
      'Payment Management',
      'Sales Reports',
      'Business Records',
      'Mobile-friendly Access'
    ],
    button: 'Choose Starter'
  },
  {
    name: 'Growth',
    price: '64,000',
    description: 'For growing businesses with multiple branches.',
    features: [
      'Everything in Starter',
      'Multi-Store Management',
      'Branch-Level Operations',
      'Supplier Management',
      'Advanced Sales Reports',
      'Financial Reporting',
      'Staff Accounts',
      'Centralised Business Monitoring'
    ],
    button: 'Choose Growth',
    featured: true
  },
  {
    name: 'Enterprise',
    price: '96,000',
    description: 'For established businesses with advanced needs.',
    features: [
      'Everything in Growth',
      'Advanced Role and Access Control',
      'Centralised Business Management',
      'Advanced Business Insights',
      'Online and Offline Sales Monitoring',
      'Detailed Business Records',
      'Advanced Reporting',
      'Priority Support'
    ],
    button: 'Choose Enterprise'
  }
];

export default function PricingPage() {
  return (
    <div className="page-container">
      <BackButton />

      <div className="page-header">
        <h1 className="page-title text-cyan">
          Simple, transparent pricing.
        </h1>
        <p className="page-subtitle">
          Choose the Botanico ERP plan that fits your business.
          All prices are billed monthly in Kenyan Shillings.
        </p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div
            className="pricing-tier"
            key={plan.name}
            style={plan.featured ? { borderTopColor: '#111827' } : {}}
          >
            <h3>{plan.name}</h3>

            <div className="pricing-price">
              <span style={{ fontSize: '14px' }}>KSh </span>
              {plan.price}
              <span style={{ fontSize: '14px', color: '#6B7280' }}>
                /month
              </span>
            </div>

            <p>{plan.description}</p>

            <button className="pricing-btn">
              {plan.button}
            </button>

            <div className="pricing-features">
              <h4>What's included</h4>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className="pricing-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
