import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import HardwarePage from './pages/HardwarePage';
import IntegrationsPage from './pages/IntegrationsPage';
import CareersPage from './pages/CareersPage';
import HelpPage from './pages/HelpPage';
import ApiPage from './pages/ApiPage';
import StatusPage from './pages/StatusPage';
import TermsPage from './pages/TermsPage';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-shell">
        <AppHeader />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            {/* Product */}
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/hardware" element={<HardwarePage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            
            {/* Company */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Support */}
            <Route path="/help" element={<HelpPage />} />
            <Route path="/api" element={<ApiPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            
            {/* Legal */}
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
