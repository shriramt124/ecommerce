import { FiFacebook, FiInstagram, FiYoutube, FiTwitter } from 'react-icons/fi';
import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Company</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* For Business Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">For Business</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Become Channel Partner</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Affiliates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Marketing</a></li>
            </ul>
          </div>

          {/* Marketing Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Marketing</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Brand Associations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Showcase</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
            </ul>
          </div>

          {/* Policies Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Quality Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">New products, blog updates, deals, and more.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-serif italic">aromahpure</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiYoutube className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left text-gray-400">
            <p>©2024 Involve Your Senses.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;