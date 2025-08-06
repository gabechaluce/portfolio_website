import React, { useState, useEffect } from 'react'
import { useTheme } from './ThemeContext'
import me from '../assets/me.jpg'

const Hero = () => {
    const { isDarkMode } = useTheme();
    const [textVisible, setTextVisible] = useState(false);
    const [typewriterText, setTypewriterText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [typingPaused, setTypingPaused] = useState(false);
    
    const words = ['Web Developer', 'Frontend Enthusiast', 'Mobile App Developer'];
    
    useEffect(() => {
        // Start the fade-in animation after 3 seconds
        const timer = setTimeout(() => {
            setTextVisible(true);
        }, 3000);
        
        return () => clearTimeout(timer);
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
              
            <section id='About' className='body-font z-10'>
                <div className='max-w-7xl mx-auto flex px-4 lg:px-2 py-32 mt-16 flex-col items-center'>
                    <div className={`relative flex flex-col items-center text-center mb-20 transition-all duration-1000 ease-out transform ${
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
                        `}</style>
                        
                        {/* Removed border around title section */}
                        <div className="mb-8">
                            <h1 className={`title-font sm:text-6xl text-4xl mb-4 font-bold leading-tight ${
                                isDarkMode ? 'text-white' : 'text-black'
                            }`}>
                                <span className="boogaloo-regular select-none sm:text-6xl text-5xl">Hello there, I am</span>
                                <br />
                                <span className=" cal-sans-regular inline-block">
                                    {renderAnimatedText('Gabriel Echaluce.', true)}
                                </span>
                            </h1>
                        </div>
                        
                        <div className="relative h-16 sm:h-20 flex items-center justify-center mb-8">
                            <h2 className={`sm:text-3xl text-2xl mb-4 font-bold ${
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
                        
                        <div className='flex justify-center'>
                            <a 
                                href="../assets/Errol Gabriel Echaluce.pdf" 
                                download='Errol Gabriel Echaluce CV.pdf' 
                                className={`inline-flex items-center justify-center border-2 py-3 px-8
                                focus:outline-none text-lg font-semibold
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

                {/* ABOUT ME SECTION - CENTERED */}
                <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
                    textVisible ? 'opacity-100' : 'opacity-0'
                }`}>
                    {/* Removed border around about section - adjusted spacing */}
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 max-w-6xl">
                        {/* Profile Image centered with enhanced quality - adjusted for mobile */}
                        <div className="relative group -mt-24 sm:-mt-8 md:mt-0">
                            <div className={`w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl transition-all duration-300 ease-in-out group-hover:scale-105 border-4 ${
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
                            {/* Enhanced gradient overlay effect with better blending */}
                            <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                isDarkMode
                                    ? 'bg-gradient-to-r from-pink-500/10 to-pink-600/10'
                                    : 'bg-gradient-to-r from-purple-500/10 to-purple-600/10'
                            }`}
                            style={{
                                mixBlendMode: 'overlay',
                            }}
                            ></div>
                            
                            {/* Additional enhancement layer for premium look */}
                            <div className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                                    mixBlendMode: 'soft-light',
                                }}
                            ></div>
                        </div>

                        {/* Text Content centered - removed border */}
                        <div className="max-w-2xl space-y-6">
                            <p className={`text-lg sm:text-xl leading-relaxed ${
                                isDarkMode ? 'text-gray-300' : 'text-black'
                            }`}>
                                <span className={`font-semibold bg-gradient-to-r bg-clip-text text-transparent ${
                                    isDarkMode 
                                        ? 'from-pink-400 to-pink-600' 
                                        : 'from-purple-600 to-purple-800'
                                }`}>
                                  Errol Gabriel Echaluce
                                </span>{/*, dedicated to bridging the gaps and pushing the boundaries of technology through disruptive innovations and redefining human-computer interactions with cutting-edge AI advancements. */}
                            </p>


                        </div>
                    </div>
              
                </div>
            </section>
     
    )
}

export default Hero