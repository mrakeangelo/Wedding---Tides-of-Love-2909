import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useWedding } from '../contexts/WeddingContext';
import CountdownTimer from './CountdownTimer';

const { FiMapPin, FiClock, FiCalendar, FiSun, FiMoon } = FiIcons;

const DetailsSection = () => {
  const { weddingData } = useWedding();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const details = [
    {
      icon: FiCalendar,
      title: 'Date',
      content: new Date(weddingData.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    {
      icon: FiClock,
      title: 'Time',
      content: `${weddingData.time} - Ceremony begins at sunset`
    },
    {
      icon: FiMapPin,
      title: 'Venue',
      content: `${weddingData.venue.name}, ${weddingData.venue.address}`
    },
    {
      icon: FiSun,
      title: 'Dress Code',
      content: 'Beach formal - Light colors encouraged'
    }
  ];

  return (
    <section id="details" className="py-20 bg-gradient-to-b from-ocean-50 to-turquoise-50 dark:from-ocean-800 dark:to-turquoise-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-script text-ocean-900 dark:text-white mb-4"
          >
            Wedding Details
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-ocean-600 dark:text-ocean-300 max-w-3xl mx-auto"
          >
            Join us for an unforgettable celebration by the sea
          </motion.p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <CountdownTimer targetDate={weddingData.date} />
        </motion.div>

        {/* Details Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {details.map((detail, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 dark:bg-ocean-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-ocean-200/50 dark:border-ocean-700/50"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-ocean-500 to-turquoise-500 rounded-full flex items-center justify-center">
                    <SafeIcon 
                      icon={detail.icon} 
                      className="text-white text-xl"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-ocean-900 dark:text-white mb-2">
                    {detail.title}
                  </h3>
                  <p className="text-ocean-600 dark:text-ocean-300 leading-relaxed">
                    {detail.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Map Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-white/80 dark:bg-ocean-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-ocean-200/50 dark:border-ocean-700/50"
        >
          <h3 className="text-2xl font-script text-ocean-900 dark:text-white mb-6 text-center">
            Find Us Here
          </h3>
          <div className="aspect-video bg-ocean-100 dark:bg-ocean-700 rounded-xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-ocean-500 dark:text-ocean-400">
              <div className="text-center">
                <SafeIcon icon={FiMapPin} className="text-4xl mb-4 mx-auto" />
                <p className="text-lg font-medium">Interactive Map</p>
                <p className="text-sm mt-2">
                  {weddingData.venue.name}<br />
                  {weddingData.venue.address}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Local Tips */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-coral-500 to-sand-500 text-white px-8 py-6 rounded-2xl inline-block">
            <h3 className="text-xl font-script mb-2">Local Tip</h3>
            <p className="text-sm">
              The ceremony will be held on the beach at sunset. 
              We recommend arriving 30 minutes early to enjoy the pre-ceremony music and refreshments.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DetailsSection;