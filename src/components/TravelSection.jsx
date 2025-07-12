import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMapPin, FiHome, FiCamera, FiAirplay, FiInfo } = FiIcons;

const TravelSection = () => {
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

  const travelInfo = [
    {
      icon: FiAirplay,
      title: 'Getting There',
      items: [
        'Santorini Airport (JTR) - 15 minutes from venue',
        'Athens International Airport (ATH) - 1 hour flight',
        'Ferry from Piraeus Port - 5-8 hours scenic journey'
      ]
    },
    {
      icon: FiHome,
      title: 'Where to Stay',
      items: [
        'Sunset Cliffs Resort - Venue hotel with special rates',
        'Oia Castle Hotel - Luxury option with caldera views',
        'Fira Grand Hotel - Budget-friendly in town center'
      ]
    },
    {
      icon: FiCamera,
      title: 'Things to Do',
      items: [
        'Watch sunset in Oia - Most famous in the world',
        'Explore Akrotiri Archaeological Site',
        'Wine tasting at Santo Wines',
        'Red Beach and Kamari Beach',
        'Boat tour to volcanic islands'
      ]
    },
    {
      icon: FiInfo,
      title: 'Local Tips',
      items: [
        'Best time to visit: April to October',
        'Currency: Euro (EUR)',
        'Language: Greek (English widely spoken)',
        'Dress code: Casual, comfortable walking shoes'
      ]
    }
  ];

  return (
    <section id="travel" className="py-20 bg-gradient-to-b from-coral-50 to-ocean-50 dark:from-coral-900 dark:to-ocean-900">
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
            Travel Information
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-ocean-600 dark:text-ocean-300 max-w-3xl mx-auto"
          >
            Everything you need to know for your trip to paradise
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {travelInfo.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 dark:bg-ocean-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-ocean-200/50 dark:border-ocean-700/50"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-ocean-500 to-turquoise-500 rounded-full flex items-center justify-center mr-4">
                  <SafeIcon 
                    icon={section.icon} 
                    className="text-white text-xl"
                  />
                </div>
                <h3 className="text-xl font-semibold text-ocean-900 dark:text-white">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <SafeIcon 
                      icon={FiMapPin} 
                      className="text-ocean-500 dark:text-turquoise-400 mt-1 mr-2 flex-shrink-0"
                    />
                    <span className="text-ocean-600 dark:text-ocean-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Packing List */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 bg-gradient-to-r from-sand-500 to-coral-500 text-white rounded-2xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-script mb-6 text-center">
            Packing Essentials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Clothing</h4>
              <ul className="text-sm space-y-1">
                <li>• Light, breathable fabrics</li>
                <li>• Comfortable walking shoes</li>
                <li>• Light jacket for evenings</li>
                <li>• Swimwear</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Essentials</h4>
              <ul className="text-sm space-y-1">
                <li>• Sunscreen (high SPF)</li>
                <li>• Sunglasses</li>
                <li>• Hat or cap</li>
                <li>• Reusable water bottle</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Electronics</h4>
              <ul className="text-sm space-y-1">
                <li>• European plug adapter</li>
                <li>• Camera for memories</li>
                <li>• Portable charger</li>
                <li>• Phone with offline maps</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelSection;