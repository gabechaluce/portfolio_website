import React, { useState, useEffect } from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useTheme } from './ThemeContext';

// Sample project data
const projects = [
    {
        id: 1, 
        title: 'E-Commerce Platform',
        desc: 'A full-stack e-commerce solution with modern UI, secure payment integration, and real-time inventory management.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
        github: 'https://github.com/yourusername/ecommerce',
        demo: 'https://your-ecommerce-demo.com',
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
        category: 'fullstack'
    },
    {
        id: 2, 
        title: 'Task Management App',
        desc: 'Collaborative project management tool with drag-and-drop functionality, team chat, and progress tracking.',
        technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
        github: 'https://github.com/yourusername/taskmanager',
        demo: 'https://your-taskmanager-demo.com',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
        category: 'frontend'
    },
    {
        id: 3, 
        title: 'AI Chat Application',
        desc: 'Real-time chat application powered by AI with smart responses, sentiment analysis, and multi-language support.',
        technologies: ['Python', 'FastAPI', 'OpenAI API', 'WebSocket'],
        github: 'https://github.com/yourusername/aichat',
        demo: 'https://your-aichat-demo.com',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
        category: 'backend'
    },
    {
        id: 4, 
        title: 'Mobile Banking App',
        desc: 'Secure mobile banking application with biometric authentication, transaction history, and budget tracking.',
        technologies: ['React Native', 'Node.js', 'PostgreSQL', 'JWT'],
        github: 'https://github.com/yourusername/mobilebanking',
        demo: 'https://your-banking-demo.com',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop',
        category: 'mobile'
    },
    {
        id: 5, 
        title: 'Data Analytics Dashboard',
        desc: 'Interactive dashboard for business intelligence with real-time charts, data visualization, and export functionality.',
        technologies: ['Vue.js', 'D3.js', 'Express', 'MySQL'],
        github: 'https://github.com/yourusername/analytics',
        demo: 'https://your-analytics-demo.com',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        category: 'fullstack'
    },
    {
        id: 6, 
        title: 'Social Media Platform',
        desc: 'Modern social networking platform with real-time messaging, content sharing, and advanced privacy controls.',
        technologies: ['Next.js', 'GraphQL', 'Redis', 'Cloudinary'],
        github: 'https://github.com/yourusername/social',
        demo: 'https://your-social-demo.com',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
        category: 'fullstack'
    }
];

