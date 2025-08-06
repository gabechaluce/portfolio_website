import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import react from '../assets/react.png';
import node from '../assets/node.png';
import javascript from '../assets/js.png';
import tailwindcss from '../assets/tailwindcss.png';
import css from '../assets/css.png';
import html from '../assets/html.png';
import java from '../assets/java.png';
import cplusplus from '../assets/cplusplus.png';
import php from '../assets/php.png';
import vb from '../assets/vb.png';
import mysql from '../assets/mysql.png';
import sqlserver from '../assets/sqlserver.png';
import figma from '../assets/figma.png';
import androidstudio from '../assets/androidstudio.png';

const skills = [
    { img: react, name: 'React', desc: 'Frontend Library', category: 'frontend' },
    { img: node, name: 'Node', desc: 'Runtime Environment', category: 'backend' },
    { img: javascript, name: 'Javascript', desc: 'Programming Language', category: 'frontend' },
    { img: tailwindcss, name: 'Tailwind CSS', desc: 'CSS Framework', category: 'frontend' },
    { img: css, name: 'CSS', desc: 'Styling Language', category: 'frontend' },
    { img: html, name: 'HTML', desc: 'Markup Language', category: 'frontend' },
    { img: java, name: 'Java', desc: 'Programming Language', category: 'backend' },
    { img: cplusplus, name: 'C++', desc: 'Programming Language', category: 'backend' },
    { img: php, name: 'PHP', desc: 'Server-side Language', category: 'backend' },
    { img: vb, name: 'VB', desc: 'Programming Language', category: 'backend' },
    { img: mysql, name: 'MySQL', desc: 'Database System', category: 'backend' },
    { img: sqlserver, name: 'SQL Server', desc: 'Database System', category: 'backend' },
    { img: figma, name: 'Figma', desc: 'Design Tool', category: 'frontend' },
    { img: androidstudio, name: 'Android Studio', desc: 'Mobile Development', category: 'frontend' },
];

const Skills = () => {
    const { isDarkMode } = useTheme();
    const [filter, setFilter] = useState('all');
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [skillsVisible, setSkillsVisible] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                const rect = skillsSection.getBoundingClientRect();
                const isInViewport = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
                setIsVisible(isInViewport);
                
                // Individual skill card animations
                const skillCards = skillsSection.querySelectorAll('.skill-card');
                const newVisibleSkills = [];
                
                skillCards.forEach((card, index) => {
                    const cardRect = card.getBoundingClientRect();
                    const isCardVisible = cardRect.top <= window.innerHeight * 0.85 && cardRect.bottom >= 0;
                    newVisibleSkills[index] = isCardVisible;
                });
                
                setSkillsVisible(newVisibleSkills);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseMove = (e, index) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        setMousePosition({ x: rotateX, y: rotateY });
    };

    const filteredSkills = skills.filter(skill => filter === 'all' || skill.category === filter);

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
        <section id='skills' className="w-full py-16 bg-transparent relative">
            {/* Thin horizontal line above skills */}
            <div className={`w-full h-px bg-gradient-to-r from-transparent via-[#8D5DF4] to-transparent mb-16 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-16 group transition-all duration-500 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                    <h2 className={`text-4xl font-bold inline-block relative pb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {renderAnimatedText('Skills', true)}
                        <span className="absolute bottom-0 left-0 h-1 rounded-full w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.65,0.05,0.36,1)] bg-[#8D5DF4]"></span>
                    </h2>
                </div>
                
                {/* Filter buttons with glass effect */}
                <div className={`flex justify-center mb-12 gap-4 sticky top-20 z-10 py-2 transition-all duration-500 delay-100 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}>
                    {['all', 'frontend', 'backend'].map((btn) => (
                        <button
                            key={btn}
                            onClick={() => setFilter(btn)}
                            className={`relative px-6 py-3 rounded-xl overflow-hidden group transition-all duration-300 ease-in-out
                                ${filter === btn 
                                    ? (isDarkMode 
                                        ? 'bg-white/10 border border-white/30 text-purple-300 shadow-lg shadow-purple-500/20' 
                                        : 'bg-black/10 border border-black/20 text-purple-600 shadow-lg shadow-purple-500/10'
                                    )
                                    : (isDarkMode 
                                        ? 'bg-white/5 border border-white/20 text-white/80 hover:bg-white/10' 
                                        : 'bg-black/5 border border-black/10 text-gray-700 hover:bg-black/10'
                                    )
                                }`}
                            style={{
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)'
                            }}
                        >
                            <span className="relative z-10 capitalize font-medium">
                                {btn}
                            </span>
                            {/* Glass shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        </button>
                    ))}
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredSkills.map((skill, index) => (
                        <div 
                            key={index}
                            className={`skill-card flex flex-col items-center p-8 rounded-3xl group relative cursor-pointer overflow-hidden transition-all duration-500 ease-out ${
                                skillsVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                            }`}
                            style={{
                                transitionDelay: `${index * 100}ms`,
                                transform: hoveredSkill === index 
                                    ? `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) translateZ(50px) scale(1.05) ${skillsVisible[index] ? 'translateY(0)' : 'translateY(48px)'}` 
                                    : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1) ${skillsVisible[index] ? 'translateY(0)' : 'translateY(48px)'}`,
                                transition: hoveredSkill === index 
                                    ? 'transform 0.1s ease-out, opacity 0.5s ease-out' 
                                    : 'transform 0.5s ease-out, opacity 0.5s ease-out',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                background: isDarkMode 
                                    ? `linear-gradient(145deg, 
                                        rgba(255, 255, 255, ${hoveredSkill === index ? '0.12' : '0.08'}), 
                                        rgba(255, 255, 255, ${hoveredSkill === index ? '0.06' : '0.04'}))`
                                    : `linear-gradient(145deg, 
                                        rgba(255, 255, 255, ${hoveredSkill === index ? '0.7' : '0.6'}), 
                                        rgba(255, 255, 255, ${hoveredSkill === index ? '0.5' : '0.4'}))`,
                                border: isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)'
                                    : '1px solid rgba(0, 0, 0, 0.15)',
                                boxShadow: hoveredSkill === index 
                                    ? (isDarkMode 
                                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(141, 93, 244, 0.3)'
                                        : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(141, 93, 244, 0.2)'
                                    )
                                    : (isDarkMode 
                                        ? '0 8px 32px rgba(0, 0, 0, 0.4)'
                                        : '0 8px 32px rgba(0, 0, 0, 0.12)'
                                    )
                            }}
                            onMouseEnter={() => setHoveredSkill(index)}
                            onMouseLeave={() => {
                                setHoveredSkill(null);
                                setMousePosition({ x: 0, y: 0 });
                            }}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                        >
                            {/* Floating icon container */}
                            <div className={`mb-6 p-4 rounded-2xl transition-all duration-700 relative z-10`} 
                                style={{
                                    transform: hoveredSkill === index ? 'translateY(-10px) rotateY(15deg) scale(1.15)' : 'translateY(0) rotateY(0deg) scale(1)',
                                    background: isDarkMode 
                                        ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05))'
                                        : 'linear-gradient(145deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5))',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    border: isDarkMode 
                                        ? '1px solid rgba(255, 255, 255, 0.15)'
                                        : '1px solid rgba(0, 0, 0, 0.1)',
                                    boxShadow: hoveredSkill === index 
                                        ? '0 15px 35px rgba(0, 0, 0, 0.15)'
                                        : '0 5px 15px rgba(0, 0, 0, 0.08)'
                                }}>
                                <img 
                                    src={skill.img} 
                                    alt={skill.name} 
                                    className="w-16 h-16 object-contain transition-all duration-700" 
                                    style={{
                                        filter: hoveredSkill === index 
                                            ? 'drop-shadow(0 8px 16px rgba(141, 93, 244, 0.4)) saturate(1.2) brightness(1.1)' 
                                            : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1)) saturate(0.9)',
                                        transform: hoveredSkill === index ? 'scale(1.1) rotateZ(5deg)' : 'scale(1) rotateZ(0deg)'
                                    }}
                                />
                            </div>
                            
                            {/* Skill name with 3D effect */}
                            <h3 className={`text-xl font-bold mb-3 relative z-10 transition-all duration-500 text-center ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                            }`} style={{
                                transform: hoveredSkill === index ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
                                textShadow: hoveredSkill === index 
                                    ? (isDarkMode 
                                        ? '0 5px 15px rgba(141, 93, 244, 0.6)' 
                                        : '0 5px 15px rgba(141, 93, 244, 0.4)'
                                    )
                                    : 'none'
                            }}>
                                {skill.name}
                            </h3>
                            
                            {/* Description with fade-in effect */}
                            <p className={`text-sm text-center px-2 relative z-10 transition-all duration-500 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`} style={{
                                opacity: hoveredSkill === index ? 1 : 0.7,
                                transform: hoveredSkill === index ? 'translateY(-3px)' : 'translateY(0)'
                            }}>
                                {skill.desc}
                            </p>
                            
                            {/* Animated border glow */}
                            <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                                <div className={`absolute inset-0 rounded-3xl transition-all duration-700 ${
                                    hoveredSkill === index ? 'opacity-100' : 'opacity-0'
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
                                hoveredSkill === index ? 'opacity-100' : 'opacity-0'
                            }`} style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)'
                            }}></div>
                        </div>
                    ))}
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
                
                .skill-card {
                    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
                }
            `}</style>
        </section>
    );
};

export default Skills;