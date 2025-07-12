import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="text-center">
      <h3 className="text-2xl font-script text-ocean-900 dark:text-white mb-8">
        Until We Say "I Do"
      </h3>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 dark:bg-ocean-800/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border border-ocean-200/50 dark:border-ocean-700/50 min-w-[100px]"
          >
            <motion.div
              key={unit.value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-4xl font-bold countdown-digit mb-2"
            >
              {unit.value.toString().padStart(2, '0')}
            </motion.div>
            <div className="text-sm md:text-base text-ocean-600 dark:text-ocean-300 font-medium">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;