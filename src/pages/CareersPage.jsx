import React from 'react';
import BackButton from '../components/BackButton';
import '../components/ContentPage.css';

export default function CareersPage() {
  return (
    <div className="page-container">
      <BackButton />
      <div className="page-header">
        <h1 className="page-title text-cyan">Join Our Team</h1>
        <p className="page-subtitle">Help us build the future of business management.</p>
      </div>
      <div className="content-section">
        <h2>Why Work at Botanico?</h2>
        <p>We are a remote-first team dedicated to solving complex problems for small businesses. We value autonomy, continuous learning, and a healthy work-life balance.</p>
      </div>
      <div className="content-section">
        <h2>Open Positions</h2>
        <p>We currently do not have any open positions. Check back later or send your resume to careers@botanico.com.</p>
      </div>
    </div>
  );
}
