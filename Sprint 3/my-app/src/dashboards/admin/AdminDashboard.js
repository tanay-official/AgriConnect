// src/components/Dashboard.js
import React, { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, message: 'User John reported a product.' },
    { id: 2, message: 'Product "Fresh Mangoes" has low ratings.' },
    { id: 3, message: 'User Sarah flagged a seller.' }
  ];

  return (
    <div className="dashboard-container">
      <header className="top-bar">
        <div className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
          <Menu size={28} />
        </div>
        <div className="bell-icon" onClick={() => setShowNotifications(!showNotifications)}>
          <Bell size={28} />
          {notifications.length > 0 && (
            <span className="notification-count">{notifications.length}</span>
          )}
        </div>

        {showMenu && (
          <div className="dropdown-menu">
            <div onClick={() => navigate('/users')}>Users</div>
            <div onClick={() => navigate('/products')}>Products</div>
          </div>
        )}
        {showNotifications && (
          <div className="notification-dropdown">
            <h3>Notifications ({notifications.length})</h3>
            {notifications.map(notif => (
              <div key={notif.id} className="notif-item">
                <p>{notif.message}</p>
                <span className="notif-time">2h ago</span>
              </div>
            ))}
          </div>
        )}
      </header>

      <main className="dashboard-content">
        <div className="welcome-container">
          <div className="welcome-card">
            <h1>🌾 Welcome to AgriConnect Admin Dashboard 🌾</h1>
            <p>Select an option from the menu to manage users or products</p>
            <div className="welcome-icons">
              <span>👥</span>
              <span>🌽</span>
              <span>📊</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
