import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthHook } from '../../hooks/useAuthHook';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleForgotPassword } = useAuthHook();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await handleForgotPassword(email);
      toast.success('Password reset link has been sent to your email');
      setEmail('');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-[60px] sm:mt-[100px] px-4 sm:px-0">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-serif mb-1 sm:mb-2">Forgot Password</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
          Enter your email address to receive a password reset link
        </p>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </button>

        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-gray-600 hover:text-black">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;