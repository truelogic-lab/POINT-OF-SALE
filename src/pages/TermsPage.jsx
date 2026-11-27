import React from 'react';
import BackButton from '../components/BackButton';
import '../components/ContentPage.css';

export default function TermsPage() {
  return (
    <div className="page-container">
      <BackButton />
      <div className="page-header">
        <h1 className="page-title text-cyan">Terms of Service</h1>
        <p className="page-subtitle">Last updated: October 2023</p>
      </div>
      <div className="content-section">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using the Botanico ERP platform, you agree to be bound by these Terms of Service.</p>
      </div>
      <div className="content-section">
        <h2>2. Use of Service</h2>
        <p>You agree to use the service only for lawful purposes and in accordance with these terms. You are responsible for maintaining the confidentiality of your account credentials.</p>
      </div>
      <div className="content-section">
        <h2>3. Termination</h2>
        <p>We reserve the right to suspend or terminate your access to the service at any time, without prior notice, for conduct that we believe violates these terms.</p>
      </div>
    </div>
  );
}
