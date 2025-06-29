import { useAuth } from '../context/AuthContext';

export const useAuthHook = () => {
  const {
    user,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    isAuthenticated,
    updateUserProfile
  } = useAuth();

  const handleRegister = async (userData) => {
    try {
      const response = await register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleForgotPassword = async (email) => {
    try {
      const response = await forgotPassword(email);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleResetPassword = async (token, newPassword) => {
    try {
      const response = await resetPassword(token, newPassword);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    handleRegister,
    handleLogin,
    handleLogout,
    handleForgotPassword,
    handleResetPassword
  };
};