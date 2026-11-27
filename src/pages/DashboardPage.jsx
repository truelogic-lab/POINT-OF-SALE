import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch('/api/auth/me', {
      credentials: 'include',
    })
      .then(async (response) => {
        if (!response.ok) {
          navigate('/login', { replace: true });
          return null;
        }

        return response.json();
      })
      .then((data) => {
        if (!active || !data?.user) return;

        const roles = data.user.roles || [];

        if (roles.includes('Cashier')) {
          navigate('/cashier', { replace: true });
          return;
        }

        const allowedRoles = ['Super Admin', 'Branch Manager', 'Accountant'];

        if (!roles.some(role => allowedRoles.includes(role))) {
          navigate('/login', { replace: true });
          return;
        }

        setUser(data.user);
      })
      .catch(() => navigate('/login', { replace: true }))
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    navigate('/login', { replace: true });
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (!user) return null;

  return (
    <div style={{ padding: '32px' }}>
      <h1>Botanico ERP Dashboard</h1>
      <p>Welcome, {user.firstName} {user.lastName}</p>
      <p>{user.email}</p>
      <p>Role: {user.roles.join(', ')}</p>
      <p>Branch: {user.branches.map(branch => branch.name).join(', ')}</p>

      <button onClick={handleLogout}>Sign out</button>
    </div>
  );
}
