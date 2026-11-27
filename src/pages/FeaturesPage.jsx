import React from 'react';
import BackButton from '../components/BackButton';
import '../components/ContentPage.css';

export default function FeaturesPage() {
  return (
    <div className="page-container">
      <BackButton />
      <div className="page-header">
        <h1 className="page-title text-cyan">Everything you need to run your business.</h1>
        <p className="page-subtitle">Botanico ERP provides a comprehensive suite of tools to manage sales, inventory, and finances from a single platform.</p>
      </div>
      <div className="content-section">
        <h2>Point of Sale (POS)</h2>
        <p>A fast, reliable checkout system designed for both in-store and online sales.</p>
        <ul className="content-list">
          <li>Quick product search and barcode scanning</li>
          <li>Multiple payment methods (Cash, Card, Mobile Money)</li>
          <li>Offline mode support for uninterrupted sales</li>
        </ul>
      </div>
      <div className="content-section">
        <h2>Inventory Management</h2>
        <p>Keep accurate track of your stock across all branches in real-time.</p>
        <ul className="content-list">
          <li>Automated stock deductions on sales</li>
          <li>Low stock alerts and reorder points</li>
          <li>Stock transfers between branches</li>
        </ul>
      </div>
      <div className="content-section">
        <h2>Financial Reporting</h2>
        <p>Make informed decisions with detailed financial and operational reports.</p>
        <ul className="content-list">
          <li>Daily sales summaries and profit margins</li>
          <li>Tax collection reports</li>
          <li>Customer and supplier ledgers</li>
        </ul>
      </div>
    </div>
  );
}
