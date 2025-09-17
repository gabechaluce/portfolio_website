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
import kotlin from '../assets/kotlin.png';
import tensorflow from '../assets/tensorflow.png';
import firebase from '../assets/firebase.png';
import maria from '../assets/maria.png';
import git from '../assets/git.png';
import myadmin from '../assets/myadmin.png';
<<<<<<< HEAD
import sass from '../assets/sass.png';
=======
>>>>>>> a1a5d5304bab8d60b017e52261934ef3241c454d

// Reorganized skills array - Frontend first, then Backend
const skills = [
    // Frontend Skills
    
    { img: javascript, name: 'Javascript', desc: 'Programming Language', category: 'frontend' },
    { img: react, name: 'React', desc: 'Frontend Library', category: 'frontend' },
    { img: html, name: 'HTML', desc: 'Markup Language', category: 'frontend' },
    { img: css, name: 'CSS', desc: 'Styling Language', category: 'frontend' },
<<<<<<< HEAD
    { img: sass, name: 'Sass', desc: 'CSS Preprocessor', category: 'frontend' }, 
=======
>>>>>>> a1a5d5304bab8d60b017e52261934ef3241c454d
    { img: tailwindcss, name: 'Tailwind CSS', desc: 'CSS Framework', category: 'frontend' },
    { img: figma, name: 'Figma', desc: 'Design Tool', category: 'frontend' },
    { img: androidstudio, name: 'Android Studio', desc: 'Mobile Development', category: 'frontend' },
    { img: kotlin, name: 'Kotlin', desc: 'Mobile Development', category: 'frontend' },
    
    // Backend Skills
    { img: node, name: 'Node', desc: 'Runtime Environment', category: 'backend' },
    { img: java, name: 'Java', desc: 'Programming Language', category: 'backend' },
    { img: cplusplus, name: 'C++', desc: 'Programming Language', category: 'backend' },
    { img: php, name: 'PHP', desc: 'Server-side Language', category: 'backend' },
    { img: vb, name: 'VB', desc: 'Programming Language', category: 'backend' },
    { img: mysql, name: 'MySQL', desc: 'Database System', category: 'backend' },
    { img: sqlserver, name: 'SQL Server', desc: 'Database System', category: 'backend' },
    { img: maria, name: 'MariaDB', desc: 'Database System', category: 'backend' },
    { img: tensorflow, name: 'TensorFlow', desc: 'Machine Learning', category: 'backend' },
    { img: firebase, name: 'Firebase', desc: 'Backend Service', category: 'backend' },
    { img: git, name: 'Git', desc: 'Version Control', category: 'backend' },
    { img: myadmin, name: 'phpMyAdmin', desc: 'Database Management', category: 'backend' }
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
                    <h2 className={`cal-sans-bold text-4xl font-bold inline-block relative pb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {renderAnimatedText('Tech Skills', true)}
                        <span className="absolute bottom-0 left-0 h-1 rounded-full w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.65,0.05,0.36,1)] bg-[#8D5DF4]"></span>
                    </h2>
                </div>
                
                {/* Filter buttons with enhanced glass effect */}
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
                                        ? 'bg-white/15 border border-white/40 text-purple-200 shadow-lg shadow-purple-500/30' 
                                        : 'bg-black/15 border border-black/25 text-purple-700 shadow-lg shadow-purple-500/20'
                                    )
                                    : (isDarkMode 
                                        ? 'bg-white/8 border border-white/25 text-white/90 hover:bg-white/15 hover:border-white/35' 
                                        : 'bg-black/8 border border-black/15 text-gray-800 hover:bg-black/15 hover:border-black/25'
                                    )
                                }`}
                            style={{
                                backdropFilter: 'blur(16px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(16px) saturate(180%)'
                            }}
                        >
                            <span className="relative z-10 capitalize font-medium">
                                {btn}
                            </span>
                            {/* Enhanced glass shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                            {/* Subtle inner glow for selected state */}
                            {filter === btn && (
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
                            )}
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
                                    ? 'transform 0.1s ease-out, opacity 0.5s ease-out, box-shadow 0.3s ease-out' 
                                    : 'transform 0.5s ease-out, opacity 0.5s ease-out, box-shadow 0.5s ease-out',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                background: isDarkMode 
                                    ? `linear-gradient(145deg, 
                                        rgba(0, 0, 0, ${hoveredSkill === index ? '0.5' : '0.3'}), 
                                        rgba(0, 0, 0, ${hoveredSkill === index ? '0.6' : '0.4'}))`
                                    : `linear-gradient(145deg, 
                                        rgba(255, 255, 255, ${hoveredSkill === index ? '0.8' : '0.7'}), 
                                        rgba(255, 255, 255, ${hoveredSkill === index ? '0.6' : '0.5'}))`,
                                // Enhanced border with subtle gradient
                                border: isDarkMode 
                                    ? `1px solid rgba(255, 255, 255, ${hoveredSkill === index ? '0.35' : '0.25'})`
                                    : '1px solid rgba(0, 0, 0, 0.2)',
                                boxShadow: hoveredSkill === index 
                                    ? (isDarkMode 
                                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 35px rgba(141, 93, 244, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
                                        : '0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 35px rgba(141, 93, 244, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                                    )
                                    : (isDarkMode 
                                        ? '0 10px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.3)'
                                        : '0 10px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.7)'
                                    )
                            }}
                            onMouseEnter={() => setHoveredSkill(index)}
                            onMouseLeave={() => {
                                setHoveredSkill(null);
                                setMousePosition({ x: 0, y: 0 });
                            }}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                        >
                            {/* Floating icon container with enhanced white background */}
                            <div className={`mb-6 p-4 rounded-2xl transition-all duration-700 relative z-10 ${
                                isDarkMode ? 'bg-white/95' : 'bg-white'
                            }`} 
                                style={{
                                    transform: hoveredSkill === index ? 'translateY(-10px) rotateY(15deg) scale(1.15)' : 'translateY(0) rotateY(0deg) scale(1)',
                                    boxShadow: hoveredSkill === index 
                                        ? '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 20px rgba(141, 93, 244, 0.4)'
                                        : '0 8px 25px rgba(0, 0, 0, 0.1)'
                                }}>
                                <img 
                                    src={skill.img} 
                                    alt={skill.name} 
                                    className="w-16 h-16 object-contain transition-all duration-700" 
                                    style={{
                                        filter: hoveredSkill === index 
                                            ? 'drop-shadow(0 10px 20px rgba(141, 93, 244, 0.5)) saturate(1.3) brightness(1.15)' 
                                            : 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15)) saturate(0.95)',
                                        transform: hoveredSkill === index ? 'scale(1.1) rotateZ(5deg)' : 'scale(1) rotateZ(0deg)'
                                    }}
                                />
                            </div>
                            
                            {/* Skill name with enhanced 3D effect */}
                            <h3 className={`text-xl font-bold mb-3 relative z-10 transition-all duration-500 text-center ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                            }`} style={{
                                transform: hoveredSkill === index ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
                                textShadow: hoveredSkill === index 
                                    ? (isDarkMode 
                                        ? '0 5px 20px rgba(141, 93, 244, 0.8), 0 2px 5px rgba(0, 0, 0, 0.5)' 
                                        : '0 5px 20px rgba(141, 93, 244, 0.6), 0 2px 3px rgba(0, 0, 0, 0.2)'
                                    )
                                    : (isDarkMode ? '0 2px 8px rgba(0, 0, 0, 0.4)' : 'none')
                            }}>
                                {skill.name}
                            </h3>
                            
                            {/* Description with enhanced fade-in effect */}
                            <p className={`text-sm text-center px-2 relative z-10 transition-all duration-500 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`} style={{
                                opacity: hoveredSkill === index ? 1 : 0.8,
                                transform: hoveredSkill === index ? 'translateY(-3px)' : 'translateY(0)',
                                textShadow: isDarkMode && hoveredSkill === index ? '0 1px 2px rgba(0, 0, 0, 0.5)' : 'none'
                            }}>
                                {skill.desc}
                            </p>
                            
                            {/* Enhanced animated border glow */}
                            <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                                <div className={`absolute inset-0 rounded-3xl transition-all duration-700 ${
                                    hoveredSkill === index ? 'opacity-100' : 'opacity-0'
                                }`} style={{
                                    background: `conic-gradient(from 0deg, 
                                        rgba(141, 93, 244, 0.4), 
                                        rgba(250, 60, 112, 0.4), 
                                        rgba(141, 93, 244, 0.4))`,
                                    padding: '2px',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'exclude',
                                    maskComposite: 'exclude',
                                    animation: hoveredSkill === index ? 'rotateBorder 3s linear infinite' : 'none'
                                }}></div>
                            </div>
                            
                            {/* Enhanced glass reflection */}
                            <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700 ${
                                hoveredSkill === index ? 'opacity-100' : 'opacity-30'
                            }`} style={{
                                background: isDarkMode 
                                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 40%, rgba(255, 255, 255, 0.1) 100%)'
                                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 40%, rgba(255, 255, 255, 0.15) 100%)'
                            }}></div>
                            
                            {/* Enhanced glassmorphism effect for dark mode */}
                            {isDarkMode && (
                                <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 30%, rgba(255, 255, 255, 0.04) 100%)',
                                    backdropFilter: 'blur(25px) saturate(200%)',
                                    WebkitBackdropFilter: 'blur(25px) saturate(200%)'
                                }}></div>
                            )}
                            
                            {/* Subtle radial gradient for depth */}
                            <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-30" style={{
                                background: isDarkMode 
                                    ? 'radial-gradient(ellipse at center, rgba(141, 93, 244, 0.2) 0%, transparent 70%)'
                                    : 'radial-gradient(ellipse at center, rgba(141, 93, 244, 0.1) 0%, transparent 70%)'
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
                
                @keyframes rotateBorder {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .liquid-letter:hover { 
                    animation: liquidHover 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
                }
                
                .skill-card {
                    transition: opacity 0.5s ease-out, transform 0.5s ease-out, box-shadow 0.5s ease-out;
                }
            `}</style>
        </section>
    );
};

export default Skills;