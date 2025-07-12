import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWedding } from '../contexts/WeddingContext';

const StorySection = () => {
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
        staggerChildren: 0.3
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
    <section id="story" className="py-20 bg-gradient-to-b from-white to-ocean-50 dark:from-ocean-900 dark:to-ocean-800">
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
            Our Love Journey
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-ocean-600 dark:text-ocean-300 max-w-3xl mx-auto"
          >
            Every love story is beautiful, but ours is our favorite
          </motion.p>
        </motion.div>

        <div className="space-y-16">
          {weddingData.timeline.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8 md:gap-12`}
            >
              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 md:h-80 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="timeline-item"
                >
                  <p className="text-ocean-500 dark:text-turquoise-400 font-medium mb-2">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-script text-ocean-900 dark:text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-lg text-ocean-600 dark:text-ocean-300 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-gradient-to-r from-ocean-500 to-turquoise-500 text-white px-8 py-4 rounded-full font-medium text-lg">
            And now, our greatest adventure begins...
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;