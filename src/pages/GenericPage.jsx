import React from 'react';
import { useLocation } from 'react-router-dom';
import '../components/ContentPage.css';

export default function GenericPage() {
  const location = useLocation();
  // Format the path to look like a title (e.g., "/about" -> "About")
  const pageName = location.pathname.replace('/', '').replace('-', ' ');
  const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title text-cyan">{formattedName}</h1>
        <p className="page-subtitle">
          We are currently building this page. Please check back soon for updates.
        </p>
      </div>
    </div>
  );
}
