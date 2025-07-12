import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useWedding } from '../contexts/WeddingContext';

const { FiArrowLeft, FiUsers, FiMessageSquare, FiSettings, FiEye, FiDownload } = FiIcons;

const AdminDashboard = () => {
  const { weddingData } = useWedding();
  const [activeTab, setActiveTab] = useState('rsvps');

  const tabs = [
    { id: 'rsvps', label: 'RSVPs', icon: FiUsers, count: weddingData.rsvps.length },
    { id: 'guestbook', label: 'Guestbook', icon: FiMessageSquare, count: weddingData.guestbook.length },
    { id: 'settings', label: 'Settings', icon: FiSettings, count: null },
  ];

  const exportData = () => {
    const data = {
      rsvps: weddingData.rsvps,
      guestbook: weddingData.guestbook,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wedding-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 to-turquoise-50 dark:from-ocean-900 dark:to-turquoise-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-ocean-600 dark:text-ocean-400 hover:text-ocean-800 dark:hover:text-ocean-200 transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} className="text-xl" />
              <span>Back to Wedding</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 bg-ocean-500 text-white px-4 py-2 rounded-lg hover:bg-ocean-600 transition-colors"
            >
              <SafeIcon icon={FiEye} />
              <span>Preview</span>
            </Link>
            
            <button
              onClick={exportData}
              className="flex items-center space-x-2 bg-turquoise-500 text-white px-4 py-2 rounded-lg hover:bg-turquoise-600 transition-colors"
            >
              <SafeIcon icon={FiDownload} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-script text-ocean-900 dark:text-white mb-2">
            Wedding Dashboard
          </h1>
          <p className="text-ocean-600 dark:text-ocean-300">
            Manage your wedding website and view responses
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 mr-2 mb-2 ${
                activeTab === tab.id
                  ? 'bg-ocean-500 text-white shadow-lg'
                  : 'bg-white dark:bg-ocean-800 text-ocean-900 dark:text-white hover:bg-ocean-50 dark:hover:bg-ocean-700'
              }`}
            >
              <SafeIcon icon={tab.icon} />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-ocean-100 dark:bg-ocean-700 text-ocean-600 dark:text-ocean-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-ocean-800 rounded-2xl shadow-xl p-6"
        >
          {activeTab === 'rsvps' && (
            <div>
              <h2 className="text-2xl font-semibold text-ocean-900 dark:text-white mb-6">
                RSVP Responses ({weddingData.rsvps.length})
              </h2>
              
              {weddingData.rsvps.length === 0 ? (
                <div className="text-center py-12 text-ocean-500 dark:text-ocean-400">
                  <SafeIcon icon={FiUsers} className="text-4xl mx-auto mb-4 opacity-50" />
                  <p>No RSVPs yet. Share your wedding link to get responses!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {weddingData.rsvps.map((rsvp) => (
                    <div
                      key={rsvp.id}
                      className="border border-ocean-200 dark:border-ocean-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-ocean-900 dark:text-white">
                          {rsvp.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          rsvp.attending === 'yes'
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200'
                        }`}>
                          {rsvp.attending === 'yes' ? 'Attending' : 'Not Attending'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-ocean-600 dark:text-ocean-300">
                        <div>Email: {rsvp.email}</div>
                        <div>Guests: {rsvp.guests}</div>
                        {rsvp.phone && <div>Phone: {rsvp.phone}</div>}
                        {rsvp.message && (
                          <div className="md:col-span-2">
                            <strong>Message:</strong> {rsvp.message}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'guestbook' && (
            <div>
              <h2 className="text-2xl font-semibold text-ocean-900 dark:text-white mb-6">
                Guestbook Messages ({weddingData.guestbook.length})
              </h2>
              
              {weddingData.guestbook.length === 0 ? (
                <div className="text-center py-12 text-ocean-500 dark:text-ocean-400">
                  <SafeIcon icon={FiMessageSquare} className="text-4xl mx-auto mb-4 opacity-50" />
                  <p>No messages yet. Guests can leave messages in the guestbook!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {weddingData.guestbook.map((entry) => (
                    <div
                      key={entry.id}
                      className="border border-ocean-200 dark:border-ocean-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-ocean-900 dark:text-white">
                          {entry.name}
                        </h3>
                        <span className="text-sm text-ocean-500 dark:text-ocean-400">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-ocean-700 dark:text-ocean-200 font-script text-lg">
                        {entry.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-semibold text-ocean-900 dark:text-white mb-6">
                Wedding Settings
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-ocean-900 dark:text-white mb-2">
                      Bride's Name
                    </label>
                    <input
                      type="text"
                      value={weddingData.couple.bride}
                      className="w-full px-4 py-2 border border-ocean-300 dark:border-ocean-600 rounded-lg bg-white dark:bg-ocean-700 text-ocean-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-ocean-900 dark:text-white mb-2">
                      Groom's Name
                    </label>
                    <input
                      type="text"
                      value={weddingData.couple.groom}
                      className="w-full px-4 py-2 border border-ocean-300 dark:border-ocean-600 rounded-lg bg-white dark:bg-ocean-700 text-ocean-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-ocean-900 dark:text-white mb-2">
                      Wedding Date
                    </label>
                    <input
                      type="date"
                      value={weddingData.date}
                      className="w-full px-4 py-2 border border-ocean-300 dark:border-ocean-600 rounded-lg bg-white dark:bg-ocean-700 text-ocean-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-ocean-900 dark:text-white mb-2">
                      Venue
                    </label>
                    <input
                      type="text"
                      value={weddingData.venue.name}
                      className="w-full px-4 py-2 border border-ocean-300 dark:border-ocean-600 rounded-lg bg-white dark:bg-ocean-700 text-ocean-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="bg-ocean-50 dark:bg-ocean-900 rounded-lg p-4">
                  <h3 className="font-medium text-ocean-900 dark:text-white mb-2">
                    Template Information
                  </h3>
                  <p className="text-ocean-600 dark:text-ocean-300 text-sm">
                    This is a demo of the "Tides of Love" wedding template. 
                    In a real implementation, these settings would be editable and connected to a database.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;