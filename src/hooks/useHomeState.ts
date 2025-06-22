import { useState } from 'react';

export const useHomeState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'builder'>('home');

  const openQuoteModal = () => {
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  const startFrameBuilder = () => {
    setCurrentView('builder');
  };

  const backToHome = () => {
    setCurrentView('home');
  };

  return {
    isMenuOpen,
    setIsMenuOpen,
    isQuoteModalOpen,
    currentView,
    openQuoteModal,
    closeQuoteModal,
    startFrameBuilder,
    backToHome,
  };
}; 