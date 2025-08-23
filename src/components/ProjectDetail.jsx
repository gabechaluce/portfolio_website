// ProjectDetail.jsx
import React, { useState, useEffect } from 'react';
import { FiExternalLink, FiGithub, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTheme } from './ThemeContext';

const ProjectDetail = ({ project, onClose }) => {
    const { isDarkMode } = useTheme();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Prevent background scroll when modal is open
        document.body.style.overflow = 'hidden';
        
        // Animation for entrance
        setIsVisible(true);
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === project.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? project.images.length - 1 : prev - 1
        );
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleBackdropClick}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
            
            {/* Modal Content */}
            <div className={`relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
            } transition-all duration-500 transform ${isVisible ? 'scale-100' : 'scale-95'}`}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className={`absolute top-4 right-4 z-10 p-2 rounded-full ${
                        isDarkMode 
                            ? 'bg-gray-800 text-white hover:bg-gray-700' 
                            : 'bg-white text-gray-800 hover:bg-gray-100'
                    } transition-colors duration-200 shadow-md`}
                >
                    <FiX size={24} />
                </button>

                {/* Project Content */}
                <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                    {/* Image Gallery */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative h-80 lg:h-full bg-black flex items-center justify-center">
                            <img
                                src={project.images[currentImageIndex]}
                                alt={project.title}
                                className="w-full h-full object-contain"
                            />
                            
                            {/* Navigation Arrows */}
                            {project.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                    >
                                        <FiChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                    >
                                        <FiChevronRight size={24} />
                                    </button>
                                </>
                            )}
                            
                            {/* Image Indicator */}
                            {project.images.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {project.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-3 h-3 rounded-full transition-all ${
                                                currentImageIndex === index
                                                    ? 'bg-white scale-125'
                                                    : 'bg-white/50 hover:bg-white/70'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Project Details */}
                    <div className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
                        <h2 className={`text-3xl font-bold mb-4 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                            {project.title}
                        </h2>
                        
                        <p className={`text-lg mb-6 leading-relaxed ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            {project.desc}
                        </p>
                        
                        <div className="mb-8">
                            <h3 className={`text-xl font-semibold mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                            }`}>
                                Technologies Used
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                                            isDarkMode
                                                ? 'bg-purple-900/30 text-purple-300 border border-purple-700/50'
                                                : 'bg-purple-100 text-purple-700 border border-purple-200'
                                        }`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex space-x-4">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                                    isDarkMode
                                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}
                            >
                                <FiGithub className="mr-2" />
                                View Code
                            </a>
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                                    isDarkMode
                                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                                        : 'bg-purple-500 text-white hover:bg-purple-600'
                                }`}
                            >
                                <FiExternalLink className="mr-2" />
                                Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;