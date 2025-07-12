import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useWedding } from '../contexts/WeddingContext';

const { FiHeart, FiChevronDown } = FiIcons;

const HeroSection = () => {
  const { weddingData } = useWedding();
  const [timeOfDay, setTimeOfDay] = useState('day');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      setTimeOfDay('night');
    } else if (hour >= 16) {
      setTimeOfDay('sunset');
    } else {
      setTimeOfDay('day');
    }
  }, []);

  const getBackgroundClass = () => {
    switch (timeOfDay) {
      case 'night':
        return 'bg-gradient-to-br from-ocean-900 via-turquoise-900 to-ocean-800';
      case 'sunset':
        return 'bg-gradient-to-br from-coral-400 via-sand-400 to-ocean-500';
      default:
        return 'bg-gradient-to-br from-ocean-400 via-turquoise-400 to-sand-300';
    }
  };

  const scrollToNext = () => {
    const nextSection = document.querySelector('#story');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${getBackgroundClass()}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"
        />
      </div>

      {/* Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0 wave-animation h-32" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.2,
            type: "spring",
            stiffness: 100
          }}
          className="mb-8"
        >
          <SafeIcon 
            icon={FiHeart} 
            className="text-6xl md:text-8xl text-white mx-auto animate-float"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-8xl lg:text-9xl font-script text-white mb-4 text-shadow"
        >
          {weddingData.couple.bride}
        </motion.h1>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-3xl md:text-4xl text-white/90 mb-4 font-light"
        >
          &
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-5xl md:text-8xl lg:text-9xl font-script text-white mb-8 text-shadow"
        >
          {weddingData.couple.groom}
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/80 mb-8 font-light max-w-2xl mx-auto"
        >
          {weddingData.couple.tagline}
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-lg md:text-xl text-white/70 mb-12 font-light"
        >
          {new Date(weddingData.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          <br />
          {weddingData.venue.name}, {weddingData.venue.address}
        </motion.div>

        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          onClick={scrollToNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
        >
          <span className="mr-2">Discover Our Story</span>
          <SafeIcon 
            icon={FiChevronDown} 
            className="inline-block group-hover:translate-y-1 transition-transform duration-300"
          />
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
      >
        <SafeIcon icon={FiChevronDown} className="text-2xl" />
      </motion.div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: '100vh',
              x: Math.random() * window.innerWidth,
              opacity: 0
            }}
            animate={{
              y: '-100px',
              opacity: [0, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
            className="absolute text-2xl"
          >
            💙
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;