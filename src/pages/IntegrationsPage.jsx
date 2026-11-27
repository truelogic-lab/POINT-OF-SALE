import React from 'react';
import BackButton from '../components/BackButton';
import '../components/ContentPage.css';

export default function IntegrationsPage() {
  return (
    <div className="page-container">
      <BackButton />
      <div className="page-header">
        <h1 className="page-title text-cyan">Integrations</h1>
        <p className="page-subtitle">Connect Botanico with the tools you already use.</p>
      </div>
      <div className="content-section">
        <h2>Accounting & Finance</h2>
        <p>Sync your sales data directly to major accounting platforms to eliminate manual data entry and ensure your books are always up to date.</p>
        <ul className="content-list">
          <li>QuickBooks synchronization</li>
          <li>Xero integration</li>
          <li>Custom tax rate mapping</li>
        </ul>
      </div>
      <div className="content-section">
        <h2>E-commerce</h2>
        <p>Manage your online and offline inventory in one place. When an item sells online, Botanico automatically adjusts your in-store stock levels.</p>
        <ul className="content-list">
          <li>Shopify integration</li>
          <li>WooCommerce plugin</li>
          <li>Custom API webhooks for your own website</li>
        </ul>
      </div>
    </div>
  );
}
