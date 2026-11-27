import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './AppHeader.css';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/features' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Hardware', path: '/hardware' },
  { label: 'Integrations', path: '/integrations' },
  { label: 'About', path: '/about' },
];

export default function AppHeader() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="app-header">
      <Link to="/" className="header-brand" onClick={closeMenu}>
        <img
          src="/images/logo.jpg"
          alt="Botanico Logo"
          className="header-logo-img"
          draggable="false"
        />
        <span className="header-brand-name">Botanico</span>
      </Link>

      <nav
        className={`header-nav${menuOpen ? ' menu-open' : ''}`}
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`header-nav-item${active ? ' active' : ''}`}
              aria-current={active ? 'page' : undefined}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          );
        })}

        <Link
          to="/contact"
          className="header-mobile-contact"
          onClick={closeMenu}
        >
          Contact Us
        </Link>
      </nav>

      <div className="header-actions">
        <Link to="/contact" className="header-contact-button">
          Contact Us
        </Link>

        <button
          type="button"
          className="header-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="header-navigation"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
    </header>
  );
}
