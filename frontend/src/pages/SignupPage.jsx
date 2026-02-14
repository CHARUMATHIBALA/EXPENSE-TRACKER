import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const result = await signup(formData.username, formData.email, formData.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Signup failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-gradient flex items-center justify-center px-4">
      <div className="bg-navy-medium rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-gradient rounded-xl p-3 mr-3">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">ExpenseTracker</h1>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400 text-sm">Sign up to start tracking your expenses</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-600 bg-opacity-20 border border-red-600 rounded-lg">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wide">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus-outline-none focus-border-blue-primary focus-ring transition-all"
                placeholder="Choose a username"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wide">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus-outline-none focus-border-blue-primary focus-ring transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pl-12 pr-12 text-white placeholder-gray-500 focus-outline-none focus-border-blue-primary focus-ring transition-all"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover-text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wide">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pl-12 pr-12 text-white placeholder-gray-500 focus-outline-none focus-border-blue-primary focus-ring transition-all"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover-text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-gradient text-white font-bold py-3 px-4 rounded-xl shadow-lg hover-shadow-xl hover-scale transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Bottom Section */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-navy-medium text-gray-400">Already have an account?</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <a href="/login" className="text-blue-primary hover-text-blue-secondary font-medium transition-colors">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
