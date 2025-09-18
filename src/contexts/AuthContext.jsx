import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, healthCheck } from '../services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    // Check for stored user session and backend connection
    const checkAuthStatus = async () => {
      // First check if backend is available
      const isBackendHealthy = await healthCheck();
      setBackendConnected(isBackendHealthy);
      
      if (!isBackendHealthy) {
        console.warn('Backend is not available. Using stored user data if available.');
        const storedUser = localStorage.getItem('eco-platform-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
        return;
      }
      
      const token = localStorage.getItem('eco-platform-token');
      if (token) {
        try {
          const userData = await authAPI.getProfile();
          setUser(userData);
        } catch (error) {
          console.error('Auth check failed:', error);
          // Token might be invalid, clear storage
          localStorage.removeItem('eco-platform-token');
          localStorage.removeItem('eco-platform-user');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authAPI.login(email, password);
      const { token, user: userData } = response;
      
      // Store token and user data
      localStorage.setItem('eco-platform-token', token);
      localStorage.setItem('eco-platform-user', JSON.stringify(userData));
      setUser(userData);
      
      setLoading(false);
      return userData;
    } catch (error) {
      setLoading(false);
      throw new Error(error.response?.data?.msg || 'Login failed');
    }
  };

  const register = async (name, email, password, role, additionalFields = {}) => {
    setLoading(true);
    try {
      const response = await authAPI.register(name, email, password, role, additionalFields);
      const { token, user: userData } = response;
      
      // Store token and user data
      localStorage.setItem('eco-platform-token', token);
      localStorage.setItem('eco-platform-user', JSON.stringify(userData));
      setUser(userData);
      
      setLoading(false);
      return userData;
    } catch (error) {
      setLoading(false);
      throw new Error(error.response?.data?.msg || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eco-platform-token');
    localStorage.removeItem('eco-platform-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, backendConnected }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
