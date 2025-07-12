import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart } = FiIcons;

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-ocean-500 via-turquoise-500 to-sand-500 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <SafeIcon 
            icon={FiHeart} 
            className="text-6xl text-white mx-auto animate-pulse-soft"
          />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl font-script text-white mb-4"
        >
          Tides of Love
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-white/80 text-lg font-light"
        >
          Where love meets the ocean...
        </motion.p>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
          className="mt-8 h-1 bg-white/30 rounded-full overflow-hidden max-w-xs mx-auto"
        >
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full w-full bg-white rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;