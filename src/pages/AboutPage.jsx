import React from 'react';
import BackButton from '../components/BackButton';
import '../components/ContentPage.css';

export default function AboutPage() {
  return (
    <div className="page-container">
      <BackButton />
      <div className="page-header">
        <h1 className="page-title text-cyan">About Botanico</h1>
        <p className="page-subtitle">We build tools to help businesses grow efficiently.</p>
      </div>
      <div className="content-section">
        <h2>Our Mission</h2>
        <p>We believe that every business, regardless of size, deserves access to powerful, reliable software. Botanico was built to simplify complex operations, giving business owners the clarity they need to scale.</p>
      </div>
      <div className="content-section">
        <h2>Why Choose Us?</h2>
        <ul className="content-list">
          <li><strong>Built for speed:</strong> Our interface is designed for rapid transactions and zero downtime.</li>
          <li><strong>Data-driven:</strong> Real-time reporting ensures you always know exactly where your business stands.</li>
          <li><strong>Secure by default:</strong> Enterprise-grade security protocols protect your data.</li>
        </ul>
      </div>
    </div>
  );
}
