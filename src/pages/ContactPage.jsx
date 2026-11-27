import React from 'react';
import BackButton from '../components/BackButton';
import '../components/ContentPage.css';

export default function ContactPage() {
  return (
    <div className="page-container">
      <BackButton />
      <div className="page-header">
        <h1 className="page-title text-cyan">Get in touch</h1>
        <p className="page-subtitle">Our team is ready to assist you with any inquiries.</p>
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          <div className="content-section">
            <h2>Support</h2>
            <p>Email: support@botanico.com</p>
            <p>Phone: +254 136 726 609</p>
            <p>Hours: Mon-Sun, 8am - 6pm</p>
          </div>
        </div>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="warren musungu" required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="warrenmusungu3@gmail.com" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="How can we help you?" required></textarea>
          </div>
          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Send Message</button>
        </form>
      </div>
    </div>
  );
}
