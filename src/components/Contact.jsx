import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTheme } from './ThemeContext';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    emailjs
      .sendForm('service_p1zgjpn', 'template_tlszb8f', form.current, {
        publicKey: 'iCoOVgOLsxSuTc-Q0',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setStatus({ type: 'success', message: 'Message sent successfully!' });
          form.current.reset();
          setIsLoading(false);
        },
        (error) => {
          console.log('FAILED...', error.text);
          setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
          setIsLoading(false);
        },
      );
  };
  
  return (
    <section 
      data-aos='fade-up' 
      data-aos-delay='250' 
      id='contact' 
      className={`py-20 px-4 ${
        isDarkMode 
          ? 'bg-transparent' 
          : 'bg-transparent'
      }`}
    >
      <div className='max-w-lg mx-auto relative'>
        <div className='text-center mb-12'>
          <h2 className={`text-4xl font-bold mb-2 ${
            isDarkMode 
              ? 'text-white' 
              : 'text-gray-800'
          }`}>
            Get in <span className='text-purple-500'>Touch</span>
          </h2>
          <p className={`${
            isDarkMode 
              ? 'text-gray-300' 
              : 'text-gray-600'
          }`}>
            Let's discuss your next project
          </p>
        </div>
        
        <form 
          ref={form} 
          onSubmit={sendEmail}
          className={`space-y-6 p-8 rounded-xl shadow-md border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-[#1a0329]/70 border-purple-900/30' 
              : 'bg-white/70 border-gray-200/70'
          }`}
        >
          {status.message && (
            <div className={`p-4 rounded-lg text-center font-medium ${
              status.type === 'success' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {status.message}
            </div>
          )}
          
          <div className="hover:scale-105 transition-transform duration-200">
            <label className={`block mb-2 font-medium ${
              isDarkMode 
                ? 'text-gray-300' 
                : 'text-gray-700'
            }`}>
              Name
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <span className={`${
                  isDarkMode 
                    ? 'text-gray-400' 
                    : 'text-gray-500'
                }`}>👤</span>
              </div>
              <input 
                type="text" 
                name="user_name"
                required
                className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent ${
                  isDarkMode 
                    ? 'border-purple-900/30 bg-[#2a0a42]/50 text-white placeholder-gray-400' 
                    : 'border-gray-300/70 bg-white/80 text-gray-900 placeholder-gray-500'
                }`}
                placeholder='Enter your name'
              />
            </div>
          </div>
          
          <div className="hover:scale-105 transition-transform duration-200">
            <label className={`block mb-2 font-medium ${
              isDarkMode 
                ? 'text-gray-300' 
                : 'text-gray-700'
            }`}>
              Email
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <span className={`${
                  isDarkMode 
                    ? 'text-gray-400' 
                    : 'text-gray-500'
                }`}>✉️</span>
              </div>
              <input 
                type="email" 
                name="user_email"
                required
                className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent ${
                  isDarkMode 
                    ? 'border-purple-900/30 bg-[#2a0a42]/50 text-white placeholder-gray-400' 
                    : 'border-gray-300/70 bg-white/80 text-gray-900 placeholder-gray-500'
                }`}
                placeholder='Enter your email'
              />
            </div>
          </div>
          
          <div className="hover:scale-105 transition-transform duration-200">
            <label className={`block mb-2 font-medium ${
              isDarkMode 
                ? 'text-gray-300' 
                : 'text-gray-700'
            }`}>
              Message
            </label>
            <div className='relative'>
              <div className='absolute top-3 left-3'>
                <span className={`${
                  isDarkMode 
                    ? 'text-gray-400' 
                    : 'text-gray-500'
                }`}>💬</span>
              </div>
              <textarea 
                rows={4}
                name="message"
                required
                className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none ${
                  isDarkMode 
                    ? 'border-purple-900/30 bg-[#2a0a42]/50 text-white placeholder-gray-400' 
                    : 'border-gray-300/70 bg-white/80 text-gray-900 placeholder-gray-500'
                }`}
                placeholder='Write your message here...'
              />
            </div>
          </div>
          
          <button
            type='submit'
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-lg font-medium hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              isDarkMode
                ? 'bg-purple-600/90 text-white hover:bg-purple-700/90'
                : 'bg-purple-500/90 text-white hover:bg-purple-600/90'
            }`}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        
        <div className={`mt-8 text-center ${
          isDarkMode 
            ? 'text-gray-300' 
            : 'text-gray-700'
        }`}>
          <p>
            Or email me directly at: 
            <span className={`font-bold ml-1 ${
              isDarkMode 
                ? 'text-purple-400' 
                : 'text-purple-600'
            }`}>
              your.email@example.com
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;