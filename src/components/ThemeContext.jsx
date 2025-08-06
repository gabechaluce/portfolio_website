import React, { createContext, useContext, useState } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);

  const toggleTheme = () => {
    setIsSpinning(true);
    setIsDarkMode(!isDarkMode);
    
    setTimeout(() => {
      setIsSpinning(false);
    }, 500);
  };

  const value = {
    isDarkMode,
    isSpinning,
    toggleTheme,
    setIsDarkMode,
    setIsSpinning
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`min-h-screen transition-all duration-500 ease-in-out ${
        isDarkMode ? 'bg-[#11001C] text-white' : 'bg-[#f8f4e9] text-gray-800'
      }`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;