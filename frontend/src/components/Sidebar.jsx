import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  PlusCircle, 
  FileText, 
  BarChart3, 
  Settings, 
  Menu,
  X,
  LogOut,
  User,
  Check
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/dashboard',
      id: 'dashboard'
    },
    {
      icon: FileText,
      label: 'View Expenses',
      path: '/expenses',
      id: 'expenses'
    },
    {
      icon: BarChart3,
      label: 'Charts',
      path: '/charts',
      id: 'charts'
    }
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isCollapsed && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsCollapsed(false)}
        />
      )}
      
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#sidebar-logo-gradient)" />
              <path d="M8 12L16 8L24 12V20L16 24L8 20V12Z" fill="white" opacity="0.9" />
              <path d="M16 8V24" stroke="white" strokeWidth="2" opacity="0.7" />
              <defs>
                <linearGradient id="sidebar-logo-gradient" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#1e3a8a" />
                  <stop stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
            {!isCollapsed && <span className="sidebar-title">ExpenseTracker</span>}
          </div>
          
          <button 
            className="sidebar-toggle"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <li key={item.id} className="sidebar-menu-item">
                  <Link 
                    to={item.path}
                    className={`sidebar-menu-link ${active ? 'active' : ''}`}
                  >
                    <div className="sidebar-menu-icon">
                      {active && item.id === 'dashboard' ? <Check size={20} /> : <Icon size={20} />}
                    </div>
                    {!isCollapsed && (
                      <span className="sidebar-menu-label">{item.label}</span>
                    )}
                    {active && !isCollapsed && (
                      <div className="sidebar-menu-indicator" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info */}
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            <User size={24} />
          </div>
          {!isCollapsed && (
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">{user?.name || 'leela'}</p>
              <p className="sidebar-user-status">Premium User</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <button 
            className="sidebar-logout-btn"
            onClick={logout}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
