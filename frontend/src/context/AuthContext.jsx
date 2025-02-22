import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const register = useCallback(async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        FirstName: userData.firstName,
        LastName: userData.lastName,
        Email: userData.email,
        Password: userData.password,
        PhoneNumber: userData.phoneNumber
      });
      
      if (response.data.accessToken) {
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during registration' };
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        Email: email,
        Password: password
      });
      
      if (response.data.accessToken) {
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during login' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const forgotPassword = useCallback(async (email) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        Email: email
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during password reset request' };
    }
  }, []);

  const resetPassword = useCallback(async (token, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, {
        token,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during password reset' };
    }
  }, []);

  const value = {
    user,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};