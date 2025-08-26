import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from './ThemeContext'
import me from '../assets/me.JPG'
import star from '../assets/star.png'
import comptia from '../assets/comptia.png'
import itf from '../assets/itf.png'

const Hero = () => {
    const { isDarkMode } = useTheme();
    const [textVisible, setTextVisible] = useState(false);
    const [typewriterText, setTypewriterText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [typingPaused, setTypingPaused] = useState(false);
    
    // Refs and state for scroll animations
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const waysToHelpRef = useRef(null);
    const [imageInView, setImageInView] = useState(false);
    const [textInView, setTextInView] = useState(false);
    const [waysToHelpInView, setWaysToHelpInView] = useState(false);
    
    const words = ['Web Developer', 'Frontend Enthusiast', 'Mobile App Developer'];
    
    useEffect(() => {
        // Start the fade-in animation after 3 seconds
        const timer = setTimeout(() => {
            setTextVisible(true);
        }, 3000);
        
        return () => clearTimeout(timer);
    }, []);
    
    // Intersection Observer for scroll animations - RESET ANIMATIONS WHEN ELEMENTS LEAVE VIEW
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === imageRef.current) {
                            setImageInView(true);
                        } else if (entry.target === textRef.current) {
                            setTextInView(true);
                        } else if (entry.target === waysToHelpRef.current) {
                            setWaysToHelpInView(true);
                        }
                    } else {
                        // Reset animation when elements leave view
                        if (entry.target === imageRef.current) {
                            setImageInView(false);
                        } else if (entry.target === textRef.current) {
                            setTextInView(false);
                        } else if (entry.target === waysToHelpRef.current) {
                            setWaysToHelpInView(false);
                        }
                    }
                });
            },
            { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
        );
        
        if (imageRef.current) {
            observer.observe(imageRef.current);
        }
        
        if (textRef.current) {
            observer.observe(textRef.current);
        }
        
        if (waysToHelpRef.current) {
            observer.observe(waysToHelpRef.current);
        }
        
        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
            if (textRef.current) {
                observer.unobserve(textRef.current);
            }
            if (waysToHelpRef.current) {
                observer.unobserve(waysToHelpRef.current);
            }
        };
    }, []);
    
    // Typewriter effect - FIXED
    useEffect(() => {
        if (!textVisible || typingPaused) return;
        
        const currentWord = words[currentWordIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        const pauseBeforeDelete = 2000; // Pause before starting to delete
        const pauseAfterDelete = 500; // Pause after deleting before typing next word
        
        const handleTyping = () => {
            if (!isDeleting && typewriterText === currentWord) {
                // Word is fully typed, pause then start deleting
                setTypingPaused(true);
                setTimeout(() => {
                    setIsDeleting(true);
                    setTypingPaused(false);
                }, pauseBeforeDelete);
                return;
            }
            
            if (isDeleting && typewriterText === '') {
                // Word is fully deleted, move to next word
                setIsDeleting(false);
                setTypingPaused(true);
                setTimeout(() => {
                    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
                    setTypingPaused(false);
                }, pauseAfterDelete);
                return;
            }
            
            // Determine the next text state
            const nextText = isDeleting 
                ? currentWord.substring(0, typewriterText.length - 1)
                : currentWord.substring(0, typewriterText.length + 1);
                
            setTypewriterText(nextText);
        };
        
        const typewriterTimer = setTimeout(handleTyping, typingSpeed);
        
        return () => clearTimeout(typewriterTimer);
    }, [typewriterText, isDeleting, currentWordIndex, textVisible, words, typingPaused]);
    
    // Cursor blinking effect
    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        
        return () => clearInterval(cursorTimer);
    }, []);
    
    // Function to split text into individual letters with spans
    const renderAnimatedText = (text, isGradient = false, customFont = '') => {
        return text.split('').map((char, index) => (
            <span
                key={index}
                className={`inline-block cursor-default bounce-letter ${
                    char === ' ' ? 'w-2' : ''
                } ${isGradient ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-500 bg-clip-text text-transparent' : ''} ${customFont}`}
                style={{
                    animationDelay: `${index * 50}ms`,
                    transformOrigin: 'center bottom'
                }}
                onMouseEnter={(e) => {
                    e.target.style.animation = 'bounceHover 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    e.target.style.textShadow = isGradient 
                        ? '0 0 15px rgba(147, 51, 234, 0.6)' 
                        : isDarkMode 
                            ? '0 0 15px rgba(255, 255, 255, 0.6)' 
                            : '0 0 15px rgba(0, 0, 0, 0.6)';
                    
                    // Reset animation after it completes
                    setTimeout(() => {
                        e.target.style.animation = '';
                    }, 1200);
                }}
                onMouseLeave={(e) => {
                    e.target.style.textShadow = 'none';
                }}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };
    
    return (
        <section id='About' className='body-font overflow-hidden'>
            <div className='w-full mx-auto flex px-4 py-12 sm:py-16 lg:py-20 flex-col items-center'>
                <div className={`relative flex flex-col items-center text-center mb-12 sm:mb-12 lg:mb-16 transition-all duration-1000 ease-out transform ${
                    textVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                }`}>
                    <style jsx>{`
                        @keyframes bounceHover {
                            0% { transform: scale(1) translateY(0) rotate(0deg); }
                            20% { transform: scale(1.05) translateY(-4px) rotate(-1deg); }
                            40% { transform: scale(1.02) translateY(-2px) rotate(0.5deg); }
                            60% { transform: scale(1.03) translateY(-3px) rotate(-0.5deg); }
                            80% { transform: scale(1.01) translateY(-1px) rotate(0deg); }
                            100% { transform: scale(1) translateY(0) rotate(0deg); }
                        }
                        
                        .bounce-letter:hover {
                            animation: bounceHover 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                        }
                        
                        .typewriter-cursor {
                            animation: blink 1.06s infinite;
                        }
                        
                        @keyframes blink {
                            0%, 50% { opacity: 1; }
                            51%, 100% { opacity: 0; }
                        }
                        
                        @keyframes fadeInRight {
                            from {
                                opacity: 0;
                                transform: translateX(-50px);
                            }
                            to {
                                opacity: 1;
                                transform: translateX(0);
                            }
                        }
                        
                        @keyframes fadeInLeft {
                            from {
                                opacity: 0;
                                transform: translateX(50px);
                            }
                            to {
                                opacity: 1;
                                transform: translateX(0);
                            }
                        }
                        
                        @keyframes fadeInUp {
                            from {
                                opacity: 0;
                                transform: translateY(50px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                        
                        .fade-in-right {
                            animation: fadeInRight 1s ease-out forwards;
                        }
                        
                        .fade-in-left {
                            animation: fadeInLeft 1s ease-out forwards;
                        }
                        
                        .fade-in-up {
                            animation: fadeInUp 1s ease-out forwards;
                        }
                        
                        .fade-in-up-delay-1 {
                            animation: fadeInUp 1s ease-out 0.2s forwards;
                            opacity: 0;
                        }
                        
                        .fade-in-up-delay-2 {
                            animation: fadeInUp 1s ease-out 0.4s forwards;
                            opacity: 0;
                        }
                        
                        .fade-in-up-delay-3 {
                            animation: fadeInUp 1s ease-out 0.6s forwards;
                            opacity: 0;
                        }

                        /* Mobile-specific Boogaloo font styles */
                        .boogaloo-mobile {
                            font-family: "Boogaloo", cursive !important;
                            font-weight: 400;
                            font-style: normal;
                            font-size: 2rem; /* 32px */
                            line-height: 1.2;
                        }

                        /* Responsive sizes for Boogaloo */
                        @media (min-width: 640px) {
                            .boogaloo-mobile {
                                font-size: 3.75rem; /* 60px */
                            }
                        }

                        @media (min-width: 768px) {
                            .boogaloo-mobile {
                                font-size: 4rem; /* 64px */
                            }
                        }
/* Mobile-specific Cal Sans font styles */
                        .cal-sans-mobile {
                            font-family: "Cal Sans", sans-serif !important;
                            font-weight: 400;
                            font-style: normal;
                            font-size: 1.8rem; /* 30px */
                            line-height: 1.2;
                        }

                        @media (min-width: 640px) {
                            .cal-sans-mobile {
                                font-size: 4.5rem; /* 72px */
                            }
                        }

                        @media (min-width: 768px) {
                            .cal-sans-mobile {
                                font-size: 6rem; /* 96px */
                            }
                        }

                        @media (min-width: 1024px) {
                            .cal-sans-mobile {
                                font-size: 7rem; /* 112px */
                            }
                        }

                        @media (min-width: 1280px) {
                            .cal-sans-mobile {
                                font-size: 7rem; /* 128px */
                            }
                        }

                        @keyframes bounceArrow {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(10px); }
                        }

                        .scroll-indicator {
                            animation: bounceArrow 2s ease-in-out infinite;
                        }
                    `}</style>
                    
                    {/* Title section - mobile only spacing adjustments */}
                    <div className="mb-6 sm:mb-6 w-full relative">
                       
                        
                        <h1 className={`title-font mb-6 sm:mb-6 font-bold leading-tight text-center ${
                            isDarkMode ? 'text-white' : 'text-black'
                        }`}>
                            {/* Mobile-optimized Boogaloo font */}
                            <span className="boogaloo-mobile select-none block">
                                Hello there, I am
                            </span>
                            <br className="hidden sm:block" />
                            <span className="cal-sans-mobile inline-block mt-4 sm:mt-0">
                                {renderAnimatedText('Errol Gabriel Echaluce.', true)}
                            </span>
                        </h1>
                    </div>
                    
                    {/* Typewriter section - mobile only size adjustments */}
                    <div className="relative h-16 sm:h-16 lg:h-20 flex items-center justify-center mb-8 sm:mb-8 w-full">
                        <h2 className={`text-xl sm:text-xl lg:text-3xl mb-2 sm:mb-4 font-bold text-center ${
                            isDarkMode 
                                ? 'text-yellow-300' 
                                : 'text-blue-950'
                        }`}>
                            <span className="inline-block min-w-0">
                                {typewriterText}
                                <span 
                                    className={`typewriter-cursor ml-1 ${
                                        showCursor ? 'opacity-100' : 'opacity-0'
                                    } transition-opacity duration-100`}
                                >
                                    |
                                </span>
                            </span>
                        </h2>
                    </div>
                                   {/* Download CV Button - mobile optimized */}
                    <div className='flex justify-center w-full'>
                        <a 
                            href="/Errol Gabriel Echaluce CV.pdf" 
                            download='Errol Gabriel Echaluce CV.pdf' 
                            className={`inline-flex items-center justify-center border-2 py-3 sm:py-3 px-8 sm:px-8
                            focus:outline-none text-lg sm:text-lg font-semibold
                            transition-all duration-300 ease-in-out
                            relative overflow-hidden group hover:scale-105 ${
                                isDarkMode
                                    ? 'text-white border-pink-500 hover:bg-pink-500 hover:bg-opacity-20 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]'
                                    : 'text-black border-purple-500 hover:bg-purple-500 hover:bg-opacity-20 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)]'
                            }`}
                            style={{ borderRadius: '0' }}
                        >
                            <span className="relative z-10">Download CV</span>
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                isDarkMode
                                    ? 'bg-gradient-to-r from-pink-500/10 to-pink-600/10'
                                    : 'bg-gradient-to-r from-purple-500/10 to-purple-600/10'
                            }`}></div>
                        </a>
                    </div>
                    
                </div>
            </div>

            {/* Scroll indicator - mobile only */}
            <div className="md:hidden flex flex-col items-center mt-20 mb-8">
             
                <svg 
                    className="w-6 h-6 scroll-indicator" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke={isDarkMode ? '#8d5df4' : '#fa3c70'}
                >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>

            {/* ABOUT ME SECTION - Mobile optimized with increased spacing */}
            <div className={`flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 transition-all duration-1000 ease-out w-full ${
                textVisible ? 'opacity-100' : 'opacity-0'
            }`}>
                {/* Add About Me title with dash */}
                <div className="flex flex-col w-full max-w-6xl">
                   <div className="flex items-center gap-4 mb-16 mt-[60vh] sm:mt-36">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8d5df4]">
        About me
    </h2>
    <div className={`h-[3px] flex-grow bg-[#8d5df4] mt-[2px]`}></div>
</div>
                    
                    {/* Add more vertical spacing for mobile */}
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-16 md:space-y-0 md:space-x-12 w-full pt-8 sm:pt-0">
{/* Profile Image - mobile optimized with scroll animation */}
                        <div 
                            ref={imageRef}
                            className={`relative group flex-shrink-0 transition-all duration-1000 ease-out ${
                                imageInView ? 'fade-in-right opacity-100' : 'opacity-0 translate-x-[-50px]'
                            }`}
                        >
                            {/* Star decoration positioned like in reference */}
                            <div className="absolute -bottom-20 -left-9 sm:-bottom-8 sm:-left-12 md:-bottom-32 md:-left-39 z-20">
                                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 animate-pulse" style={{ animationDuration: '2.5s' }}>
                                    <img 
                                        src={star} 
                                        alt="star decoration" 
                                        className="w-full h-full object-contain drop-shadow-lg"
                                        style={{
                                            filter: 'drop-shadow(0 4px 8px rgba(255, 215, 0, 0.4)) brightness(1.1)',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={`w-52 h-52 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl transition-all duration-300 ease-in-out group-hover:scale-105 border-4 ${
                                isDarkMode 
                                    ? 'border-pink-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]' 
                                    : 'border-purple-500 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)]'
                            }`}
                            style={{
                                boxShadow: isDarkMode 
                                    ? '0 25px 50px -12px rgba(236, 72, 153, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
                                    : '0 25px 50px -12px rgba(147, 51, 234, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(0,0,0,0.1))',
                            }}
                            >
                                <img 
                                    src={me} 
                                    alt="Gabriel Echaluce"
                                    className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        filter: 'brightness(1.05) contrast(1.1) saturate(1.15) sharpen(1px)',
                                        imageRendering: 'crisp-edges',
                                        backfaceVisibility: 'hidden',
                                        transform: 'translateZ(0)',
                                        objectPosition: 'center center',
                                    }}
                                />
                              
                            </div>
                            
                            {/* Enhanced gradient overlay effect */}
                            <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                isDarkMode
                                    ? 'bg-gradient-to-r from-pink-500/10 to-pink-600/10'
                                    : 'bg-gradient-to-r from-purple-500/10 to-purple-600/10'
                            }`}
                            style={{
                                mixBlendMode: 'overlay',
                            }}
                            ></div>
                            
                            {/* Additional enhancement layer */}
                            <div className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                                    mixBlendMode: 'soft-light',
                                }}
                            ></div>
                        </div>

                        {/* Text Content - mobile optimized with scroll animation */}
                        <div 
                            ref={textRef}
                            className={`relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl transition-all duration-1000 ease-out ${
                                textInView ? 'fade-in-left opacity-100' : 'opacity-0 translate-y-[50px]'
                            }`}
                        >
                           
                            {/* Star decoration - adjusted for mobile */}
                            <div className="absolute -top-8 -right-8 sm:-top-6 sm:-right-6 md:-top-10 md:-right-11 z-10">
                                <div className="w-16 h-16 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 animate-pulse" style={{ animationDuration: '2s' }}>
                                    <img 
                                        src={star} 
                                        alt="star" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                            
                            <div className={`rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-500 border shadow-2xl hover:shadow-3xl ${
                                isDarkMode 
                                    ? 'bg-black border-gray-700 text-white' 
                                    : 'bg-white border-purple-200 text-gray-900'
                            }`}
                            style={{
                                boxShadow: isDarkMode 
                                    ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 20px rgba(147, 51, 234, 0.3)'
                                    : '0 8px 32px rgba(147, 51, 234, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 0 20px rgba(147, 51, 234, 0.2)'
                            }}>
                                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                    <p className={`text-lg sm:text-xl md:text-2xl leading-relaxed text-center md:text-left ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                        {/* ITF+ Badge above "I'm" - left aligned on mobile */}
                                        <span className="flex flex-row items-center mb-4">
                                            <img 
                                                src={itf} 
                                                alt="CompTIA ITF+"
                                                className="w-16 sm:w-20 md:w-24 h-auto mr-2 drop-shadow"
                                            />
                                            <span className="text-xs sm:text-sm font-semibold text-purple-700 dark:text-pink-400">
                                               
                                            </span>
                                        </span>
                                        
                                        <span className={`font-semibold bg-gradient-to-r bg-clip-text text-transparent ${
                                            isDarkMode ? 'from-pink-400 to-pink-600' 
                                                      : 'from-purple-600 to-purple-800'
                                        }`}>
                                            I'm
                                        </span>
                                        {' a passionate developer with a Computer Science degree who specializes in creating responsive web and mobile applications. With a keen eye for design and commitment to clean code, I craft polished digital experiences that prioritize interactivity and seamless user engagement.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ways that I can help section placed below image and text container */}
            <div 
                ref={waysToHelpRef}
                className={`w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 transition-all duration-1000 ease-out`}
            >
                <h2 className={`text-3xl sm:text-4xl font-bold mb-2 text-center transition-all duration-1000 ease-out ${
                    waysToHelpInView ? 'fade-in-up opacity-100' : 'opacity-0 translate-y-[50px]'
                } ${isDarkMode ? 'text-white' : 'text-[#181c2a]'}`}>
                    Ways that I can help
                </h2>
                <div className={`w-16 h-1 bg-purple-500 rounded mb-10 transition-all duration-1000 ease-out ${
                    waysToHelpInView ? 'fade-in-up opacity-100' : 'opacity-0 translate-y-[50px]'
                }`}></div>
                <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    {/* Full-Stack Web Development */}
                    <div className={`flex-1 rounded-3xl p-8 border transition-all duration-1000 ease-out shadow-2xl flex flex-col items-center text-center ${
                        waysToHelpInView ? 'fade-in-up-delay-1' : 'opacity-0 translate-y-[50px]'
                    } ${
                        isDarkMode 
                            ? 'bg-black border-gray-700 text-white' 
                            : 'bg-white border-purple-200 text-gray-900'
                    }`}>
                        <div className={`mb-4 text-3xl ${isDarkMode ? 'text-white' : 'text-purple-600'}`}>
                            <span>&lt;&gt;</span>
                        </div>
                        <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Full-Stack Web Development</h3>
                        <p className={`text-base ${isDarkMode ? 'opacity-80 text-gray-300' : 'text-gray-600'}`}>
                            Building scalable web applications with both frontend and backend technologies, ensuring seamless user experience and performance.
                        </p>
                    </div>
                    {/* User-Centered Design */}
                    <div className={`flex-1 rounded-3xl p-8 border transition-all duration-1000 ease-out shadow-2xl flex flex-col items-center text-center ${
                        waysToHelpInView ? 'fade-in-up-delay-2' : 'opacity-0 translate-y-[50px]'
                    } ${
                        isDarkMode 
                            ? 'bg-black border-gray-700 text-white' 
                            : 'bg-white border-purple-200 text-gray-900'
                    }`}>
                        <div className={`mb-4 text-3xl ${isDarkMode ? 'text-white' : 'text-purple-600'}`}>
                            <span>✖️</span>
                        </div>
                        <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>User-Centered Design</h3>
                        <p className={`text-base ${isDarkMode ? 'opacity-80 text-gray-300' : 'text-gray-600'}`}>
                            Designing intuitive and responsive interfaces while ensuring accessibility and performance on all devices.
                        </p>
                    </div>
                    {/* API Development & Integration */}
                    <div className={`flex-1 rounded-3xl p-8 border transition-all duration-1000 ease-out shadow-2xl flex flex-col items-center text-center ${
                        waysToHelpInView ? 'fade-in-up-delay-3' : 'opacity-0 translate-y-[50px]'
                    } ${
                        isDarkMode 
                            ? 'bg-black border-gray-700 text-white' 
                            : 'bg-white border-purple-200 text-gray-900'
                    }`}>
                        <div className={`mb-4 text-3xl ${isDarkMode ? 'text-white' : 'text-purple-600'}`}>
                            <span>☁️</span>
                        </div>
                        <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>API Development & Integration</h3>
                        <p className={`text-base ${isDarkMode ? 'opacity-80 text-gray-300' : 'text-gray-600'}`}>
                            Creating and integrating RESTful APIs to connect frontend interfaces with powerful backend services.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero