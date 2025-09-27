import React from 'react';
import { Page } from '../App';

interface HeaderProps {
  setActivePage: (page: Page) => void;
  isAuthenticated: boolean;
}

const Logo: React.FC<{ setActivePage: (page: Page) => void }> = ({ setActivePage }) => (
  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.67 15.11L15.11 16.67L12 13.56L8.89 16.67L7.33 15.11L10.44 12L7.33 8.89L8.89 7.33L12 10.44L15.11 7.33L16.67 8.89L13.56 12L16.67 15.11Z" fill="url(#logo-gradient)"/>
        <defs>
            <linearGradient id="logo-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10B981"/>
                <stop offset="1" stopColor="#34D399"/>
            </linearGradient>
        </defs>
    </svg>
    <span className="text-xl font-bold text-gray-800">Jona Calorie</span>
  </div>
);


const Header: React.FC<HeaderProps> = ({ setActivePage, isAuthenticated }) => {
  const handleAuthClick = () => {
    setActivePage('auth');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Logo setActivePage={setActivePage} />
        <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
          <button onClick={() => setActivePage('home')} className="text-gray-600 hover:text-emerald-500 transition-colors font-medium">الرئيسية</button>
          <button onClick={() => setActivePage('pricing')} className="text-gray-600 hover:text-emerald-500 transition-colors font-medium">الاشتراك</button>
          <button onClick={() => setActivePage('support')} className="text-gray-600 hover:text-emerald-500 transition-colors font-medium">الدعم الفني</button>
        </nav>
        <button 
          onClick={handleAuthClick}
          className="hidden md:block bg-emerald-500 text-white px-5 py-2 rounded-full hover:bg-emerald-600 transition-transform hover:scale-105 shadow-lg"
        >
          {isAuthenticated ? 'تسجيل الخروج' : 'تسجيل الدخول'}
        </button>
        {/* Mobile menu button could be added here */}
      </div>
    </header>
  );
};

export default Header;