import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CalorieCounter from './components/CalorieCounter';
import Pricing from './components/Pricing';
import Support from './components/Support';
import Auth from './components/Auth';

export type Page = 'home' | 'pricing' | 'support' | 'auth';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for a logged-in state in localStorage on initial load
    const loggedInUser = localStorage.getItem('jona-calorie-auth');
    if (loggedInUser) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSetPage = (page: Page) => {
    if (page === 'auth' && isAuthenticated) {
        // Handle logout
        localStorage.removeItem('jona-calorie-auth');
        setIsAuthenticated(false);
        setActivePage('home'); // Redirect to home after logout
    } else {
        setActivePage(page);
    }
  };

  const handleLogin = () => {
    localStorage.setItem('jona-calorie-auth', 'true');
    setIsAuthenticated(true);
    setActivePage('home');
  };


  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <Header setActivePage={handleSetPage} isAuthenticated={isAuthenticated} />
      <main>
        {activePage === 'home' && (
          <>
            <Hero setActivePage={handleSetPage} />
            <CalorieCounter setActivePage={handleSetPage} />
          </>
        )}
        {activePage === 'pricing' && <Pricing />}
        {activePage === 'support' && <Support />}
        {activePage === 'auth' && <Auth onLogin={handleLogin} />}
      </main>
      <Footer setActivePage={handleSetPage} />
    </div>
  );
};

export default App;