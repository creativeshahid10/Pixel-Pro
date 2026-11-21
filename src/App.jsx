import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import PixelUltimatePage from './pages/PixelUltimatePage';
import AutoCutPage from './pages/AutoCutPage';
import AiSubtitlesPage from './pages/AiSubtitlesPage';
import TransitionsPage from './pages/TransitionsPage';
import SpeedDialPage from './pages/SpeedDialPage';
import DiskCleanerPage from './pages/DiskCleanerPage';
import FreePluginsPage from './pages/FreePluginsPage';
import PortalPage from './pages/PortalPage';
import PayPage from './pages/PayPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      if (path === 'subscriptions') return 'subscriptions';
      if (path === 'pixel-ultimate') return 'pixel-ultimate';
      if (path === 'pixel-autocut') return 'pixel-autocut';
      if (path === 'pixel-subtitles') return 'pixel-subtitles';
      if (path === 'pixel-transitions') return 'pixel-transitions';
      if (path === 'pixel-speeddial') return 'pixel-speeddial';
      if (path === 'pixel-cache-cleaner') return 'pixel-cache-cleaner';
      if (path === 'free-plugins') return 'free-plugins';
      if (path === 'portal') return 'portal';
      if (path === 'pay') return 'pay';
    }
    return 'home';
  });

  const [currency, setCurrency] = useState('INR');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Sync route with browser history
  const navigate = (route, prod = null, plan = null) => {
    setCurrentRoute(route);
    if (prod) {
      setSelectedProduct(prod);
      setSelectedPlan(null);
    }
    if (plan) {
      setSelectedPlan(plan);
      setSelectedProduct(null);
    }
    const path = route === 'home' ? '/' : `/${route}`;
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      setCurrentRoute(path || 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSelectedPlan(null);
    navigate('pay', product, null);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setSelectedProduct(null);
    navigate('pay', null, plan);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-emerald-500 selection:text-white">
      <Navbar
        currentRoute={currentRoute}
        navigate={navigate}
        currency={currency}
        setCurrency={setCurrency}
      />

      <main className="flex-grow">
        {currentRoute === 'home' && (
          <HomePage
            navigate={navigate}
            currency={currency}
            onSelectProduct={handleSelectProduct}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {currentRoute === 'subscriptions' && (
          <SubscriptionsPage
            navigate={navigate}
            currency={currency}
            setCurrency={setCurrency}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {currentRoute === 'pixel-ultimate' && (
          <PixelUltimatePage
            navigate={navigate}
            currency={currency}
            onSelectProduct={handleSelectProduct}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {currentRoute === 'pixel-autocut' && (
          <AutoCutPage
            navigate={navigate}
            currency={currency}
            onSelectProduct={handleSelectProduct}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {currentRoute === 'pixel-subtitles' && (
          <AiSubtitlesPage
            navigate={navigate}
            currency={currency}
            onSelectProduct={handleSelectProduct}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {currentRoute === 'pixel-transitions' && (
          <TransitionsPage
            navigate={navigate}
            currency={currency}
            onSelectProduct={handleSelectProduct}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {currentRoute === 'pixel-speeddial' && (
          <SpeedDialPage
            navigate={navigate}
            currency={currency}
            onSelectProduct={handleSelectProduct}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {currentRoute === 'pixel-cache-cleaner' && (
          <DiskCleanerPage />
        )}

        {currentRoute === 'free-plugins' && (
          <FreePluginsPage navigate={navigate} />
        )}

        {currentRoute === 'portal' && (
          <PortalPage navigate={navigate} />
        )}

        {currentRoute === 'pay' && (
          <PayPage
            selectedProduct={selectedProduct}
            selectedPlan={selectedPlan}
            currency={currency}
            setCurrency={setCurrency}
            navigate={navigate}
          />
        )}
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}
