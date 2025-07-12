import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import WeddingHome from './pages/WeddingHome';
import AdminDashboard from './pages/AdminDashboard';
import ThankYou from './pages/ThankYou';
import { ThemeProvider } from './contexts/ThemeContext';
import { WeddingProvider } from './contexts/WeddingContext';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <WeddingProvider>
        <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-turquoise-50 to-sand-50 dark:from-ocean-900 dark:via-turquoise-900 dark:to-sand-900 transition-all duration-1000">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <motion.div
                key="app"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Router>
                  <Routes>
                    <Route path="/" element={<WeddingHome />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                  </Routes>
                </Router>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </WeddingProvider>
    </ThemeProvider>
  );
}

export default App;