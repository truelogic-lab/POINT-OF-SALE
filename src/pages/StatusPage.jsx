import React from 'react';
import BackButton from '../components/BackButton';
import '../components/ContentPage.css';

export default function StatusPage() {
  return (
    <div className="page-container">
      <BackButton />
      <div className="page-header">
        <h1 className="page-title text-cyan">System Status</h1>
        <p className="page-subtitle">Real-time status of Botanico services.</p>
      </div>
      <div className="content-section">
        <h2>Current Status: All Systems Operational</h2>
        <ul className="content-list">
          <li>Web Application: <span style={{color: '#06B6D4', fontWeight: 'bold'}}>Online</span></li>
          <li>Database: <span style={{color: '#06B6D4', fontWeight: 'bold'}}>Online</span></li>
          <li>API: <span style={{color: '#06B6D4', fontWeight: 'bold'}}>Online</span></li>
        </ul>
      </div>
    </div>
  );
}
