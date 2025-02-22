import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiFacebook } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useAuthHook } from '../../hooks/useAuthHook';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleLogin } = useAuthHook();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await handleLogin(formData.email, formData.password);
      toast.success('Login successful!');
      navigate('/products');
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-[60px] sm:mt-[100px] px-4 sm:px-0">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-serif mb-1 sm:mb-2">Login</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Please enter your credentials to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="text-sm text-black hover:underline">
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Sign in
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
          <button
            type="button"
            className="w-full flex items-center justify-center py-1.5 sm:py-2 px-2 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiFacebook className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            <span className="ml-2">Facebook</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center py-1.5 sm:py-2 px-2 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FcGoogle className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="ml-2">Google</span>
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-black hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;