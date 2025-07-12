import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiMail, FiPhone, FiInstagram, FiFacebook } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-ocean-900 to-ocean-800 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <SafeIcon icon={FiHeart} className="text-4xl text-coral-400 mx-auto mb-4 animate-pulse-soft" />
            <h3 className="text-3xl font-script mb-4">
              Isabella & Alessandro
            </h3>
            <p className="text-ocean-300 max-w-2xl mx-auto">
              Thank you for being part of our love story. We can't wait to celebrate with you 
              as we begin this new chapter together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8"
          >
            <div className="flex items-center">
              <SafeIcon icon={FiMail} className="mr-2 text-turquoise-400" />
              <span className="text-ocean-300">hello@tidesoflovewedding.com</span>
            </div>
            <div className="flex items-center">
              <SafeIcon icon={FiPhone} className="mr-2 text-turquoise-400" />
              <span className="text-ocean-300">+1 (555) 123-4567</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center space-x-6 mb-8"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 bg-ocean-700 rounded-full flex items-center justify-center hover:bg-ocean-600 transition-colors"
            >
              <SafeIcon icon={FiInstagram} className="text-white" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 bg-ocean-700 rounded-full flex items-center justify-center hover:bg-ocean-600 transition-colors"
            >
              <SafeIcon icon={FiFacebook} className="text-white" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="border-t border-ocean-700 pt-8"
          >
            <p className="text-ocean-400 text-sm">
              Tides of Love – A Destination Wedding Template by{' '}
              <span className="text-turquoise-400 font-medium">Mrake Agency</span>
            </p>
            <p className="text-ocean-500 text-xs mt-2">
              © 2024 All rights reserved. Made with love for love.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 wave-animation h-16 opacity-30" />
    </footer>
  );
};

export default Footer;