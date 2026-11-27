import React from 'react';
import BackButton from '../components/BackButton';
import '../components/ContentPage.css';

export default function ApiPage() {
  return (
    <div className="page-container">
      <BackButton />
      <div className="page-header">
        <h1 className="page-title text-cyan">API Documentation</h1>
        <p className="page-subtitle">Build custom integrations with the Botanico REST API.</p>
      </div>
      <div className="content-section">
        <h2>Authentication</h2>
        <p>All API requests require a Bearer token passed in the Authorization header. You can generate an API key from your Botanico dashboard settings.</p>
      </div>
      <div className="content-section">
        <h2>Endpoints</h2>
        <ul className="content-list">
          <li><strong>GET /api/products</strong> - Retrieve a list of all products</li>
          <li><strong>POST /api/sales</strong> - Create a new sales order</li>
          <li><strong>GET /api/reports/daily</strong> - Retrieve daily sales metrics</li>
        </ul>
      </div>
    </div>
  );
}
