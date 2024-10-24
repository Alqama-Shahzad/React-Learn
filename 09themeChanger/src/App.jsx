import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './contexts/ThemeContext';

const HeroSection = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Theme Changer App</h1>
        <p className="text-xl md:text-2xl mb-8">This is a simple app that allows you to toggle between light and dark modes.</p>
        <ThemeToggle />
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="relative">
        <HeroSection />
      </div>
    </ThemeProvider>
  );
}

export default App;
