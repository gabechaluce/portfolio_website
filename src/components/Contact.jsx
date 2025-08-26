import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useTheme } from './ThemeContext';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Fade up on every scroll
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

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
          setStatus({ type: 'success', message: 'Message sent successfully!' });
          form.current.reset();
          setIsLoading(false);
        },
        (error) => {
          setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
          setIsLoading(false);
        },
      );
  };

  return (
    <section
      ref={sectionRef}
      id='contact'
      className={`py-20 px-4 transition-all duration-1000 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isDarkMode ? 'bg-transparent' : 'bg-transparent'}`}
    >
      <style>{`
        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1s cubic-bezier(0.23, 1, 0.32, 1), transform 1s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .fade-up.in-view {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <div className='max-w-6xl mx-auto relative'>
        <div className="md:min-h-[600px] relative">
          {/* Large Let's Talk Text */}
          <h2 className={`text-[80px] md:text-[150px] font-bold leading-none mb-10 md:mb-20`}>
            <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Reach</span><br />
            <span className="text-purple-500">Out</span>
          </h2>

          {/* Contact Info with Modern Monospace Look */}
          <div className={`space-y-6 font-mono mb-10 md:mb-0 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          } fade-up ${inView ? 'in-view' : ''}`}>
            <div className='flex items-center gap-4'>
              <span className='text-purple-500 text-2xl md:text-3xl'>📧</span>
              <a href='mailto:gabechaluce.dev@gmail.com'
                className='text-lg md:text-xl font-bold hover:text-purple-500 transition-colors'>
                gabechaluce.dev@gmail.com
              </a>
            </div>
            <div className='flex items-center gap-4'>
              <span className='text-purple-500 text-2xl md:text-3xl'>📱</span>
              <a href='tel:+639150211621'
                className='text-lg md:text-xl font-bold hover:text-purple-500 transition-colors'>
                +63 915 021 1621
              </a>
            </div>
            <div className='flex items-center gap-4'>
              <span className='text-purple-500 text-2xl md:text-3xl'>🏠</span>
              <span className='text-lg md:text-xl font-bold'>Metro Manila, Philippines</span>
            </div>
          </div>

          {/* Contact Form - Responsive Positioning */}
          <div className={`relative md:absolute md:top-0 md:right-0 w-full md:w-[650px] fade-up ${inView ? 'in-view' : ''}`}>
            <form
              ref={form}
              onSubmit={sendEmail}
              className={`space-y-6 p-6 md:p-8 rounded-xl shadow-md border backdrop-blur-sm ${
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
                <label className={`block mb-2 font-medium text-lg ${
                  isDarkMode
                    ? 'text-gray-300'
                    : 'text-gray-700'
                }`}>
                  Name
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <span className={`text-2xl ${
                      isDarkMode
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}>👤</span>
                  </div>
                  <input
                    type="text"
                    name="user_name"
                    required
                    className={`w-full pl-12 pr-4 py-4 border rounded-lg text-lg transition-all duration-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent ${
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
                className={`w-full py-4 px-6 rounded-lg font-medium text-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  isDarkMode
                    ? 'bg-purple-600/90 text-white hover:bg-purple-700/90'
                    : 'bg-purple-500/90 text-white hover:bg-purple-600/90'
                }`}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;