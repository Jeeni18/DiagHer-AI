import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  // Smooth scroll handler like your original code:
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200 transition-all duration-300"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-rose-800 to-rose-900 rounded-lg flex items-center justify-center shadow-lg cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('solution')} // Optional: clicking icon scrolls to "solution"
            >
              <Stethoscope className="w-5 h-5 text-white" />
            </motion.div>
            <motion.span
              className="text-xl font-bold text-gray-900 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('solution')} // Optional: clicking title scrolls too
            >
              DiagHer
            </motion.span>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center space-x-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              onClick={() => scrollToSection('solution')}
              className="text-gray-600 hover:text-rose-800 transition-colors font-medium"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              How It Works
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-600 hover:text-rose-800 transition-colors font-medium"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Technology
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-rose-800 transition-colors font-medium"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Impact
            </motion.button>
            <motion.button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-rose-800 to-rose-900 text-white px-6 py-2 rounded-lg hover:from-rose-900 hover:to-rose-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Doctor Login
            </motion.button>
          </motion.div>

          <div className="md:hidden">
            <button
              onClick={() => navigate('/login')}
              className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
