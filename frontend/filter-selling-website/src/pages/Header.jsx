import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { FiShoppingCart, FiSearch, FiChevronDown, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    return (
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <Link to={"/"} className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                AquaPure
              </Link>
            </motion.div>
  
            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-8">
                <a href="#products" className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors">
                  Products <FiChevronDown className="ml-1" />
                </a>
                <a href="#solutions" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Solutions
                </a>
                <a href="#resources" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Resources
                </a>
              </div>
              
              <div className="flex items-center space-x-6 ml-8">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search filters..."
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                  />
                </div>
                
                <button className="relative p-2 rounded-lg hover:bg-gray-50">
                  <FiShoppingCart className="text-xl text-gray-700" />
                  <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs px-2 rounded-full">3</span>
                </button>
                
                <Link to={"/signup"} className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                  Get Started
                </Link>
              </div>
            </div>
  
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {/* Mobile menu icon */}
            </button>
          </div>
        </nav>
      </header>
    );
  };
export default Header