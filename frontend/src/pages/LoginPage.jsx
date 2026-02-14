import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('novah');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Login failed');
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
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to your account to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-600 bg-opacity-20 border border-red-600 rounded-lg">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wide">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus-outline-none focus-border-blue-primary focus-ring transition-all"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus-outline-none focus-border-blue-primary focus-ring transition-all"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-half transform text-gray-400 hover-text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-gradient text-white font-bold py-3 px-4 rounded-xl shadow-lg hover-shadow-xl hover-scale transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Bottom Section */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-navy-medium text-gray-400">Demo: Use password "password"</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <a href="#" className="text-blue-primary hover-text-blue-secondary font-medium transition-colors">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
