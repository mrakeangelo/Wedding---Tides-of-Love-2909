import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiX } = FiIcons;

const StickyRSVP = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const rsvpSection = document.getElementById('rsvp');
      if (rsvpSection) {
        const rect = rsvpSection.getBoundingClientRect();
        const isRSVPVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(!isRSVPVisible && window.scrollY > 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="sticky-rsvp"
        >
          <div className="relative">
            {/* Main RSVP Button */}
            <motion.button
              onClick={scrollToRSVP}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-ocean-500 to-turquoise-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-ocean-600 hover:to-turquoise-600 transition-all duration-300 flex items-center space-x-2 font-medium"
            >
              <SafeIcon icon={FiHeart} className="text-lg" />
              <span>RSVP</span>
            </motion.button>

            {/* Expanded Options */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-16 right-0 bg-white dark:bg-ocean-800 rounded-lg shadow-xl p-4 min-w-[200px] border border-ocean-200 dark:border-ocean-700"
                >
                  <div className="space-y-2">
                    <button
                      onClick={scrollToRSVP}
                      className="w-full text-left px-3 py-2 text-ocean-900 dark:text-white hover:bg-ocean-50 dark:hover:bg-ocean-700 rounded-lg transition-colors"
                    >
                      RSVP Now
                    </button>
                    <button
                      onClick={() => {
                        const guestbook = document.getElementById('guestbook');
                        if (guestbook) guestbook.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left px-3 py-2 text-ocean-900 dark:text-white hover:bg-ocean-50 dark:hover:bg-ocean-700 rounded-lg transition-colors"
                    >
                      Leave Message
                    </button>
                    <button
                      onClick={() => {
                        const gallery = document.getElementById('gallery');
                        if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left px-3 py-2 text-ocean-900 dark:text-white hover:bg-ocean-50 dark:hover:bg-ocean-700 rounded-lg transition-colors"
                    >
                      View Gallery
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expand/Collapse Button */}
            <motion.button
              onClick={toggleExpanded}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -top-2 -left-2 w-8 h-8 bg-coral-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-coral-600 transition-colors"
            >
              <SafeIcon 
                icon={isExpanded ? FiX : FiHeart} 
                className="text-sm"
              />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyRSVP;