import React from 'react';
import BackButton from '../components/BackButton';
import './FeaturesPage.css';

const features = [
  {
    title: 'Point of Sale',
    description: 'Process customer transactions through a simple checkout experience designed for everyday business operations.',
    items: ['Quick product search', 'Barcode scanning support', 'Multiple payment methods']
  },
  {
    title: 'Inventory Management',
    description: 'Keep track of products, stock quantities and inventory movement across your business.',
    items: ['Real-time stock tracking', 'Low-stock monitoring', 'Stock movement records']
  },
  {
    title: 'Sales Management',
    description: 'Monitor business sales and understand how your products and branches are performing.',
    items: ['Sales tracking', 'Transaction history', 'Sales summaries']
  },
  {
    title: 'Customer Management',
    description: 'Organise customer information and maintain a clear history of customer transactions.',
    items: ['Customer records', 'Purchase history', 'Customer information']
  },
  {
    title: 'Payment Management',
    description: 'Manage payment records and keep track of the different ways customers pay.',
    items: ['Cash payments', 'Card payments', 'Mobile money records']
  },
  {
    title: 'Role and Access Control',
    description: 'Organise staff access and manage which parts of the system different users can access.',
    items: ['User accounts', 'Role-based permissions', 'Access management']
  },
  {
    title: 'Multi-Store Management',
    description: 'Manage business operations across multiple branches from one central platform.',
    items: ['Multiple branches', 'Branch-level operations', 'Centralised oversight']
  },
  {
    title: 'Online and Offline Sales',
    description: 'Bring your in-store and online sales operations together for easier business monitoring.',
    items: ['In-store transactions', 'Online sales monitoring', 'Unified sales overview']
  },
  {
    title: 'Access Across Devices',
    description: 'Use a responsive interface designed to work across desktop, tablet and mobile screens.',
    items: ['Desktop access', 'Tablet support', 'Mobile-friendly interface']
  },
  {
    title: 'Supplier Management',
    description: 'Keep supplier information organised to support your purchasing and stock operations.',
    items: ['Supplier records', 'Supplier information', 'Purchase organisation']
  },
  {
    title: 'Business Records',
    description: 'Keep important operational records organised and easier to review.',
    items: ['Transaction records', 'Product records', 'Operational history']
  },
  {
    title: 'Reports and Insights',
    description: 'Review business activity through organised reports that help you understand performance.',
    items: ['Daily sales summaries', 'Financial reports', 'Business performance']
  }
];

export default function FeaturesPage() {
  return (
    <div className="botanico-features">
      <BackButton />

      <section className="features-hero">
        <h1>
          Everything your business needs.
          <span> All in one place.</span>
        </h1>

        <p>
          Run your business with tools for sales, inventory, customers,
          payments and reporting. Botanico brings your essential business
          operations together in one platform.
        </p>

        <a href="/contact" className="features-primary-button">
          Get Started
        </a>
      </section>

      <section className="features-overview">
        <div className="features-section-heading">
          <h2>Explore Botanico Features</h2>
          <p>
            Everything you need to manage your daily business operations
            in one organised platform.
          </p>
        </div>

        <div className="features-list">
          {features.map((feature, index) => (
            <article className="feature-item" key={feature.title}>
              <span className="feature-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>

                <ul>
                  {feature.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="features-bottom-cta">
        <span>YOUR BUSINESS. ONE PLATFORM.</span>
        <h2>Ready to simplify the way you work?</h2>
        <p>
          Bring your business operations together with Botanico ERP.
        </p>
        <a href="/contact" className="features-primary-button">
          Talk to Our Team
        </a>
      </section>
    </div>
  );
}
