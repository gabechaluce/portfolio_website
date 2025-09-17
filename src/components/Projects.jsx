<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react';
import { useTheme } from './ThemeContext';

// Import images
import rga1 from '../assets/rga1.png';
import rga2 from '../assets/rga2.png';
import rga3 from '../assets/rga3.png';
import rga4 from '../assets/rga4.png';
import rgaims from '../assets/rgaims.png';
import rgaims1 from '../assets/rgaims1.png';
import rgaims2 from '../assets/rgaims2.png';
import rgaims3 from '../assets/rgaims3.png';
import kpi from '../assets/kpi.png';
import kpi1 from '../assets/kpi2.png'; // Changed from kpi2 to match variable usage
import kpi2 from '../assets/kpi3.png'; // Changed from kpi3 to match variable usage
import kpi3 from '../assets/kpi4.png'; // Changed from kpi4 to match variable usage
import kpi4 from '../assets/kpi4.png'; // Added missing import
import yubu2 from '../assets/yubu2.png';
import yubu3 from '../assets/yubu3.png';
import yubu4 from '../assets/yubu4.png';
import yubulog from '../assets/yubulog.png'; // Fixed import path
import lending from '../assets/lending.png';
import lending1 from '../assets/lending1.png';
import lending2 from '../assets/lending2.png';
import lending3 from '../assets/lending3.png';
import herba from '../assets/herba.jpg';
import herba1 from '../assets/herba1.jpg';
import herba2 from '../assets/herba2.jpg';
import herba3 from '../assets/herba3.jpg';
import s2c from '../assets/s2c1.png'; // Fixed import path
import cookit from '../assets/cookit.png'; // Fixed import path
import cookit1 from '../assets/cookit1.png'; // Fixed import path
import cookit2 from '../assets/cookit2.png'; // Fixed import path

