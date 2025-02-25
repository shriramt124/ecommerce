import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userRef = useRef(user); // Track user state in a ref
  const failedRequestsQueueRef = useRef([]); // Persistent queue for failed requests

  // Update userRef when user changes
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // Check authentication status on mount
  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/isLoggedin`, { withCredentials: true });
      if (response.data.success && response.data.isLoggedIn) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  

 

 

  // Register user
  const register = useCallback(async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData, { withCredentials: true });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  }, []);

  // Login user
  const login = useCallback(async (email, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { Email: email, Password: password },
        { withCredentials: true }
      );
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  }, []);

  // Logout user
  const logout = useCallback(async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      setUser(null);
      failedRequestsQueueRef.current = []; // Clear pending requests
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  // Forgot password
  const forgotPassword = useCallback(async (email) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { Email: email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password reset request failed' };
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(async (token, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, { token, newPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password reset failed' };
    }
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    checkAuthStatus,
  };

  if (loading) return <div>Loading...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};