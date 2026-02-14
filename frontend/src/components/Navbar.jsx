import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogOut, User } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ title = 'Expense Tracker' }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Title */}
        <div className="navbar-brand">
          <div className="navbar-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
              <path d="M8 12L16 8L24 12V20L16 24L8 20V12Z" fill="white" opacity="0.9" />
              <path d="M16 8V24" stroke="white" strokeWidth="2" opacity="0.7" />
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#1e3a8a" />
                  <stop stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="navbar-title">{title}</h1>
        </div>

        {/* Right side actions */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button 
            className="navbar-action-btn"
            onClick={toggleTheme}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Menu */}
          <div className="navbar-user">
            <button className="navbar-user-btn">
              <User size={18} />
              <span className="navbar-user-name">{user?.name || 'User'}</span>
            </button>
            
            <div className="navbar-dropdown">
              <div className="navbar-dropdown-header">
                <div className="navbar-dropdown-avatar">
                  <User size={20} />
                </div>
                <div className="navbar-dropdown-info">
                  <p className="navbar-dropdown-name">{user?.name}</p>
                  <p className="navbar-dropdown-email">{user?.email}</p>
                </div>
              </div>
              
              <div className="navbar-dropdown-divider"></div>
              
              <button className="navbar-dropdown-item" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
