import React, { useState, useEffect } from 'react'
import { Briefcase, GraduationCap } from 'lucide-react'
import { useTheme } from './ThemeContext'
import rga from '../assets/rga.png'
import rgawood from '../assets/rgawood.png'
import descon from '../assets/descon.png'
import yubu from '../assets/yubu.png' 
import stop2cha from '../assets/s2c.png'

const experience = [{
    id:1,
    role: 'Full-stack Developer & IT Specialist',
    company: 'RGA Kitchen and Laundry Maintenance Services',
    period: 'February 2025',
    desc:'Full-Stack Developer & IT Specialist specializing in business management web applications. I develop integrated systems for project workflow, task management, inventory control, sales tracking, and KPI analytics, while also providing comprehensive IT solutions and technical support.',
    icon: <Briefcase className='text-yellow-500 text-xl'/>,
    type: 'intern'
}]

const companyLogos = [
    { id: 1, src: rga, alt: 'RGA' },
    { id: 2, src: rgawood, alt: 'RGA Wood' },
    { id: 3, src: yubu, alt: 'Yubu' },
    { id: 4, src: descon, alt: 'Descon' },
     { id: 5, src: stop2cha, alt: 's2c' }
];

const Experience = () => {
    const { isDarkMode } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [isLogosVisible, setIsLogosVisible] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [hoveredLogo, setHoveredLogo] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const experienceSection = document.getElementById('experience');
            const logosSection = document.querySelector('.client-logos-section');
            
            if (experienceSection) {
                const rect = experienceSection.getBoundingClientRect();
                const isInViewport = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
                setIsVisible(isInViewport);
            }
            
            if (logosSection) {
                const rect = logosSection.getBoundingClientRect();
                const isInViewport = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
                setIsLogosVisible(isInViewport);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Function to render animated text similar to Hero and Skills
    const renderAnimatedText = (text, isGradient = false) => {
        return text.split('').map((char, index) => (
            <span
                key={index}
                className={`inline-block cursor-default liquid-letter ${
                    char === ' ' ? 'w-2' : ''
                } ${isGradient ? 'bg-gradient-to-r from-[#8D5DF4] via-[#8D5DF4] to-[#8D5DF4] bg-clip-text text-transparent' : ''}`}
                style={{ animationDelay: `${index * 50}ms` }}
                onMouseEnter={(e) => {
                    e.target.style.animation = 'liquidHover 1.5s ease-in-out';
                    e.target.style.textShadow = isGradient 
                        ? '0 0 15px rgba(141, 93, 244, 0.6)' 
                        : isDarkMode 
                            ? '0 0 15px rgba(255, 255, 255, 0.6)' 
                            : '0 0 15px rgba(0, 0, 0, 0.6)';
                    setTimeout(() => e.target.style.animation = '', 1500);
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
   <section id='experience' data-aos='fade-up' data-aos-delay='250'
   className='w-full py-20 px-4 sm:px-8 bg-transparent relative'>
    {/* Thin horizontal line above experience - same as skills section */}
    <div className={`w-full h-px bg-gradient-to-r from-transparent via-[#8D5DF4] to-transparent mb-16 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}></div>
    
    <div className='max-w-6xl mx-auto'>
        <div className={`text-center mb-16 relative group transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
            <h2 className={`cal-sans-bold text-4xl inline-block relative pb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Professional {renderAnimatedText('Journey', true)}
                <span className="absolute bottom-0 left-0 h-1 rounded-full w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.65,0.05,0.36,1)] bg-[#8D5DF4]"></span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto mt-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
             
            </p>
        </div>
        <div className='relative'>
            {/* Extended Vertical timeline line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 ${
                isDarkMode ? 'bg-purple-400/30' : 'bg-purple-300'
            }`} style={{
                top: '-60px',
                height: 'calc(100% + 120px)'
            }}></div>
            {experience.map((ex, idx) => (
                <div 
                    key={ex.id} 
                    className={`mb-12 flex justify-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                    onMouseEnter={() => setHoveredItem(idx)}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <div className={`w-full max-w-2xl p-6 rounded-3xl transition-all duration-700 group relative cursor-pointer overflow-hidden glass-card`}
                        style={{
                            transform: hoveredItem === idx ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                            backdropFilter: 'blur(25px)',
                            WebkitBackdropFilter: 'blur(25px)',
                            background: isDarkMode 
                                ? `linear-gradient(145deg, 
                                    rgba(255, 255, 255, ${hoveredItem === idx ? '0.15' : '0.08'}), 
                                    rgba(255, 255, 255, ${hoveredItem === idx ? '0.05' : '0.02'}))`
                                : `linear-gradient(145deg, 
                                    rgba(255, 255, 255, ${hoveredItem === idx ? '0.9' : '0.7'}), 
                                    rgba(255, 255, 255, ${hoveredItem === idx ? '0.6' : '0.4'}))`,
                            border: isDarkMode 
                                ? '1px solid rgba(255, 255, 255, 0.18)'
                                : '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: hoveredItem === idx 
                                ? (isDarkMode 
                                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(141, 93, 244, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                    : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(141, 93, 244, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                                )
                                : (isDarkMode 
                                    ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                    : '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
                                )
                        }}
                    >
                        <div className='flex items-center mb-4'>
                            <div className={`p-3 rounded-2xl transition-all duration-500 glass-icon`}
                                style={{
                                    background: isDarkMode 
                                        ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05))'
                                        : 'linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))',
                                    backdropFilter: 'blur(15px)',
                                    WebkitBackdropFilter: 'blur(15px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    transform: hoveredItem === idx ? 'scale(1.1) rotateY(15deg)' : 'scale(1) rotateY(0deg)'
                                }}
                            >
                                <Briefcase className={`text-xl transition-all duration-500 ${
                                    isDarkMode ? 'text-yellow-300' : 'text-yellow-600'
                                }`} style={{
                                    filter: hoveredItem === idx 
                                        ? 'drop-shadow(0 8px 16px rgba(255, 193, 7, 0.4)) saturate(1.2)' 
                                        : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))'
                                }} />
                            </div>
                            <div className='ml-4'>
                                <h3 className={`text-xl font-semibold transition-all duration-500 ${
                                    isDarkMode ? 'text-white' : 'text-gray-800'
                                }`} style={{
                                    textShadow: hoveredItem === idx 
                                        ? (isDarkMode 
                                            ? '0 5px 15px rgba(141, 93, 244, 0.6)' 
                                            : '0 5px 15px rgba(141, 93, 244, 0.4)'
                                        )
                                        : 'none'
                                }}>
                                    {ex.role}
                                </h3>
                                <p className={`transition-all duration-500 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                    {ex.company}
                                </p>
                            </div>
                        </div>
                        <p className={`italic mb-2 transition-all duration-500 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            {ex.period}
                        </p>
                        <p className={`transition-all duration-500 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            {ex.desc}
                        </p>
                        <div className={`mt-4 px-3 py-1 rounded-full text-sm inline-block transition-all duration-500 ${
                            isDarkMode 
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30' 
                                : 'bg-purple-100 text-purple-800 border border-purple-200'
                        }`}>
                            Intern
                        </div>
                        
                        {/* Animated border glow */}
                        <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                            <div className={`absolute inset-0 rounded-3xl transition-all duration-700 ${
                                hoveredItem === idx ? 'opacity-100' : 'opacity-0'
                            }`} style={{
                                background: `conic-gradient(from 0deg, 
                                    rgba(141, 93, 244, 0.3), 
                                    rgba(250, 60, 112, 0.3), 
                                    rgba(141, 93, 244, 0.3))`,
                                padding: '2px',
                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'exclude',
                                maskComposite: 'exclude'
                            }}></div>
                        </div>
                        
                        {/* Glass reflection */}
                        <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700 ${
                            hoveredItem === idx ? 'opacity-100' : 'opacity-0'
                        }`} style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)'
                        }}></div>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Enhanced Company Logos Section */}
        <div className={`client-logos-section mt-24 transition-all duration-1000 ease-out ${
            isLogosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
            {/* Enhanced title with gradient line */}
            <div className="text-center mb-16 relative">
                <div className={`w-24 h-px bg-gradient-to-r from-transparent via-[#8D5DF4] to-transparent mx-auto mb-6 transition-all duration-700 ${
                    isLogosVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}></div>
                <h3 className={`cal-sans-bold text-2xl relative inline-block group transition-all duration-700 ${
                    isDarkMode ? 'text-white' : 'text-black'
                } ${isLogosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ lineHeight: '1.4', paddingBottom: '8px' }}>
                    <span className="whitespace-nowrap">
                        {renderAnimatedText('Client', true)} {renderAnimatedText('Projects', true)}
                    </span>{' '}
                    <span className="whitespace-nowrap">
                        & {renderAnimatedText('Collaborations', true)}
                    </span>
                    <span className="absolute -bottom-2 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.65,0.05,0.36,1)] bg-gradient-to-r from-[#8D5DF4] to-[#FA3C70]"></span>
                </h3>
                <p className={`text-base font-medium mt-4 max-w-md mx-auto transition-all duration-700 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                } ${isLogosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
                style={{ transitionDelay: '200ms' }}>
                    Trusted partnerships and successful project deliveries
                </p>
                <div className={`w-16 h-px bg-gradient-to-r from-transparent via-[#8D5DF4] to-transparent mx-auto mt-6 transition-all duration-700 ${
                    isLogosVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`} style={{ transitionDelay: '400ms' }}></div>
            </div>

            {/* Enhanced logos grid */}
            <div className='grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto'>
                {companyLogos.map((logo, index) => (
                    <div 
                        key={logo.id}
                        className={`relative flex items-center justify-center p-8 rounded-3xl transition-all duration-700 glass-card group cursor-pointer ${
                            isLogosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                        style={{
                            transitionDelay: `${index * 150}ms`,
                            backdropFilter: 'blur(30px)',
                            WebkitBackdropFilter: 'blur(30px)',
                            background: isDarkMode 
                                ? hoveredLogo === index
                                    ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.15), rgba(141, 93, 244, 0.08), rgba(255, 255, 255, 0.05))'
                                    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03))'
                                : hoveredLogo === index
                                    ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(141, 93, 244, 0.1), rgba(255, 255, 255, 0.6))'
                                    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))',
                            border: isDarkMode 
                                ? hoveredLogo === index 
                                    ? '1px solid rgba(141, 93, 244, 0.4)'
                                    : '1px solid rgba(255, 255, 255, 0.15)'
                                : hoveredLogo === index 
                                    ? '1px solid rgba(141, 93, 244, 0.3)'
                                    : '1px solid rgba(255, 255, 255, 0.4)',
                            boxShadow: hoveredLogo === index
                                ? (isDarkMode 
                                    ? '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(141, 93, 244, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                    : '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 25px rgba(141, 93, 244, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                                )
                                : (isDarkMode 
                                    ? '0 10px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                    : '0 10px 25px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)'
                                ),
                            transform: hoveredLogo === index ? 'translateY(-12px) scale(1.08)' : 'translateY(0) scale(1)'
                        }}
                        onMouseEnter={() => setHoveredLogo(index)}
                        onMouseLeave={() => setHoveredLogo(null)}
                    >
                        {/* Floating particles effect */}
                        <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700 ${
                            hoveredLogo === index ? 'opacity-100' : 'opacity-0'
                        }`}>
                            <div className="absolute top-2 left-4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                            <div className="absolute top-6 right-6 w-0.5 h-0.5 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute bottom-4 left-6 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                        </div>

                        {/* Enhanced glow border */}
                        <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700 ${
                            hoveredLogo === index ? 'opacity-100' : 'opacity-0'
                        }`} style={{
                            background: `conic-gradient(from 0deg, 
                                rgba(141, 93, 244, 0.4), 
                                rgba(250, 60, 112, 0.4), 
                                rgba(255, 193, 7, 0.4), 
                                rgba(141, 93, 244, 0.4))`,
                            padding: '1px',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'exclude',
                            maskComposite: 'exclude',
                            animation: hoveredLogo === index ? 'rotate 3s linear infinite' : 'none'
                        }}></div>

                        {/* Logo with enhanced effects */}
                        <img 
                            src={logo.src} 
                            alt={logo.alt}
                            className="max-w-full max-h-24 object-contain transition-all duration-500 transform relative z-10"
                            style={{
                                filter: hoveredLogo === index 
                                    ? 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.25)) brightness(1.1) contrast(1.1)' 
                                    : isDarkMode 
                                        ? 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))' 
                                        : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))',
                                transform: hoveredLogo === index ? 'scale(1.1) rotateY(5deg)' : 'scale(1) rotateY(0deg)'
                            }}
                        />

                        {/* Reflection effect */}
                        <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700 ${
                            hoveredLogo === index ? 'opacity-30' : 'opacity-0'
                        }`} style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)'
                        }}></div>
                    </div>
                ))}
            </div>
            
            {/* Bottom decorative element */}
            <div className={`flex justify-center mt-12 transition-all duration-700 ${
                isLogosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '800ms' }}>
                <div className="flex space-x-2">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isDarkMode ? 'bg-purple-400/50' : 'bg-purple-300/70'
                    }`}></div>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isDarkMode ? 'bg-pink-400/50' : 'bg-pink-300/70'
                    }`}></div>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isDarkMode ? 'bg-yellow-400/50' : 'bg-yellow-300/70'
                    }`}></div>
                </div>
            </div>
        </div>
    </div>
    
    <style jsx global>{`
        @keyframes liquidHover {
            0%, 100% { 
                transform: scale(1) translateY(0) rotate(0deg); 
            }
            20% { 
                transform: scale(1.1) translateY(-4px) rotate(-2deg); 
            }
            40% { 
                transform: scale(1.05) translateY(2px) rotate(1deg); 
            }
            60% { 
                transform: scale(1.08) translateY(-2px) rotate(-1deg); 
            }
            80% { 
                transform: scale(1.03) translateY(1px) rotate(0.5deg); 
            }
        }
        
        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        .liquid-letter:hover { 
            animation: liquidHover 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
        }
        
        .glass-card {
            transform-style: preserve-3d;
        }
        
        .glass-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        }
        
        .glass-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        }
        
        .glass-icon {
            transform-style: preserve-3d;
        }
    `}</style>
   </section>
  )
}

export default Experience