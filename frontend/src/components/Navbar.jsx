import { useState } from 'react';
import { FiUser, FiShoppingCart, FiMenu, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      return;
    }

    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-serif italic cursor-pointer" onClick={() => navigate('/')}>aromahpure</h1>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-8 flex-grow justify-center">
            <a href="/products" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">All Products</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">About Us</a>
            <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Contact Us</a>
          </div>

          {/* Icons and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <button 
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200" 
                onClick={handleUserClick}
                aria-label="User account"
              >
                <FiUser className="h-6 w-6" />
              </button>
            ) : (
              <div className="relative">
                <button 
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200" 
                  onClick={toggleProfileMenu}
                  aria-label="Profile menu"
                >
                  <div className="h-8 w-8 cursor-pointer rounded-full bg-gray-200 flex items-center justify-center">
                    <FiUser className="h-5 w-5 cursor-pointer" />
                  </div>
                  <FiChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={() => navigate('/profile')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => navigate('/orders')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            {isAuthenticated && (
              <button 
                className="text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-200 relative"
                aria-label="Shopping cart"
                onClick={() => navigate('/cart')}
              >
                <FiShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-600 hover:text-gray-900 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/products" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200">All Products</a>
              <a href="/about" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200">About Us</a>
              <a href="/contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200">Contact Us</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;