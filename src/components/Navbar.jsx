import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

const navLinks = [
    { href: '#About', label: 'about' },
    { href: '#skills', label: 'skills' },
    { href: '#experience', label: 'experience' },  
    { href: '#projects', label: 'projects' },
    { href: '#contact', label: 'contact' },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const { isDarkMode, isSpinning, toggleTheme } = useTheme();

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = 64; // Your navbar height (h-16 = 64px)
        
        // Improved intersection observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: `-${navbarHeight}px 0px -60% 0px`, // Account for navbar and trigger earlier
                threshold: [0, 0.1, 0.25] // Multiple thresholds for better detection
            }
        );

        // Fallback scroll detection for more accurate results
        const handleScroll = () => {
            const scrollPosition = window.scrollY + navbarHeight + 50;
            let currentSection = '';
            
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                // Check if we're in this section
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });
            
            // Special case for the very top of the page
            if (window.scrollY < 100) {
                currentSection = 'About'; // or whatever your first section ID is
            }
            
            if (currentSection && currentSection !== activeSection) {
                setActiveSection(currentSection);
            }
        };

        // Throttled scroll for better performance
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Observe all sections
        sections.forEach((section) => observer.observe(section));
        
        // Add scroll listener as backup
        window.addEventListener('scroll', throttledScroll);
        
        // Initial check
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', throttledScroll);
        };
    }, [activeSection]);

    return (
        <header className={`sticky top-0 z-50 w-full border-b shadow-lg px-4 lg:px-0 transition-all duration-500 ease-in-out ${
            isDarkMode 
                ? 'bg-[#11001C]/60 border-gray-800/30 shadow-purple-900/10 outline outline-2 outline-purple-500/30' 
                : 'bg-[#f8f4e9]/60 border-white/10 shadow-black/5 outline outline-2 outline-[#fa3c70]/20'
        }`}>
            {/* Aurora Effect - Purple for dark mode, Pink for light mode */}
            <div className={`absolute -bottom-20 left-0 right-0 h-20 pointer-events-none overflow-hidden ${
                isDarkMode ? 'opacity-45' : 'opacity-25'
            }`}>
                <div className="relative w-full h-full">
                    {/* Primary aurora wave */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${
                        isDarkMode 
                            ? 'from-purple-500/20 via-purple-600/12 to-transparent'
                            : 'from-[#fa3c70]/20 via-[#fa3c70]/12 to-transparent'
                    }`}></div>
                    
                    {/* Secondary aurora waves */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${
                        isDarkMode 
                            ? 'from-violet-400/15 via-purple-500/9 to-transparent'
                            : 'from-pink-400/15 via-[#fa3c70]/9 to-transparent'
                    }`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-b ${
                        isDarkMode 
                            ? 'from-indigo-500/12 via-purple-600/6 to-transparent'
                            : 'from-rose-500/12 via-[#fa3c70]/6 to-transparent'
                    }`}></div>
                    
                    {/* Static shimmer effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${
                        isDarkMode 
                            ? 'from-transparent via-purple-400/18 to-transparent'
                            : 'from-transparent via-[#fa3c70]/18 to-transparent'
                    }`}></div>
                </div>
            </div>
            
            {/* Enhanced blur backdrop layer */}
            <div className={`absolute inset-0 -z-10 backdrop-blur-xl ${
                isDarkMode 
                    ? 'bg-gradient-to-br from-[#11001C]/30 via-[#2a0042]/30 to-[#1a0028]/30' 
                    : 'bg-gradient-to-br from-[#f8f4e9]/30 via-[#f0e8d9]/30 to-[#f8f4e9]/30'
            }`}></div>
            
            <div className="max-w-7xl mx-auto flex h-16 items-center justify-between relative px-2">
                <a href="#" className="flex items-center space-x-2 group py-1">
                    <p className="text-3xl font-bold bg-gradient-to-r from-[#8D5DF4] via-[#8D5DF4] via-[#8D5DF4] to-[#8D5DF4] bg-clip-text text-transparent drop-shadow-sm leading-relaxed">@gabechaluce</p>
                </a>
                
                <nav className="hidden md:flex items-center space-x-8 text-lg quicksand">
                    {navLinks.map((link) => {
                        const sectionId = link.href.substring(1); // Remove the '#' to match with activeSection
                        const isActive = activeSection === sectionId;
                        
                        return (
                            <a 
                                key={link.href} 
                                href={link.href} 
                                className={`relative transition-all duration-500 ease-in-out px-3 py-2 group font-semibold ${
                                    isActive 
                                        ? isDarkMode ? 'text-purple-400' : 'text-[#fa3c70]'
                                        : isDarkMode 
                                            ? 'text-white/90 hover:text-purple-400' 
                                            : 'text-gray-800 hover:text-[#fa3c70]'
                                }`}
                            >
                                <span className="relative z-10 backdrop-blur-sm">{link.label}</span>
                                <div className={`absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r transition-transform duration-300 ease-in-out origin-left rounded-full backdrop-blur-sm ${
                                    isDarkMode 
                                        ? 'from-[#8D5DF4] to-[#fa3c70]'
                                        : 'from-[#fa3c70] to-[#8D5DF4]'
                                } ${
                                    isActive 
                                        ? 'scale-x-100' 
                                        : 'scale-x-0 group-hover:scale-x-100'
                                }`}></div>
                            </a>
                        );
                    })}
                </nav>

                <div className="flex items-center space-x-3">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 transition-all duration-500 ease-in-out hover:scale-105 focus:outline-none backdrop-blur-sm rounded-full"
                        aria-label="Toggle theme"
                    >
                        <div className={`transition-transform duration-500 ease-in-out ${
                            isSpinning 
                                ? isDarkMode 
                                    ? 'rotate-180'
                                    : '-rotate-180'
                                : 'rotate-0'
                        }`}>
                            {isDarkMode ? (
                                <Sun className="h-5 w-5 text-yellow-400 transition-all duration-300 hover:text-yellow-200 [&>path]:hover:drop-shadow-[0_0_8px_rgba(255,255,150,0.8)] [&>circle]:hover:drop-shadow-[0_0_8px_rgba(255,255,150,0.8)]" />
                            ) : (
                                <Moon className="h-5 w-5 text-gray-700 transition-all duration-300 hover:text-blue-900 [&>path]:hover:drop-shadow-[0_0_8px_rgba(30,58,138,0.6)]" />
                            )}
                        </div>
                    </button>

                    {/* Mobile Menu Button */}
                    <button 
                        className={`inline-flex items-center justify-center rounded-xl md:hidden p-2 transition-all duration-500 ease-in-out hover:scale-105 backdrop-blur-sm ${
                            isDarkMode 
                                ? 'text-white/90 hover:bg-[#11001C]/50' 
                                : 'text-gray-800 hover:bg-[#f8f4e9]/50'
                        }`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Toggle Menu</span>
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true"/>
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
            
            {mobileMenuOpen && (
                <div className={`md:hidden border-t transition-all duration-500 ease-in-out ${
                    isDarkMode 
                        ? 'bg-[#11001C]/50 border-gray-800/30' 
                        : 'bg-[#f8f4e9]/50 border-white/10'
                }`}>
                    {/* Mobile menu blur layer */}
                    <div className={`absolute inset-0 -z-10 backdrop-blur-xl ${
                        isDarkMode 
                            ? 'bg-gradient-to-b from-[#11001C]/40 to-[#1a0028]/40' 
                            : 'bg-gradient-to-b from-[#f8f4e9]/40 to-[#f0e8d9]/40'
                    }`}></div>
                    
                    <div className="space-y-1 px-4 pb-4 pt-4 text-center relative quicksand">
                        {navLinks.map((link) => {
                            const sectionId = link.href.substring(1);
                            const isActive = activeSection === sectionId;
                            
                            return (
                                <a 
                                    key={link.href} 
                                    href={link.href} 
                                    className={`block rounded-xl px-4 py-3 text-base font-semibold transition-all duration-500 ease-in-out hover:scale-105 backdrop-blur-sm ${
                                        isActive 
                                            ? isDarkMode 
                                                ? 'text-purple-400 bg-[#8D5DF4]/10'
                                                : 'text-[#fa3c70] bg-[#fa3c70]/10'
                                            : isDarkMode 
                                                ? 'text-white/90 hover:text-purple-400 hover:bg-[#11001C]/40' 
                                                : 'text-gray-800 hover:text-[#fa3c70] hover:bg-[#f8f4e9]/40'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}        
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;