import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Mail, Shield, Palette, Download, Trash2, Sun, Moon } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleExportData = () => {
    // Mock export functionality
    const data = {
      user: user,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-tracker-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Mock delete functionality
      alert('Account deletion functionality would be implemented here');
    }
  };

  return (
    <div className="settings-container">
      <Sidebar />
      <div className="settings-main">
        <Navbar title="Settings" />
        
        <div className="settings-content">
          {/* Profile Section */}
          <div className="settings-section">
            <h2 className="section-title">
              <User size={20} />
              Profile Information
            </h2>
            <div className="settings-card">
              <div className="profile-info">
                <div className="profile-avatar">
                  <User size={32} />
                </div>
                <div className="profile-details">
                  <h3>{user?.name || 'User'}</h3>
                  <p>{user?.email || 'user@example.com'}</p>
                  <span className="member-badge">Premium Member</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="settings-section">
            <h2 className="section-title">
              <Palette size={20} />
              Appearance
            </h2>
            <div className="settings-card">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-header">
                    <div className="setting-icon">
                      {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                    </div>
                    <div>
                      <h4>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</h4>
                      <p>
                        {isDarkMode 
                          ? 'Switch to light mode for daytime use' 
                          : 'Switch to dark mode for nighttime use'
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Theme Preview</h4>
                  <p>Current theme: <strong>{isDarkMode ? 'Dark Navy' : 'Professional Light'}</strong></p>
                </div>
                <div className="theme-preview">
                  <div className={`theme-preview-card ${isDarkMode ? 'dark' : 'light'}`}>
                    <div className="preview-header"></div>
                    <div className="preview-content">
                      <div className="preview-line"></div>
                      <div className="preview-line short"></div>
                      <div className="preview-line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="settings-section">
            <h2 className="section-title">
              <Shield size={20} />
              Security
            </h2>
            <div className="settings-card">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Email</h4>
                  <p>{user?.email || 'user@example.com'}</p>
                </div>
                <button className="btn btn-secondary btn-sm">
                  Change Email
                </button>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Password</h4>
                  <p>Last changed 30 days ago</p>
                </div>
                <button className="btn btn-secondary btn-sm">
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Data Management Section */}
          <div className="settings-section">
            <h2 className="section-title">
              <Download size={20} />
              Data Management
            </h2>
            <div className="settings-card">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Export Data</h4>
                  <p>Download all your expense data as JSON</p>
                </div>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={handleExportData}
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Clear Cache</h4>
                  <p>Clear local storage and cached data</p>
                </div>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Clear Cache
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="settings-section danger-zone">
            <h2 className="section-title">
              <Trash2 size={20} />
              Danger Zone
            </h2>
            <div className="settings-card danger-card">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Delete Account</h4>
                  <p>Permanently delete your account and all data</p>
                </div>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 size={16} />
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="settings-section">
            <div className="settings-card">
              <button 
                className="logout-btn"
                onClick={handleLogout}
              >
                <Shield size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
