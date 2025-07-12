import React, { createContext, useContext, useState, useEffect } from 'react';

const WeddingContext = createContext();

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};

export const WeddingProvider = ({ children }) => {
  const [weddingData, setWeddingData] = useState({
    couple: {
      bride: 'Isabella',
      groom: 'Alessandro',
      tagline: 'Two hearts, one ocean, endless love'
    },
    date: '2024-08-15',
    time: '17:00',
    venue: {
      name: 'Sunset Cliffs Resort',
      address: 'Santorini, Greece',
      coordinates: { lat: 36.3932, lng: 25.4615 }
    },
    rsvps: [],
    guestbook: [],
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
    ],
    timeline: [
      {
        date: '2020-07-14',
        title: 'First Met',
        description: 'Under the stars at a beachside café in Mykonos',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
      },
      {
        date: '2022-12-24',
        title: 'The Proposal',
        description: 'Christmas Eve magic on the cliffs of Santorini',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'
      },
      {
        date: '2024-08-15',
        title: 'Our Wedding Day',
        description: 'Saying "I do" with our toes in the sand',
        image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400'
      }
    ]
  });

  const addRSVP = (rsvp) => {
    setWeddingData(prev => ({
      ...prev,
      rsvps: [...prev.rsvps, { ...rsvp, id: Date.now() }]
    }));
  };

  const addGuestbookEntry = (entry) => {
    setWeddingData(prev => ({
      ...prev,
      guestbook: [...prev.guestbook, { ...entry, id: Date.now(), timestamp: new Date().toISOString() }]
    }));
  };

  const updateWeddingData = (data) => {
    setWeddingData(prev => ({ ...prev, ...data }));
  };

  return (
    <WeddingContext.Provider value={{
      weddingData,
      addRSVP,
      addGuestbookEntry,
      updateWeddingData
    }}>
      {children}
    </WeddingContext.Provider>
  );
};