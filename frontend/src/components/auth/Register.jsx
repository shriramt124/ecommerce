import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiFacebook } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useAuthHook } from '../../hooks/useAuthHook';

const Register = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    phoneNumber: '',
    Password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleRegister } = useAuthHook();
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
      await handleRegister(formData);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-[60px] sm:mt-[100px] px-4 sm:px-0">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-serif mb-1 sm:mb-2">Create Account</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Please fill in the information below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              id="FirstName"
              name="FirstName"
              type="text"
              required
              value={formData.FirstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              id="LastName"
              name="LastName"
              type="text"
              required
              value={formData.LastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="Email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="Email"
            name="Email"
            type="Email"
            required
            value={formData.Email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Enter your Email"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="Password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="Password"
            name="Password"
            type="Password"
            required
            value={formData.Password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Create a Password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Create my account
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
        Already have an account?{' '}
        <Link to="/login" className="text-black hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;