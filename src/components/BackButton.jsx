import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <Link to="/" className="back-home-btn">
      <ArrowLeft size={16} />
      Back to Home
    </Link>
  );
}