// Updated project data with actual projects
const projects = [
    {
        id: 1, 
        title: 'RGA Project Workflow',
        desc: 'A comprehensive project workflow management system designed to streamline project planning, task assignment, and progress tracking with real-time collaboration features.',
        technologies: ['PHP', 'JQuery', 'MySQL', 'JavaScript'],
        github: 'https://github.com/gabechaluce/rga-workflow',
        demo: 'https://your-rga-demo.com',
        image: rga1,
        images: [rga1, rga2, rga3, rga4],
        category: 'fullstack'
    },
    {
        id: 2, 
        title: 'RGA Inventory & Sales Management',
        desc: 'Advanced inventory and sales management system with real-time stock tracking, automated reorder points, sales analytics, and comprehensive reporting dashboard.',
        technologies: ['JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
        github: 'https://github.com/yourusername/rga-inventory',
        demo: 'https://your-rgaims-demo.com',
        image: rgaims,
        images: [rgaims, rgaims1, rgaims2, rgaims3],
        category: 'fullstack'
    },
    {
        id: 3, 
        title: 'KPI Analytics System',
        desc: 'Interactive Key Performance Indicator dashboard providing real-time business metrics visualization, data analytics, and performance tracking for strategic decision making.',
        technologies: ['PHP', 'JQuery', 'MySQL', 'JavaScript', 'Chart.js','Bootstrap'],
        github: 'https://github.com/yourusername/kpi-dashboard',
        demo: 'https://your-kpi-demo.com',
        image: kpi,
        images: [kpi, kpi1, kpi2, kpi3, kpi4],
        category: 'fullstack'
    },
    {
        id: 4, 
        title: 'Yubu Inventory & Sales',
        desc: 'Modern inventory and sales management platform with intuitive user interface, multi-location support, barcode scanning, and comprehensive sales reporting.',
        technologies: ['PHP', 'JQuery', 'MySQL', 'JavaScript'],
        github: 'https://github.com/yourusername/yubu-inventory',
        demo: 'https://your-yubu-demo.com',
        image: yubulog,
        images: [yubulog, yubu2, yubu3, yubu4],
        category: 'fullstack'
    },
    {
        id: 5, 
        title: 'Lending Management System',
        desc: 'Comprehensive lending management platform with loan application processing, credit assessment, payment tracking, and automated notification system.',
        technologies: ['PHP', 'JQuery', 'MySQL', 'JavaScript'],
        github: 'https://github.com/yourusername/lending-system',
        demo: 'https://your-lending-demo.com',
        image: lending,
        images: [lending, lending1, lending2, lending3],
        category: 'fullstack'
    },
    {
        id: 6, 
        title: 'HerbaScan - Medicinal Plant Recognition (Thesis)',
        desc: 'AI-powered mobile application for identifying DOH-approved medicinal plants recommended by botanists and naturopaths, using Deep Neural Network algorithms and image recognition. Features include English-Tagalog translation, text-to-speech functionality, video tutorials, and a comprehensive plant database.',
        technologies: ['Kotlin', 'TensorFlow', 'Android Studio', 'Firebase'],
        github: 'https://github.com/gabechaluce/medplant.git',
        demo: 'https://your-herba-demo.com',
        image: herba,
        images: [herba, herba1, herba2, herba3],
        category: 'mobile'
    },
    {
        id: 7,
        title: 'Stop2Cha Ordering System',
        desc: 'A modern ordering system for Stop2Cha, enabling customers to browse the menu, place orders, and track order status in real time. Features include product management, sales analytics, and a user-friendly interface for both staff and customers.',
        technologies: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
        github: null, // Set to your GitHub repo if available
        demo: null,   // Set to your live demo if available
        image: s2c,
        images: [s2c],
        category: 'fullstack'
    },
    {
        id: 8,
        title: 'Cook IT',
        desc: 'A Twitter-inspired forum dedicated to sharing recipes, food tips, and culinary experiences. Cook IT serves as a digital open source cookbook where users can post, comment, and discover new dishes from a passionate food community.',
        technologies: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
        github: null, // Set to your GitHub repo if available
        demo: null,   // Set to your live demo if available
        image: cookit,
        images: [cookit, cookit1, cookit2],
        category: 'fullstack'
    }
];

const Projects = () => {
    const { isDarkMode } = useTheme();
    const [hoveredProject, setHoveredProject] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [previewImage, setPreviewImage] = useState(null);
    const [previewIndex, setPreviewIndex] = useState(0);
    // Add refs and state for fade-up animation
    const cardRefs = useRef([]);
    const [cardsInView, setCardsInView] = useState([]);

    const displayedProjects = showAll ? projects : projects.slice(0, 3);
    const hasMoreProjects = projects.length > 3;

    useEffect(() => {
        const handleScroll = () => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const rect = projectsSection.getBoundingClientRect();
                const isInViewport = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
                setIsVisible(isInViewport);
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Fade up on every scroll for each card
    useEffect(() => {
        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const idx = Number(entry.target.getAttribute('data-index'));
                    setCardsInView(prev => {
                        const updated = [...prev];
                        updated[idx] = entry.isIntersecting;
                        return updated;
                    });
                });
            },
            { threshold: 0.3 }
        );
        cardRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });
        return () => {
            cardRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [displayedProjects.length]);

    // Always run slideshow for all cards, not just hovered
    useEffect(() => {
        const intervals = {};
        displayedProjects.forEach((project, idx) => {
            if (project.images && project.images.length > 1) {
                intervals[idx] = setInterval(() => {
                    setCurrentImageIndex(prev => ({
                        ...prev,
                        [idx]: ((prev[idx] || 0) + 1) % project.images.length
                    }));
                }, 2000);
            }
        });
        return () => {
            Object.values(intervals).forEach(clearInterval);
        };
    }, [displayedProjects]);

    const getCurrentImage = (project, index) => {
        if (project.images && project.images.length > 1) {
            return project.images[currentImageIndex[index] || 0];
        }
        return project.image;
    };

    const openPreview = (project, imageIndex = 0) => {
        setPreviewImage(project);
        setPreviewIndex(imageIndex);
    };

    const closePreview = () => {
        setPreviewImage(null);
        setPreviewIndex(0);
    };

    const nextImage = () => {
        if (previewImage && previewImage.images) {
            setPreviewIndex((prev) => (prev + 1) % previewImage.images.length);
        }
    };

    const prevImage = () => {
        if (previewImage && previewImage.images) {
            setPreviewIndex((prev) => (prev - 1 + previewImage.images.length) % previewImage.images.length);
        }
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!previewImage) return;
            
            if (e.key === 'Escape') closePreview();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [previewImage]);

    return (
        <section id='projects' className='w-full py-20 px-4 sm:px-8 bg-transparent'>
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(40px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .fade-up {
                    opacity: 0;
                    transform: translateY(40px);
                    animation: fadeUp 0.9s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                }
            `}</style>
            <div className='max-w-7xl mx-auto'>
                <div className={`text-center mb-16 relative group transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
          
                    <p className={`text-lg max-w-2xl mx-auto mt-4 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        A showcase of my development journey and technical expertise
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12'>
                    {displayedProjects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={el => cardRefs.current[index] = el}
                            data-index={index}
                            className={`relative group rounded-3xl overflow-hidden transition-all duration-700 h-full flex flex-col 
                                ${isDarkMode 
                                    ? 'bg-black/10 border border-white/10 shadow-lg' 
                                    : 'bg-white border border-gray-200 shadow-md'
                                } 
                                hover:scale-105 hover:shadow-2xl`}
                            style={{
                                animation: cardsInView[index]
                                    ? `fadeUp 0.9s cubic-bezier(0.23, 1, 0.32, 1) forwards`
                                    : 'none',
                                opacity: cardsInView[index] ? 1 : 0,
                                transform: cardsInView[index] ? 'translateY(0)' : 'translateY(40px)',
                                animationDelay: cardsInView[index] ? `${0.1 + index * 0.1}s` : '0s'
                            }}
                        >
                            {/* Project Image */}
                            <div 
                                className={`relative h-80 flex items-center justify-center cursor-pointer 
                                    ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}
                                onMouseEnter={() => setHoveredProject(index)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <img
                                    src={getCurrentImage(project, index)}
                                    alt={project.title}
                                    className="w-full h-full object-contain transition-all duration-700 hover:scale-105"
                                    style={{
                                        background: isDarkMode ? '#111' : '#f3f4f6',
                                        maxHeight: '100%',
                                        maxWidth: '100%',
                                        margin: '0 auto',
                                        display: 'block'
                                    }}
                                    draggable={false}
                                />
                                
                                {/* Overlay for description on hover */}
                                <div className={`absolute inset-0 flex flex-col justify-center items-center text-center px-8 transition-all duration-500 pointer-events-none
                                    ${hoveredProject === index ? 'opacity-100' : 'opacity-0'}
                                    ${isDarkMode 
                                        ? 'bg-gradient-to-b from-black/80 via-black/60 to-black/40'
                                        : 'bg-gradient-to-b from-white/90 via-white/80 to-white/60'
                                    }`}>
                                    <h3 className={`text-2xl font-bold mb-4 drop-shadow ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                                    <p className={`text-base mb-6 leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{project.desc}</p>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className={`px-4 py-2 text-sm rounded-full font-medium 
                                                    ${isDarkMode 
                                                        ? 'bg-white/10 text-white border border-white/20' 
                                                        : 'bg-gray-100 text-gray-800 border border-gray-300'
                                                    }`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Image indicator dots */}
                                {project.images && project.images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                                        {project.images.map((_, imgIndex) => (
                                            <div
                                                key={imgIndex}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                    (currentImageIndex[index] || 0) === imgIndex
                                                        ? (isDarkMode ? 'bg-white scale-125' : 'bg-gray-800 scale-125')
                                                        : (isDarkMode ? 'bg-white/50' : 'bg-gray-400/50')
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Project Links */}
                            <div className={`flex justify-between items-center px-8 py-6 relative z-30 
                                ${isDarkMode 
                                    ? 'bg-black/30 backdrop-blur-sm' 
                                    : 'bg-gray-50 border-t border-gray-200'
                                }`}>
                                <div className={`font-semibold text-lg truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</div>
                                <div className="flex space-x-4">
                                    {project.github && (
                                        <a 
                                            href={project.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className={`transition-all duration-300 transform hover:scale-110 p-2 rounded-full 
                                                ${isDarkMode 
                                                    ? 'text-white hover:text-purple-400 hover:bg-white/10' 
                                                    : 'text-gray-800 hover:text-purple-600 hover:bg-gray-200'
                                                }`}
                                            title="View GitHub Repository"
                                        >
                                            <Github size={24} />
                                        </a>
                                    )}
                                    <a 
                                        href={project.demo} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={`transition-all duration-300 transform hover:scale-110 p-2 rounded-full 
                                            ${isDarkMode 
                                                ? 'text-white hover:text-purple-400 hover:bg-white/10' 
                                                : 'text-gray-800 hover:text-purple-600 hover:bg-gray-200'
                                            }`}
                                        title="View Live Demo"
                                    >
                                        <ExternalLink size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More / Show Less button */}
                {hasMoreProjects && (
                    <div className='flex justify-end'>
                        <button
                            onClick={() => {
                                setShowAll(!showAll);
                                if (showAll) {
                                    // Scroll to the top of the projects section when "Show Less" is clicked
                                    const section = document.getElementById('projects');
                                    if (section) {
                                        // Find the "A showcase..." element and scroll to it smoothly
                                        const showcase = section.querySelector('p');
                                        if (showcase) {
                                            showcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        } else {
                                            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                    }
                                }
                            }}
                            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 border border-gray-300 text-base ${
                                isDarkMode
                                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                                    : 'bg-white text-gray-800 hover:bg-gray-100'
                            }`}
                            style={{
                                boxShadow: isDarkMode
                                    ? '0 2px 8px rgba(141,93,244,0.08)'
                                    : '0 2px 8px rgba(0,0,0,0.04)'
                            }}
                        >
                            {showAll ? 'Show Less' : `See More Projects (${projects.length - 3} more)`}
                        </button>
                    </div>
                )}
            </div>

            {/* Image Preview Modal (disabled on mobile) */}
            {previewImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                    onClick={closePreview}
                    style={{ display: window.innerWidth < 640 ? 'none' : 'flex' }} // Hide on mobile (sm breakpoint)
                >
                    <div className="relative max-w-4xl max-h-full p-4">
                        <img
                            src={previewImage.images ? previewImage.images[previewIndex] : previewImage.image}
                            alt={previewImage.title}
                            className="max-w-full max-h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                        {/* Navigation arrows */}
                        {previewImage.images && previewImage.images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                                >
                                    ←
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                                >
                                    →
                                </button>
                            </>
                        )}
                        {/* Close button */}
                        <button
                            onClick={closePreview}
                            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

=======
import React, { useState, useEffect, useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react';
import { useTheme } from './ThemeContext';

// Import images
import rga1 from '../assets/rga1.png';
import rga2 from '../assets/rga2.png';
import rga3 from '../assets/rga3.png';
import rga4 from '../assets/rga4.png';
import rgaims from '../assets/rgaims.png';
import rgaims1 from '../assets/rgaims1.png';
import rgaims2 from '../assets/rgaims2.png';
import rgaims3 from '../assets/rgaims3.png';
import kpi from '../assets/kpi.png';
import kpi1 from '../assets/kpi2.png'; // Changed from kpi2 to match variable usage
import kpi2 from '../assets/kpi3.png'; // Changed from kpi3 to match variable usage
import kpi3 from '../assets/kpi4.png'; // Changed from kpi4 to match variable usage
import kpi4 from '../assets/kpi4.png'; // Added missing import
import yubu2 from '../assets/yubu2.png';
import yubu3 from '../assets/yubu3.png';
import yubu4 from '../assets/yubu4.png';
import yubulog from '../assets/yubulog.png'; // Fixed import path
import lending from '../assets/lending.png';
import lending1 from '../assets/lending1.png';
import lending2 from '../assets/lending2.png';
import lending3 from '../assets/lending3.png';
import herba from '../assets/herba.jpg';
import herba1 from '../assets/herba1.jpg';
import herba2 from '../assets/herba2.jpg';
import herba3 from '../assets/herba3.jpg';
import s2c from '../assets/s2c1.png'; // Fixed import path
import cookit from '../assets/cookit.png'; // Fixed import path
import cookit1 from '../assets/cookit1.png'; // Fixed import path
import cookit2 from '../assets/cookit2.png'; // Fixed import path

// Updated project data with actual projects
const projects = [
    {
        id: 1, 
        title: 'RGA Project Workflow',
        desc: 'A comprehensive project workflow management system designed to streamline project planning, task assignment, and progress tracking with real-time collaboration features.',
        technologies: ['PHP', 'JQuery', 'MySQL', 'JavaScript'],
        github: 'https://github.com/gabechaluce/rgaklms',
        demo: 'https://your-rga-demo.com',
        image: rga1,
        images: [rga1, rga2, rga3, rga4],
        category: 'fullstack'
    },
    {
        id: 2, 
        title: 'RGA Inventory & Sales Management',
        desc: 'Advanced inventory and sales management system with real-time stock tracking, automated reorder points, sales analytics, and comprehensive reporting dashboard.',
        technologies: ['JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
        github: 'https://github.com/gabechaluce/rgaklms',
        demo: 'https://your-rgaims-demo.com',
        image: rgaims,
        images: [rgaims, rgaims1, rgaims2, rgaims3],
        category: 'fullstack'
    },
    {
        id: 3, 
        title: 'KPI Analytics System',
        desc: 'Interactive Key Performance Indicator dashboard providing real-time business metrics visualization, data analytics, and performance tracking for strategic decision making.',
        technologies: ['PHP', 'JQuery', 'MySQL', 'JavaScript', 'Chart.js','Bootstrap'],
        github: 'https://github.com/gabechaluce/rgaklms',
        demo: 'https://your-kpi-demo.com',
        image: kpi,
        images: [kpi, kpi1, kpi2, kpi3, kpi4],
        category: 'fullstack'
    },
    {
        id: 4, 
        title: 'Yubu Inventory & Sales',
        desc: 'Modern inventory and sales management platform with intuitive user interface, multi-location support, barcode scanning, and comprehensive sales reporting.',
        technologies: ['PHP', 'JQuery', 'MySQL', 'JavaScript'],
        github: 'https://github.com/gabechaluce/Inventory-Sales.git',
        demo: 'https://yubuhichicks.com',
        image: yubulog,
        images: [yubulog, yubu2, yubu3, yubu4],
        category: 'fullstack'
    },
    {
        id: 5, 
        title: 'Lending Management System',
        desc: 'Comprehensive lending management platform with loan application processing, credit assessment, payment tracking, and automated notification system.',
        technologies: ['PHP', 'JQuery', 'MySQL', 'JavaScript'],
        github: 'https://github.com/gabechaluce/Descon_lending.git',
        demo: 'https://yubuhichicks.com',
        image: lending,
        images: [lending, lending1, lending2, lending3],
        category: 'fullstack'
    },
    {
        id: 6, 
        title: 'HerbaScan - Medicinal Plant Recognition (Thesis)',
        desc: 'AI-powered mobile application for identifying DOH-approved medicinal plants recommended by botanists and naturopaths, using Deep Neural Network algorithms and image recognition. Features include English-Tagalog translation, text-to-speech functionality, video tutorials, and a comprehensive plant database.',
        technologies: ['Kotlin', 'TensorFlow', 'Android Studio', 'Firebase'],
        github: 'https://github.com/gabechaluce/medplant.git',
       
        image: herba,
        images: [herba, herba1, herba2, herba3],
        category: 'mobile'
    },
    {
        id: 7,
        title: 'Stop2Cha Ordering System',
        desc: 'A modern ordering system for Stop2Cha, enabling customers to browse the menu, place orders, and track order status in real time. Features include product management, sales analytics, and a user-friendly interface for both staff and customers.',
        technologies: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
        image: s2c,
        images: [s2c],
        category: 'fullstack'
    },
    {
        id: 8,
        title: 'Cook IT',
        desc: 'A Twitter-inspired forum dedicated to sharing recipes, food tips, and culinary experiences. Cook IT serves as a digital open source cookbook where users can post, comment, and discover new dishes from a passionate food community.',
        technologies: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
        github: 'https://github.com/gabechaluce/COOK-IT-2.git',
        image: cookit,
        images: [cookit, cookit1, cookit2],
        category: 'fullstack'
    }
];

const Projects = () => {
    const { isDarkMode } = useTheme();
    const [hoveredProject, setHoveredProject] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [previewImage, setPreviewImage] = useState(null);
    const [previewIndex, setPreviewIndex] = useState(0);
    // Add refs and state for fade-up animation
    const cardRefs = useRef([]);
    const [cardsInView, setCardsInView] = useState([]);

    const displayedProjects = showAll ? projects : projects.slice(0, 3);
    const hasMoreProjects = projects.length > 3;

    useEffect(() => {
        const handleScroll = () => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const rect = projectsSection.getBoundingClientRect();
                const isInViewport = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
                setIsVisible(isInViewport);
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Fade up on every scroll for each card
    useEffect(() => {
        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const idx = Number(entry.target.getAttribute('data-index'));
                    setCardsInView(prev => {
                        const updated = [...prev];
                        updated[idx] = entry.isIntersecting;
                        return updated;
                    });
                });
            },
            { threshold: 0.3 }
        );
        cardRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });
        return () => {
            cardRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [displayedProjects.length]);

    // Always run slideshow for all cards, not just hovered
    useEffect(() => {
        const intervals = {};
        displayedProjects.forEach((project, idx) => {
            if (project.images && project.images.length > 1) {
                intervals[idx] = setInterval(() => {
                    setCurrentImageIndex(prev => ({
                        ...prev,
                        [idx]: ((prev[idx] || 0) + 1) % project.images.length
                    }));
                }, 2000);
            }
        });
        return () => {
            Object.values(intervals).forEach(clearInterval);
        };
    }, [displayedProjects]);

    const getCurrentImage = (project, index) => {
        if (project.images && project.images.length > 1) {
            return project.images[currentImageIndex[index] || 0];
        }
        return project.image;
    };

    const openPreview = (project, imageIndex = 0) => {
        setPreviewImage(project);
        setPreviewIndex(imageIndex);
    };

    const closePreview = () => {
        setPreviewImage(null);
        setPreviewIndex(0);
    };

    const nextImage = () => {
        if (previewImage && previewImage.images) {
            setPreviewIndex((prev) => (prev + 1) % previewImage.images.length);
        }
    };

    const prevImage = () => {
        if (previewImage && previewImage.images) {
            setPreviewIndex((prev) => (prev - 1 + previewImage.images.length) % previewImage.images.length);
        }
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!previewImage) return;
            
            if (e.key === 'Escape') closePreview();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [previewImage]);

    return (
        <section id='projects' className='w-full py-20 px-4 sm:px-8 bg-transparent'>
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(40px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .fade-up {
                    opacity: 0;
                    transform: translateY(40px);
                    animation: fadeUp 0.9s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                }
            `}</style>
            <div className='max-w-7xl mx-auto'>
                <div className={`text-center mb-16 relative group transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
          
                    <p className={`text-lg max-w-2xl mx-auto mt-4 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        A showcase of my development journey and technical expertise
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12'>
                    {displayedProjects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={el => cardRefs.current[index] = el}
                            data-index={index}
                            className={`relative group rounded-3xl overflow-hidden transition-all duration-700 h-full flex flex-col 
                                ${isDarkMode 
                                    ? 'bg-black/10 border border-white/10 shadow-lg' 
                                    : 'bg-white border border-gray-200 shadow-md'
                                } 
                                hover:scale-105 hover:shadow-2xl`}
                            style={{
                                animation: cardsInView[index]
                                    ? `fadeUp 0.9s cubic-bezier(0.23, 1, 0.32, 1) forwards`
                                    : 'none',
                                opacity: cardsInView[index] ? 1 : 0,
                                transform: cardsInView[index] ? 'translateY(0)' : 'translateY(40px)',
                                animationDelay: cardsInView[index] ? `${0.1 + index * 0.1}s` : '0s'
                            }}
                        >
                            {/* Project Image */}
                            <div 
                                className={`relative h-80 flex items-center justify-center cursor-pointer 
                                    ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}
                                onMouseEnter={() => setHoveredProject(index)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <img
                                    src={getCurrentImage(project, index)}
                                    alt={project.title}
                                    className="w-full h-full object-contain transition-all duration-700 hover:scale-105"
                                    style={{
                                        background: isDarkMode ? '#111' : '#f3f4f6',
                                        maxHeight: '100%',
                                        maxWidth: '100%',
                                        margin: '0 auto',
                                        display: 'block'
                                    }}
                                    draggable={false}
                                />
                                
                                {/* Overlay for description on hover */}
                                <div className={`absolute inset-0 flex flex-col justify-center items-center text-center px-8 transition-all duration-500 pointer-events-none
                                    ${hoveredProject === index ? 'opacity-100' : 'opacity-0'}
                                    ${isDarkMode 
                                        ? 'bg-gradient-to-b from-black/80 via-black/60 to-black/40'
                                        : 'bg-gradient-to-b from-white/90 via-white/80 to-white/60'
                                    }`}>
                                    <h3 className={`text-2xl font-bold mb-4 drop-shadow ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                                    <p className={`text-base mb-6 leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{project.desc}</p>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className={`px-4 py-2 text-sm rounded-full font-medium 
                                                    ${isDarkMode 
                                                        ? 'bg-white/10 text-white border border-white/20' 
                                                        : 'bg-gray-100 text-gray-800 border border-gray-300'
                                                    }`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Image indicator dots */}
                                {project.images && project.images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                                        {project.images.map((_, imgIndex) => (
                                            <div
                                                key={imgIndex}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                    (currentImageIndex[index] || 0) === imgIndex
                                                        ? (isDarkMode ? 'bg-white scale-125' : 'bg-gray-800 scale-125')
                                                        : (isDarkMode ? 'bg-white/50' : 'bg-gray-400/50')
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Project Links */}
                            <div className={`flex justify-between items-center px-8 py-6 relative z-30 
                                ${isDarkMode 
                                    ? 'bg-black/30 backdrop-blur-sm' 
                                    : 'bg-gray-50 border-t border-gray-200'
                                }`}>
                                <div className={`font-semibold text-lg truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</div>
                                <div className="flex space-x-4">
                                    {project.github && (
                                        <a 
                                            href={project.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className={`transition-all duration-300 transform hover:scale-110 p-2 rounded-full 
                                                ${isDarkMode 
                                                    ? 'text-white hover:text-purple-400 hover:bg-white/10' 
                                                    : 'text-gray-800 hover:text-purple-600 hover:bg-gray-200'
                                                }`}
                                            title="View GitHub Repository"
                                        >
                                            <Github size={24} />
                                        </a>
                                    )}
                                    <a 
                                        href={project.demo} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={`transition-all duration-300 transform hover:scale-110 p-2 rounded-full 
                                            ${isDarkMode 
                                                ? 'text-white hover:text-purple-400 hover:bg-white/10' 
                                                : 'text-gray-800 hover:text-purple-600 hover:bg-gray-200'
                                            }`}
                                        title="View Live Demo"
                                    >
                                        <ExternalLink size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More / Show Less button */}
                {hasMoreProjects && (
                    <div className='flex justify-end'>
                        <button
                            onClick={() => {
                                setShowAll(!showAll);
                                if (showAll) {
                                    // Scroll to the top of the projects section when "Show Less" is clicked
                                    const section = document.getElementById('projects');
                                    if (section) {
                                        // Find the "A showcase..." element and scroll to it smoothly
                                        const showcase = section.querySelector('p');
                                        if (showcase) {
                                            showcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        } else {
                                            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                    }
                                }
                            }}
                            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 border border-gray-300 text-base ${
                                isDarkMode
                                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                                    : 'bg-white text-gray-800 hover:bg-gray-100'
                            }`}
                            style={{
                                boxShadow: isDarkMode
                                    ? '0 2px 8px rgba(141,93,244,0.08)'
                                    : '0 2px 8px rgba(0,0,0,0.04)'
                            }}
                        >
                            {showAll ? 'Show Less' : `See More Projects (${projects.length - 3} more)`}
                        </button>
                    </div>
                )}
            </div>

            {/* Image Preview Modal (disabled on mobile) */}
            {previewImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                    onClick={closePreview}
                    style={{ display: window.innerWidth < 640 ? 'none' : 'flex' }} // Hide on mobile (sm breakpoint)
                >
                    <div className="relative max-w-4xl max-h-full p-4">
                        <img
                            src={previewImage.images ? previewImage.images[previewIndex] : previewImage.image}
                            alt={previewImage.title}
                            className="max-w-full max-h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                        {/* Navigation arrows */}
                        {previewImage.images && previewImage.images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                                >
                                    ←
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                                >
                                    →
                                </button>
                            </>
                        )}
                        {/* Close button */}
                        <button
                            onClick={closePreview}
                            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

>>>>>>> a1a5d5304bab8d60b017e52261934ef3241c454d
export default Projects;