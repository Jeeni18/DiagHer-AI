import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  scrollY: number;
}

const Hero: React.FC<HeroSectionProps> = ({ scrollY }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Parallax Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900 via-rose-800 to-gray-900">
        {/* Main Background Image Frame */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-[120%] bg-cover bg-center"
            style={{
              backgroundImage: `URL('src/assets/bg.jpg')`,
              transform: `translateY(${scrollY * 0.5}px)`,
              filter: 'brightness(0.3) contrast(1.1)'
            }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>
        
        {/* Gradient Overlays */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-rose-900/90 via-rose-800/50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-rose-900/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        />
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.2}px)`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gray-600/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${-scrollY * 0.2}px, ${scrollY * 0.4}px)`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.3, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          className="space-y-8"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Meet{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-rose-200 to-rose-100 drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "backOut" }}
              whileHover={{ scale: 1.05 }}
            >
              DiagHer
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            An AI-powered decision support system designed to bring gender-aware care into the clinic.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center pt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-rose-800 to-rose-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-rose-900 hover:to-rose-800 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-rose-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              See How It Works
            </motion.button>
            <motion.button 
              className="border-2 border-white/80 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-rose-900 transition-all duration-300 backdrop-blur-sm shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
        whileHover={{ scale: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-white/70 drop-shadow-lg" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;