import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

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
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CashierDashboard from './pages/CashierDashboard';

function AppContent() {
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  const isERPPage = ['/dashboard', '/cashier'].includes(location.pathname);

  return (
    <>
      <ScrollToTop />

      <div className={`app-shell${isLoginPage ? ' login-shell' : ''}${isERPPage ? ' erp-shell' : ''}`}>
        {!isLoginPage && !isERPPage && <AppHeader />}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/cashier" element={<CashierDashboard />} />

            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/hardware" element={<HardwarePage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/help" element={<HelpPage />} />
            <Route path="/api" element={<ApiPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </main>

        {!isLoginPage && !isERPPage && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
