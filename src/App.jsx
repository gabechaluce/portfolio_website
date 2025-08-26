import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'
import { ThemeProvider, useTheme } from './components/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Particle from './components/Particle';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const AppContent = () => {
  const { isDarkMode } = useTheme();
  const [introComplete, setIntroComplete] = useState(false);
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    // Reinitialize AOS after intro completes
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  };
  
  return (
    <div className="min-h-screen">
      {/* Enhanced Particles System with Intro */}
      <Particle 
        isDarkMode={isDarkMode} 
        onIntroComplete={handleIntroComplete}
      />
      
      {/* Main Content - Hidden During Intro */}
      <div 
        className={`transition-all duration-[1500ms] ease-out ${
          introComplete 
            ? 'opacity-100 transform translate-y-0 scale-100' 
            : 'opacity-0 transform translate-y-12 scale-95 pointer-events-none'
        }`}
        style={{
          transitionDelay: introComplete ? '0.5s' : '0s',
          transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
        }}
      >
        {introComplete && (
          <>
            <Navbar />
            <Hero />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
            <Footer />
          </>
        )}
      </div>
      
      {/* Intro Loading Screen */}
      {!introComplete && (
        <div className={`fixed inset-0 flex flex-col items-center justify-center z-40 pointer-events-none
          transition-opacity duration-700 ${!introComplete ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`text-center transition-all duration-1000 transform ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          } ${!introComplete ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'}`}>
            <div className="mb-8">
              <h1 className={`cal-sans-regular text-6xl md:text-8xl lg:text-9xl font-bold mb-4 transition-all duration-800`} style={{ color: '#FEFCE8' }}>
                Welcome
              </h1>
              <p className={`cal-sans-regular text-2xl md:text-3xl lg:text-4xl opacity-70 transition-opacity duration-600 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
            
              </p>
            </div>
            
            {/* Loading Animation */}
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-3 h-3 rounded-full animate-bounce transition-colors duration-500 ${
                isDarkMode ? 'bg-yellow-400' : 'bg-purple-500'
              }`} style={{ animationDelay: '0ms' }}></div>
              <div className={`w-3 h-3 rounded-full animate-bounce transition-colors duration-500 ${
                isDarkMode ? 'bg-pink-400' : 'bg-blue-500'
              }`} style={{ animationDelay: '150ms' }}></div>
              <div className={`w-3 h-3 rounded-full animate-bounce transition-colors duration-500 ${
                isDarkMode ? 'bg-purple-400' : 'bg-indigo-500'
              }`} style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Intro Overlay Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .intro-fade-in {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        /* Hide scrollbar during intro */
        ${!introComplete ? `
          body {
            overflow: hidden;
          }
        ` : ''}
      `}</style>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;