import React from 'react';
import {
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  CreditCard,
  ShieldCheck,
  Store,
  Globe,
  Monitor,
  Truck,
  ClipboardList,
  BarChart3
} from 'lucide-react';

import BackButton from '../components/BackButton';
import './FeaturesPage.css';

const features = [
  {
    icon: ShoppingCart,
    title: 'Point of Sale',
    description: 'Handle customer purchases quickly, record payments and keep track of every sale in one place.'
  },
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Know what products you have in stock, what is running low and what needs restocking.'
  },
  {
    icon: TrendingUp,
    title: 'Sales Management',
    description: 'Keep an eye on your sales, check past transactions and see how your business is performing.'
  },
  {
    icon: Users,
    title: 'Customer Management',
    description: 'Save customer details and easily check their previous purchases whenever you need to.'
  },
  {
    icon: CreditCard,
    title: 'Payment Management',
    description: 'Keep track of payments received from customers and see how each transaction was paid.'
  },
  {
    icon: ShieldCheck,
    title: 'Role and Access Control',
    description: 'Control who can access your system by giving staff the permissions they need to do their work.'
  },
  {
    icon: Store,
    title: 'Multi-Store Management',
    description: 'Manage different branches from one place and keep track of what is happening at each location.'
  },
  {
    icon: Globe,
    title: 'Online and Offline Sales',
    description: 'Keep track of sales made in your physical store and through your online channels.'
  },
  {
    icon: Monitor,
    title: 'Access Across Devices',
    description: 'Access Botanico from your computer, tablet or phone wherever you need to manage your business.'
  },
  {
    icon: Truck,
    title: 'Supplier Management',
    description: 'Keep supplier details organised and make it easier to manage the people who provide your stock.'
  },
  {
    icon: ClipboardList,
    title: 'Business Records',
    description: 'Keep your business information and transaction history organised so you can find records when needed.'
  },
  {
    icon: BarChart3,
    title: 'Reports and Insights',
    description: 'Check your sales and business reports to understand how your business is doing.'
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
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article className="feature-item" key={feature.title}>
                <span className="feature-icon">
                  <Icon size={25} strokeWidth={1.8} />
                </span>

                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            );
          })}
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
