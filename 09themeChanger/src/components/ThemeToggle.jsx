import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${
        darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'
      }`}
    >
      {darkMode ? '🌞' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
