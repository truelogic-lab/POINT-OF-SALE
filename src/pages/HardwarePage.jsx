import React from 'react';
import BackButton from '../components/BackButton';
import '../components/ContentPage.css';

export default function HardwarePage() {
  return (
    <div className="page-container">
      <BackButton />
      <div className="page-header">
        <h1 className="page-title text-cyan">Payment Hardware</h1>
        <p className="page-subtitle">Reliable, fast, and secure hardware built for Botanico.</p>
      </div>
      <div className="content-section">
        <h2>Terminal Solutions</h2>
        <p>Our integrated POS terminals are designed to handle high-volume retail environments with ease. Accept chip, tap, and mobile payments seamlessly.</p>
        <ul className="content-list">
          <li>Dual-screen displays for customer interaction</li>
          <li>Built-in thermal receipt printers</li>
          <li>All-day battery life for mobile checkout</li>
        </ul>
      </div>
      <div className="content-section">
        <h2>Barcode Scanners & Printers</h2>
        <p>Speed up your checkout and inventory management with high-precision barcode scanners and fast label printers that integrate directly with the Botanico system.</p>
      </div>
    </div>
  );
}
