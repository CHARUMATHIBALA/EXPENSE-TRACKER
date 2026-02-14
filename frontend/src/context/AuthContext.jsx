import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing user session on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.success) {
        const { token, user: userData } = response.data;
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return { success: true, user: userData };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      console.log('Frontend: Attempting registration', {
        name,
        email,
        passwordLength: password.length,
        timestamp: new Date().toISOString()
      });

      const response = await api.post('/auth/register', { name, email, password });
      
      console.log('Frontend: Registration response:', {
        status: response.status,
        data: response.data,
        timestamp: new Date().toISOString()
      });
      
      if (response.data.success) {
        const { token, user: userData } = response.data;
        
        console.log('Frontend: Registration successful, storing data');
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return { success: true, user: userData };
      } else {
        console.log('Frontend: Registration failed:', response.data.message);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Frontend: Registration error:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        timestamp: new Date().toISOString()
      });
      
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Remove from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Remove axios default header
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
