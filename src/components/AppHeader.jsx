import React from 'react';
import {
  Home,
  LayoutDashboard,
  User,
  Settings,
  MessageSquare,
  Bell,
  ChevronDown,
} from 'lucide-react';
import './AppHeader.css';

const navItems = [
  { label: 'Home', icon: Home, active: true },
  { label: 'Dashboard', icon: LayoutDashboard, active: false },
  { label: 'Profile', icon: User, active: false },
  { label: 'Settings', icon: Settings, active: false },
];

export default function AppHeader() {
  return (
    <header className="app-header">
      {/* Left: Logo and Brand */}
      <div className="header-brand">
        <img 
          src="/images/logo.jpg" 
          alt="Botanico Logo" 
          className="header-logo-img" 
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
        <span className="header-brand-name">Botanico</span>
      </div>

      {/* Center: Navigation */}
      <nav className="header-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href="#"
              className={`header-nav-item${item.active ? ' active' : ''}`}
            >
              <Icon size={16} />
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Right: Actions */}
      <div className="header-actions">
        <button type="button" className="header-icon-button" aria-label="Messages">
          <MessageSquare size={20} />
        </button>
        <button type="button" className="header-icon-button" aria-label="Notifications">
          <Bell size={20} />
          <span className="header-notification-dot" />
        </button>

        <div className="header-divider" />

        <button type="button" className="header-dropdown">
          Sales
          <ChevronDown size={14} className="header-dropdown-chevron" />
        </button>
      </div>
    </header>
  );
}
