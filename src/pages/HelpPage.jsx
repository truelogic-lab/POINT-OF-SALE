import React from 'react';
import BackButton from '../components/BackButton';
import '../components/ContentPage.css';

export default function HelpPage() {
  return (
    <div className="page-container">
      <BackButton />
      <div className="page-header">
        <h1 className="page-title text-cyan">Help Center</h1>
        <p className="page-subtitle">Find answers to your questions about Botanico ERP.</p>
      </div>
      <div className="content-section">
        <h2>Getting Started</h2>
        <p>Learn how to set up your company profile, add your first product, and process a sale.</p>
        <ul className="content-list">
          <li>Creating your admin account</li>
          <li>Adding branches and users</li>
          <li>Importing your inventory via CSV</li>
        </ul>
      </div>
      <div className="content-section">
        <h2>Troubleshooting</h2>
        <p>Common issues and how to resolve them.</p>
        <ul className="content-list">
          <li>Resetting a forgotten password</li>
          <li>Syncing data offline</li>
          <li>Printer connectivity issues</li>
        </ul>
      </div>
    </div>
  );
}
