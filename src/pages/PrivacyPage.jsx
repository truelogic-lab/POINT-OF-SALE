import React from 'react';
import BackButton from '../components/BackButton';
import '../components/ContentPage.css';

export default function PrivacyPage() {
  return (
    <div className="page-container">
      <BackButton />
      <div className="page-header">
        <h1 className="page-title text-cyan">Privacy Policy</h1>
        <p className="page-subtitle">Last updated: October 2023</p>
      </div>
      <div className="content-section">
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us.</p>
      </div>
      <div className="content-section">
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to operate, maintain, and improve our services, and to provide customer support.</p>
      </div>
      <div className="content-section">
        <h2>3. Data Security</h2>
        <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.</p>
      </div>
    </div>
  );
}
