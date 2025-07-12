import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiHome, FiCheck } = FiIcons;

const ThankYou = () => {
  useEffect(() => {
    // Confetti effect
    const createConfetti = () => {
      const confetti = document.createElement('div');
      confetti.innerHTML = '🎉';
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.fontSize = '2rem';
      confetti.style.zIndex = '1000';
      confetti.style.pointerEvents = 'none';
      confetti.style.animation = 'fall 3s linear forwards';
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    };

    // Create confetti periodically
    const interval = setInterval(createConfetti, 300);
    
    // Stop after 5 seconds
    setTimeout(() => {
      clearInterval(interval);
    }, 5000);

    // Add CSS for falling animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        0% {
          transform: translateY(-10px) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      clearInterval(interval);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-400 via-turquoise-400 to-sand-300 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl">
            <SafeIcon icon={FiCheck} className="text-4xl text-green-500" />
          </div>
        </motion.div>

        {/* Main Message */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-4xl md:text-6xl font-script text-white mb-6 text-shadow"
        >
          Thank You!
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/90 mb-8 font-light"
        >
          Your RSVP has been received successfully!
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/30"
        >
          <SafeIcon icon={FiHeart} className="text-3xl text-white mb-4 mx-auto animate-pulse-soft" />
          <p className="text-white/80 text-lg leading-relaxed">
            We're absolutely thrilled that you'll be joining us for our special day! 
            Your presence will make our celebration even more meaningful.
          </p>
          <p className="text-white/70 text-sm mt-4">
            Keep an eye on your inbox for additional details about the wedding weekend.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="bg-white text-ocean-600 px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
          >
            <SafeIcon icon={FiHome} />
            <span>Back to Wedding</span>
          </Link>
          
          <button
            onClick={() => {
              const guestbook = document.getElementById('guestbook');
              if (guestbook) {
                window.location.href = '/#guestbook';
              }
            }}
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-2 border border-white/30"
          >
            <SafeIcon icon={FiHeart} />
            <span>Leave a Message</span>
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 text-4xl opacity-70"
        >
          🌊
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-20 text-4xl opacity-70"
        >
          🏖️
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ThankYou;