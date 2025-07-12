import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import DetailsSection from '../components/DetailsSection';
import GallerySection from '../components/GallerySection';
import RSVPSection from '../components/RSVPSection';
import TravelSection from '../components/TravelSection';
import GuestbookSection from '../components/GuestbookSection';
import Footer from '../components/Footer';
import StickyRSVP from '../components/StickyRSVP';

const WeddingHome = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <StorySection />
      <DetailsSection />
      <GallerySection />
      <RSVPSection />
      <TravelSection />
      <GuestbookSection />
      <Footer />
      <StickyRSVP />
    </div>
  );
};

export default WeddingHome;