const Projects = () => {
    const { isDarkMode } = useTheme();
    const [filter, setFilter] = useState('all');
    const [hoveredProject, setHoveredProject] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showAll, setShowAll] = useState(false);
    
    const filteredProjects = projects.filter(project => filter === 'all' || project.category === filter);
    const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);
    const hasMoreProjects = filteredProjects.length > 4;

    useEffect(() => {
        const handleScroll = () => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const rect = projectsSection.getBoundingClientRect();
                const isInViewport = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
                setIsVisible(isInViewport);
            }
        };
        
        // Initial setup
        handleScroll();
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Reset showAll when filter changes
    useEffect(() => {
        setShowAll(false);
    }, [filter]);

    const handleMouseMove = (e, index) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        setMousePosition({ x: rotateX, y: rotateY });
    };

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
        <section id='projects' className='w-full py-20 px-4 sm:px-8 bg-transparent'>
            
            <div className='max-w-6xl mx-auto'>
                <div className={`text-center mb-16 relative group transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h2 className={`text-4xl font-bold inline-block relative pb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        My {renderAnimatedText('Projects', true)}
                        <span className="absolute bottom-0 left-0 h-1 rounded-full w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.65,0.05,0.36,1)] bg-[#8D5DF4]"></span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto mt-4 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        A showcase of my development journey and technical expertise
                    </p>
                </div>

                {/* Filter buttons */}
                <div className='flex flex-wrap justify-center gap-3 mb-12'>
                    {['all', 'fullstack', 'frontend', 'backend', 'mobile'].map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-md border ${
                                filter === category
                                    ? (isDarkMode
                                        ? 'bg-[#8D5DF4] text-white border-[#8D5DF4] shadow-lg shadow-[#8D5DF4]/30'
                                        : 'bg-[#8D5DF4] text-white border-[#8D5DF4] shadow-lg shadow-[#8D5DF4]/30'
                                    )
                                    : (isDarkMode
                                        ? 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/15 hover:text-white'
                                        : 'bg-white/60 text-gray-700 border-white/40 hover:bg-white/80 hover:text-black'
                                    )
                            }`}
                            style={{
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)'
                            }}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
                
                {/* Projects grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'>
                    {displayedProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`glass-card rounded-3xl overflow-hidden transition-all duration-700 group relative cursor-pointer h-full flex flex-col ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                            onMouseEnter={() => {
                                setHoveredProject(index);
                            }}
                            onMouseLeave={() => {
                                setHoveredProject(null);
                                setMousePosition({ x: 0, y: 0 });
                            }}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            style={{
                                transform: hoveredProject === index 
                                    ? `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) translateZ(30px) scale(1.02)` 
                                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
                                transition: hoveredProject === index ? 'transform 0.1s ease-out' : 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                                transitionDelay: `${index * 100}ms`,
                                backdropFilter: 'blur(25px)',
                                WebkitBackdropFilter: 'blur(25px)',
                                background: isDarkMode 
                                    ? `linear-gradient(145deg, 
                                        rgba(255, 255, 255, ${hoveredProject === index ? '0.15' : '0.08'}), 
                                        rgba(255, 255, 255, ${hoveredProject === index ? '0.05' : '0.02'}))`
                                    : `linear-gradient(145deg, 
                                        rgba(255, 255, 255, ${hoveredProject === index ? '0.9' : '0.7'}), 
                                        rgba(255, 255, 255, ${hoveredProject === index ? '0.6' : '0.4'}))`,
                                border: isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.18)'
                                    : '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: hoveredProject === index 
                                    ? (isDarkMode 
                                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(141, 93, 244, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                        : '0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 30px rgba(141, 93, 244, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                                    )
                                    : (isDarkMode 
                                        ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                        : '0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                                    )
                            }}
                        >
                            <div className='relative h-48 overflow-hidden rounded-t-3xl'>
                                <img src={project.image} alt={project.title}
                                    className='w-full h-full object-cover transition-all duration-700'
                                    style={{
                                        transform: hoveredProject === index ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0deg)',
                                        filter: hoveredProject === index 
                                            ? 'brightness(1.1) saturate(1.2) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))' 
                                            : 'brightness(1) saturate(1) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
                                    }}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${
                                    hoveredProject === index 
                                        ? 'from-purple-900/20 to-transparent' 
                                        : 'from-black/10 to-transparent'
                                }`}></div>
                            </div>
                            
                            <div className='p-6 flex-1 flex flex-col relative z-10'>
                                <h3 className={`text-xl font-bold mb-3 transition-all duration-500 ${
                                    isDarkMode ? 'text-white' : 'text-gray-800'
                                }`} style={{
                                    textShadow: hoveredProject === index 
                                        ? (isDarkMode 
                                            ? '0 5px 15px rgba(141, 93, 244, 0.6)' 
                                            : '0 5px 15px rgba(141, 93, 244, 0.4)'
                                        )
                                        : 'none'
                                }}>
                                    {project.title}
                                </h3>
                                <p className={`mb-4 flex-1 transition-all duration-500 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                    {project.desc}
                                </p>
                                
                                <div className='mb-4 flex flex-wrap gap-2'>
                                    {project.technologies.map((tech, techIndex) => (
                                        <span 
                                            key={techIndex}
                                            className={`px-3 py-1 text-xs rounded-full transition-all duration-300 glass-tag ${
                                                isDarkMode 
                                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30' 
                                                    : 'bg-purple-100 text-purple-800 border border-purple-200'
                                            }`}
                                            style={{
                                                transform: hoveredProject === index ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
                                                transitionDelay: `${techIndex * 50}ms`
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className='flex space-x-4'>
                                    <a href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center transition-all duration-300 hover:scale-105 glass-link ${
                                            isDarkMode 
                                                ? 'text-gray-300 hover:text-purple-300' 
                                                : 'text-gray-600 hover:text-purple-600'
                                        }`}
                                        style={{
                                            textShadow: hoveredProject === index 
                                                ? '0 0 10px rgba(141, 93, 244, 0.5)' 
                                                : 'none'
                                        }}
                                    >
                                        <FiGithub className='mr-2'/> Code
                                    </a>
                                    <a href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center transition-all duration-300 hover:scale-105 glass-link ${
                                            isDarkMode 
                                                ? 'text-gray-300 hover:text-purple-300' 
                                                : 'text-gray-600 hover:text-purple-600'
                                        }`}
                                        style={{
                                            textShadow: hoveredProject === index 
                                                ? '0 0 10px rgba(141, 93, 244, 0.5)' 
                                                : 'none'
                                        }}
                                    >
                                        <FiExternalLink className='mr-2'/> Demo
                                    </a>
                                </div>
                            </div>

                            {/* Animated border glow */}
                            <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                                <div className={`absolute inset-0 rounded-3xl transition-all duration-700 ${
                                    hoveredProject === index ? 'opacity-100' : 'opacity-0'
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
                                hoveredProject === index ? 'opacity-100' : 'opacity-0'
                            }`} style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)'
                            }}></div>
                        </div>
                    ))}
                </div>

                {/* See More / Show Less button */}
                {hasMoreProjects && (
                    <div className='flex justify-center'>
                        <button 
                            onClick={() => setShowAll(!showAll)}
                            className={`px-8 py-4 rounded-full font-medium transition-all duration-500 backdrop-blur-md border group relative overflow-hidden ${
                                isDarkMode
                                    ? 'bg-gradient-to-r from-[#8D5DF4] to-[#FA3C70] text-white border-[#8D5DF4] shadow-lg shadow-[#8D5DF4]/30 hover:shadow-xl hover:shadow-[#8D5DF4]/40'
                                    : 'bg-gradient-to-r from-[#8D5DF4] to-[#FA3C70] text-white border-[#8D5DF4] shadow-lg shadow-[#8D5DF4]/30 hover:shadow-xl hover:shadow-[#8D5DF4]/40'
                            } hover:scale-105 hover:-translate-y-1`}
                            style={{
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)'
                            }}
                        >
                            <span className="relative z-10">
                                {showAll ? 'Show Less' : `See More Projects (${filteredProjects.length - 4} more)`}
                            </span>
                            
                            {/* Button animation overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FA3C70] to-[#8D5DF4] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Shine effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                            </div>
                        </button>
                    </div>
                )}
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
                
                .glass-tag {
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                
                .glass-link {
                    position: relative;
                    overflow: hidden;
                }
                
                .glass-link::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s ease-out;
                }
                
                .glass-link:hover::before {
                    left: 100%;
                }
            `}</style>
        </section>
    );
};

export default Projects;