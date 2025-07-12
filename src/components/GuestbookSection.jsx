import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useWedding } from '../contexts/WeddingContext';

const { FiUser, FiHeart, FiSend } = FiIcons;

const GuestbookSection = () => {
  const { weddingData, addGuestbookEntry } = useWedding();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    addGuestbookEntry(data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <section className="py-20 bg-gradient-to-b from-ocean-50 to-turquoise-50 dark:from-ocean-900 dark:to-turquoise-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Leave Your Message in the Sand
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-ocean-600 dark:text-ocean-300 max-w-3xl mx-auto"
          >
            Share your love, wishes, and memories with us
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Guestbook Form */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-white/80 dark:bg-ocean-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-ocean-200/50 dark:border-ocean-700/50"
          >
            <h3 className="text-2xl font-script text-ocean-900 dark:text-white mb-6 text-center">
              Write a Message
            </h3>
            
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <SafeIcon icon={FiHeart} className="text-4xl text-coral-500 mx-auto mb-4" />
                <p className="text-ocean-900 dark:text-white">
                  Thank you for your beautiful message! 💙
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    {...register('name', { required: true })}
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-ocean-300 dark:border-ocean-600 rounded-lg bg-white/50 dark:bg-ocean-700/50 text-ocean-900 dark:text-white placeholder-ocean-500 dark:placeholder-ocean-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 transition-all"
                  />
                </div>
                
                <div>
                  <textarea
                    {...register('message', { required: true })}
                    rows="4"
                    placeholder="Share your love, wishes, or favorite memory..."
                    className="w-full px-4 py-3 border border-ocean-300 dark:border-ocean-600 rounded-lg bg-white/50 dark:bg-ocean-700/50 text-ocean-900 dark:text-white placeholder-ocean-500 dark:placeholder-ocean-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 transition-all resize-none"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-ocean-500 to-turquoise-500 text-white py-3 px-6 rounded-lg font-medium hover:from-ocean-600 hover:to-turquoise-600 transition-all duration-300 shadow-lg flex items-center justify-center"
                >
                  <SafeIcon icon={FiSend} className="mr-2" />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Messages Display */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-white/80 dark:bg-ocean-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-ocean-200/50 dark:border-ocean-700/50"
          >
            <h3 className="text-2xl font-script text-ocean-900 dark:text-white mb-6 text-center">
              Messages from Loved Ones
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {weddingData.guestbook.length === 0 ? (
                <div className="text-center py-8 text-ocean-600 dark:text-ocean-300">
                  <SafeIcon icon={FiHeart} className="text-3xl mx-auto mb-4 opacity-50" />
                  <p>Be the first to leave a message!</p>
                </div>
              ) : (
                weddingData.guestbook.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-ocean-50 dark:bg-ocean-700 rounded-lg p-4 border-l-4 border-ocean-500"
                  >
                    <div className="flex items-center mb-2">
                      <SafeIcon icon={FiUser} className="text-ocean-500 mr-2" />
                      <span className="font-medium text-ocean-900 dark:text-white">
                        {entry.name}
                      </span>
                      <span className="text-xs text-ocean-500 dark:text-ocean-400 ml-auto">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-ocean-700 dark:text-ocean-200 font-script text-lg">
                      {entry.message}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GuestbookSection;