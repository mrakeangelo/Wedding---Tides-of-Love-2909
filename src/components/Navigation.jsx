import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useTheme } from '../contexts/ThemeContext';

const { FiMenu, FiX, FiSun, FiMoon, FiHeart } = FiIcons;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Our Story', href: '#story' },
    { label: 'Details', href: '#details' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'Travel', href: '#travel' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-ocean-900/90 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <SafeIcon 
                icon={FiHeart} 
                className="text-2xl text-ocean-500 dark:text-turquoise-400"
              />
              <span className="text-xl font-script text-ocean-900 dark:text-white">
                Tides of Love
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ y: -2 }}
                  className="text-ocean-900 dark:text-white hover:text-ocean-600 dark:hover:text-turquoise-400 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-ocean-100 dark:bg-ocean-800 text-ocean-900 dark:text-white hover:bg-ocean-200 dark:hover:bg-ocean-700 transition-colors duration-200"
              >
                <SafeIcon 
                  icon={isDark ? FiSun : FiMoon} 
                  className="text-lg"
                />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-ocean-100 dark:bg-ocean-800 text-ocean-900 dark:text-white"
              >
                <SafeIcon 
                  icon={isDark ? FiSun : FiMoon} 
                  className="text-lg"
                />
              </motion.button>
              
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-ocean-100 dark:bg-ocean-800 text-ocean-900 dark:text-white"
              >
                <SafeIcon 
                  icon={isOpen ? FiX : FiMenu} 
                  className="text-lg"
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 dark:bg-ocean-900/95 backdrop-blur-md border-t border-ocean-200 dark:border-ocean-700"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ x: 10 }}
                    className="block w-full text-left px-3 py-2 text-ocean-900 dark:text-white hover:text-ocean-600 dark:hover:text-turquoise-400 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-ocean-500 to-turquoise-500 z-50 origin-left"
        style={{
          scaleX: scrolled ? 1 : 0,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
};

export default Navigation;