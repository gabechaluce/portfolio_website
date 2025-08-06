import React, { useState, useEffect } from 'react'
import { Briefcase, GraduationCap } from 'lucide-react'
import { useTheme } from './ThemeContext'
import rga from '../assets/rga.png'
import rgawood from '../assets/rgawood.png'
import descon from '../assets/descon.png'
import yubu from '../assets/yubu.png' 

const experience = [{
    id:1,
    role: 'Full-stack Developer & IT Specialist',
    company: 'RGA Kitchen and Laundry Maintenance Services',
    period: 'February 2025',
    desc:'Full-Stack Developer & IT Specialist specializing in business management web applications. I develop integrated systems for project workflow, task management, inventory control, sales tracking, and KPI analytics, while also providing comprehensive IT solutions and technical support.',
    icon: <Briefcase className='text-blue-500 text-xl'/>,
    type: 'intern'
}]

const companyLogos = [
    { id: 1, src: rga, alt: 'RGA' },
    { id: 2, src: rgawood, alt: 'RGA Wood' },
    { id: 3, src: yubu, alt: 'Yubu' },
    { id: 4, src: descon, alt: 'Descon' }
];

const Experience = () => {
    const { isDarkMode } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [hoveredLogo, setHoveredLogo] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const experienceSection = document.getElementById('experience');
            if (experienceSection) {
                const rect = experienceSection.getBoundingClientRect();
                const isInViewport = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
                setIsVisible(isInViewport);
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
            <h2 className={`text-4xl font-bold inline-block relative pb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Professional {renderAnimatedText('Journey', true)}
                <span className="absolute bottom-0 left-0 h-1 rounded-full w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.65,0.05,0.36,1)] bg-[#8D5DF4]"></span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto mt-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
             
            </p>
        </div>
        <div className='relative'>
            <div className={`hidden sm:block absolute left-1/2 h-full w-1 ${
                isDarkMode ? 'bg-purple-400/30' : 'bg-purple-300'
            }`}></div>
            {experience.map((ex, idx) => (
                <div 
                    key={ex.id} 
                    className={`mb-12 flex flex-col sm:flex-row transition-all duration-700 ${
                        idx % 2 === 0 ? "sm:flex-row-reverse" : ""
                    } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                    onMouseEnter={() => setHoveredItem(idx)}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <div className={`sm:w-1/2 p-6 rounded-3xl transition-all duration-700 group relative cursor-pointer overflow-hidden glass-card`}
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
                                    isDarkMode ? 'text-purple-300' : 'text-purple-600'
                                }`} style={{
                                    filter: hoveredItem === idx 
                                        ? 'drop-shadow(0 8px 16px rgba(141, 93, 244, 0.4)) saturate(1.2)' 
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
        
        {/* Company Logos Section - Updated with larger size and natural colors */}
        <div className={`mt-20 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
            <h3 className={`text-2xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Client Projects & Collaborations
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto'>
                {companyLogos.map((logo, index) => (
                    <div 
                        key={logo.id}
                        className={`flex items-center justify-center p-6 rounded-2xl transition-all duration-700 glass-card group`}
                        style={{
                            transitionDelay: `${index * 100}ms`,
                            backdropFilter: 'blur(25px)',
                            WebkitBackdropFilter: 'blur(25px)',
                            background: isDarkMode 
                                ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))'
                                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))',
                            border: isDarkMode 
                                ? '1px solid rgba(255, 255, 255, 0.18)'
                                : '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: isDarkMode 
                                ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                : '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                            transform: hoveredLogo === index ? 'translateY(-8px) scale(1.05)' : 'translateY(0) scale(1)'
                        }}
                        onMouseEnter={() => setHoveredLogo(index)}
                        onMouseLeave={() => setHoveredLogo(null)}
                    >
                        <img 
                            src={logo.src} 
                            alt={logo.alt}
                            className="max-w-full max-h-20 object-contain transition-all duration-500 transform group-hover:scale-110"
                            style={{
                                filter: hoveredLogo === index ? 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))' : 'none'
                            }}
                        />
                    </div>
                ))}
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