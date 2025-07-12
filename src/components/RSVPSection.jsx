import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useWedding } from '../contexts/WeddingContext';

const { FiUser, FiMail, FiPhone, FiUsers, FiCheck, FiX } = FiIcons;

const RSVPSection = () => {
  const { addRSVP } = useWedding();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    addRSVP(data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 3000);
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
    <section id="rsvp" className="py-20 bg-gradient-to-b from-sand-50 to-coral-50 dark:from-sand-900 dark:to-coral-900">
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
            RSVP
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-ocean-600 dark:text-ocean-300 max-w-3xl mx-auto"
          >
            We can't wait to celebrate with you! Please let us know if you'll be joining us.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-white/80 dark:bg-ocean-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-ocean-200/50 dark:border-ocean-700/50"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiCheck} className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-script text-ocean-900 dark:text-white mb-2">
                Thank You!
              </h3>
              <p className="text-ocean-600 dark:text-ocean-300">
                Your RSVP has been received. We're excited to celebrate with you!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-floating">
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="w-full px-4 py-3 border border-ocean-300 dark:border-ocean-600 rounded-lg bg-white/50 dark:bg-ocean-700/50 text-ocean-900 dark:text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-ocean-500 transition-all"
                    placeholder="Your Name"
                  />
                  <label className="text-ocean-600 dark:text-ocean-400">
                    <SafeIcon icon={FiUser} className="inline mr-2" />
                    Your Name
                  </label>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="form-floating">
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 border border-ocean-300 dark:border-ocean-600 rounded-lg bg-white/50 dark:bg-ocean-700/50 text-ocean-900 dark:text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-ocean-500 transition-all"
                    placeholder="Your Email"
                  />
                  <label className="text-ocean-600 dark:text-ocean-400">
                    <SafeIcon icon={FiMail} className="inline mr-2" />
                    Your Email
                  </label>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="form-floating">
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-4 py-3 border border-ocean-300 dark:border-ocean-600 rounded-lg bg-white/50 dark:bg-ocean-700/50 text-ocean-900 dark:text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-ocean-500 transition-all"
                    placeholder="Your Phone"
                  />
                  <label className="text-ocean-600 dark:text-ocean-400">
                    <SafeIcon icon={FiPhone} className="inline mr-2" />
                    Your Phone (Optional)
                  </label>
                </div>

                <div className="form-floating">
                  <select
                    {...register('guests', { required: 'Please select number of guests' })}
                    className="w-full px-4 py-3 border border-ocean-300 dark:border-ocean-600 rounded-lg bg-white/50 dark:bg-ocean-700/50 text-ocean-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500 transition-all"
                  >
                    <option value="">Select guests</option>
                    <option value="1">Just me</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                  </select>
                  <label className="text-ocean-600 dark:text-ocean-400">
                    <SafeIcon icon={FiUsers} className="inline mr-2" />
                    Number of Guests
                  </label>
                  {errors.guests && (
                    <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-ocean-900 dark:text-white font-medium mb-4">
                  Will you be attending?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      {...register('attending', { required: 'Please select attendance' })}
                      type="radio"
                      value="yes"
                      className="mr-2 text-ocean-500 focus:ring-ocean-500"
                    />
                    <span className="text-ocean-900 dark:text-white">
                      <SafeIcon icon={FiCheck} className="inline mr-1 text-green-500" />
                      Yes, I'll be there!
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      {...register('attending', { required: 'Please select attendance' })}
                      type="radio"
                      value="no"
                      className="mr-2 text-ocean-500 focus:ring-ocean-500"
                    />
                    <span className="text-ocean-900 dark:text-white">
                      <SafeIcon icon={FiX} className="inline mr-1 text-red-500" />
                      Sorry, can't make it
                    </span>
                  </label>
                </div>
                {errors.attending && (
                  <p className="text-red-500 text-sm mt-1">{errors.attending.message}</p>
                )}
              </div>

              <div className="form-floating">
                <textarea
                  {...register('message')}
                  rows="4"
                  className="w-full px-4 py-3 border border-ocean-300 dark:border-ocean-600 rounded-lg bg-white/50 dark:bg-ocean-700/50 text-ocean-900 dark:text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-ocean-500 transition-all resize-none"
                  placeholder="Your Message"
                />
                <label className="text-ocean-600 dark:text-ocean-400">
                  Special message or dietary requirements (Optional)
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-ocean-500 to-turquoise-500 text-white py-4 px-8 rounded-lg font-medium text-lg hover:from-ocean-600 hover:to-turquoise-600 transition-all duration-300 shadow-lg ocean-ripple"
              >
                Send RSVP
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPSection;