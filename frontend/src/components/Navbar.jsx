import { useState, useEffect, useRef } from 'react';
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

  const profileMenuRef = useRef(null);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <h1 className="text-xl sm:text-2xl font-serif italic cursor-pointer" onClick={() => navigate('/')}>aromahpure</h1>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-8 flex-grow justify-center">
            <a href="/products" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">All Products</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">About Us</a>
            <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Contact Us</a>
          </div>

          {/* Icons and Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {!isAuthenticated ? (
              <button
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                onClick={handleUserClick}
                aria-label="User account"
              >
                <FiUser className="h-6 w-6" />
              </button>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                <button
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  onClick={toggleProfileMenu}
                  aria-label="Profile menu"
                >
                  <div className="h-7 w-7 sm:h-8 sm:w-8 cursor-pointer rounded-full bg-gray-200 flex items-center justify-center">
                    <FiUser className="h-4 w-4 sm:h-5 sm:w-5 cursor-pointer" />
                  </div>
                  <FiChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setIsProfileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate('/my-orders');
                        setIsProfileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
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
                <FiShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
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
              <FiMenu className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/products" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 rounded-md">All Products</a>
            <a href="/about" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 rounded-md">About Us</a>
            <a href="/contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 rounded-md">Contact Us</a>
            {isAuthenticated && (
              <a href="/my-orders" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 rounded-md">My Orders</a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;