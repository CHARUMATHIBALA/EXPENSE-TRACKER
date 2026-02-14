import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, TrendingUp, Shield, Zap } from 'lucide-react';
import Loader from '../components/Loader';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const result = await register(formData.name, formData.email, formData.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-container">
      {/* Animated Background Elements */}
      <div className="floating-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      
      <div className="connecting-lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Left Side - Brand Section */}
      <div className="auth-brand">
        <div className="auth-brand-content">
          <div className="auth-brand-logo">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="white" opacity="0.9" />
              <path d="M12 18L24 12L36 18V30L24 36L12 30V18Z" fill="white" opacity="0.7" />
              <path d="M24 12V36" stroke="white" strokeWidth="3" opacity="0.5" />
            </svg>
          </div>
          <h1>Expense Tracker</h1>
          <p>Take control of your finances with our intelligent expense tracking solution</p>
          
          <div className="auth-features">
            <div className="auth-feature">
              <div className="auth-feature-icon">
                <Zap size={20} />
              </div>
              <span>Real-time expense tracking</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">
                <Shield size={20} />
              </div>
              <span>Bank-level security</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">
                <TrendingUp size={20} />
              </div>
              <span>Advanced analytics & insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Start tracking your expenses today</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <Loader size="small" />
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <span>Already have an account? </span>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
