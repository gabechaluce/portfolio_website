import React from 'react';
import { useTheme } from './ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`w-full py-12 px-4 transition-colors duration-500 ${
      isDarkMode ? 'bg-[#0d0117] text-gray-300' : 'bg-[#f8f4e9] text-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left section - Logo/Brand */}
          <div className="mb-6 md:mb-0">
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }`}>
              Gabriel Echaluce
            </h2>
            <p className="mt-2 text-sm">
              Frontend Developer & UI Designer
            </p>
          </div>

          {/* Middle section - Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <a 
              href="#about" 
              className={`hover:text-purple-500 transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              About
            </a>
            <a 
              href="#projects" 
              className={`hover:text-purple-500 transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className={`hover:text-purple-500 transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Contact
            </a>
           
          </div>

          {/* Right section - Socials */}
          <div className="flex space-x-4">
            <a 
              href="https://github.com/gabechaluce" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full hover:bg-opacity-20 transition-all ${
                isDarkMode 
                  ? 'hover:bg-purple-500 text-gray-300' 
                  : 'hover:bg-purple-400 text-gray-700'
              }`}
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full hover:bg-opacity-20 transition-all ${
                isDarkMode 
                  ? 'hover:bg-purple-500 text-gray-300' 
                  : 'hover:bg-purple-400 text-gray-700'
              }`}
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=gabechaluce.dev@gmail.com" 
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full hover:bg-opacity-20 transition-all ${
                isDarkMode 
                  ? 'hover:bg-purple-500 text-gray-300' 
                  : 'hover:bg-purple-400 text-gray-700'
              }`}
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom section - Copyright */}
        <div className={`mt-12 pt-6 border-t text-center text-sm ${
          isDarkMode ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-600'
        }`}>
          <p>© {new Date().getFullYear()} Gabriel Echaluce. All rights reserved.</p>
          <p className="mt-1">Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;