import { useCallback, useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function Particle({ isDarkMode, onIntroComplete }) {
  const [init, setInit] = useState(false);
  const [introPhase, setIntroPhase] = useState('loading'); // 'loading', 'countdown', 'explosion', 'complete'
  const glowContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const glowElementsRef = useRef(new Map());
  const particlesContainerRef = useRef(null);
  const maxGlowElements = 30;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
      // Start countdown immediately after particles are loaded
      setIntroPhase('countdown');
      // Trigger explosion after 3 seconds
      setTimeout(() => {
        triggerBigBang();
      }, 3000);
    });
  }, []);

  // Big Bang explosion effect
  const triggerBigBang = useCallback(() => {
    setIntroPhase('explosion');
    
    // Create multiple big bang visual effects for more drama
    const createExplosionRing = (delay, scale, color, duration, intensity = 1) => {
      setTimeout(() => {
        const bigBangElement = document.createElement('div');
        bigBangElement.className = 'big-bang-explosion';
        bigBangElement.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: radial-gradient(circle, 
            ${color} 0%, 
            ${color}cc 15%, 
            ${color}99 30%, 
            ${color}66 50%, 
            ${color}33 70%, 
            ${color}11 85%, 
            transparent 100%);
          transform: translate(-50%, -50%) scale(0);
          z-index: 10000;
          pointer-events: none;
          animation: bigBangExplosion ${duration}s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          box-shadow: 
            0 0 ${40 * intensity}px ${color}ff,
            0 0 ${80 * intensity}px ${color}dd,
            0 0 ${140 * intensity}px ${color}99,
            0 0 ${220 * intensity}px ${color}66,
            0 0 ${320 * intensity}px ${color}33,
            inset 0 0 ${20 * intensity}px ${color}aa;
          filter: blur(0.3px) saturate(1.2);
          will-change: transform, opacity;
        `;

        bigBangElement.style.setProperty('--explosion-scale', scale);
        document.body.appendChild(bigBangElement);
        
        // Add particle burst effect
        const createParticleBurst = () => {
          for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const angle = (i / 12) * 360;
            const distance = 150 + Math.random() * 100;
            
            particle.style.cssText = `
              position: fixed;
              top: 50%;
              left: 50%;
              width: 4px;
              height: 4px;
              background: ${color};
              border-radius: 50%;
              transform: translate(-50%, -50%);
              z-index: 9999;
              pointer-events: none;
              animation: particleBurst ${duration * 0.8}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
              box-shadow: 0 0 10px ${color};
            `;
            
            particle.style.setProperty('--burst-angle', `${angle}deg`);
            particle.style.setProperty('--burst-distance', `${distance}px`);
            document.body.appendChild(particle);
            
            setTimeout(() => {
              if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
              }
            }, duration * 800);
          }
        };
        
        if (delay === 0) createParticleBurst(); // Only for first explosion
        
        setTimeout(() => {
          if (bigBangElement.parentNode) {
            bigBangElement.parentNode.removeChild(bigBangElement);
          }
        }, duration * 1000);
      }, delay);
    };

    // Create smoother explosion sequence with immediate hero transition
    createExplosionRing(0, '30', isDarkMode ? '#FFD700' : '#8A2BE2', 3.5, 1.5);
    createExplosionRing(200, '40', isDarkMode ? '#FF69B4' : '#FF69B4', 3.8, 1.2);
    createExplosionRing(400, '50', isDarkMode ? '#00FF00' : '#00BFFF', 4, 1);
    createExplosionRing(600, '60', isDarkMode ? '#FFFFFF' : '#9333EA', 4.2, 0.8);
    
    // Trigger hero reveal at peak of first explosion (much earlier)
    setTimeout(() => {
      setIntroPhase('complete');
      if (onIntroComplete) {
        onIntroComplete();
      }
    }, 1200); // Much faster - hero appears during explosion peak
  }, [isDarkMode, onIntroComplete]);

  const cleanupOldGlows = useCallback(() => {
    if (glowElementsRef.current.size > maxGlowElements) {
      const oldestKeys = Array.from(glowElementsRef.current.keys()).slice(0, 10);
      oldestKeys.forEach(key => {
        const element = glowElementsRef.current.get(key);
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
        glowElementsRef.current.delete(key);
      });
    }
  }, []);

  const createGlowEffect = useCallback((particle, glowColor, mouseX, mouseY) => {
    if (introPhase !== 'complete') return;
    
    const particleKey = `${particle.id || Math.random()}`;
    
    if (glowElementsRef.current.has(particleKey)) {
      const existingGlow = glowElementsRef.current.get(particleKey);
      if (existingGlow && existingGlow.parentNode) {
        existingGlow.parentNode.removeChild(existingGlow);
      }
    }

    const ioContainer = document.createElement('div');
    ioContainer.className = 'io-glow-container';
    ioContainer.style.cssText = `
      position: absolute;
      left: ${particle.position.x}px;
      top: ${particle.position.y}px;
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 1;
    `;

    const coreOrb = document.createElement('div');
    coreOrb.className = 'io-core-orb';
    coreOrb.style.cssText = `
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: radial-gradient(circle, ${glowColor} 0%, ${glowColor}90 20%, transparent 80%);
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px ${glowColor}, 0 0 20px ${glowColor}80;
      animation: ioCorePulse 1.5s ease-in-out infinite alternate;
    `;

    ioContainer.appendChild(coreOrb);
    glowElementsRef.current.set(particleKey, ioContainer);
    
    if (glowContainerRef.current) {
      glowContainerRef.current.appendChild(ioContainer);
    }

    setTimeout(() => {
      if (glowElementsRef.current.has(particleKey)) {
        const element = glowElementsRef.current.get(particleKey);
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
        glowElementsRef.current.delete(particleKey);
      }
    }, 3000);
  }, [introPhase]);

  const particlesLoaded = useCallback(async (container) => {
    particlesContainerRef.current = container;
    
    // Create styles
    const style = document.createElement('style');
    style.id = 'particle-styles';
    if (!document.getElementById('particle-styles')) {
      style.textContent = `
        #tsparticles canvas {
          filter: ${isDarkMode 
            ? 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))' 
            : 'drop-shadow(0 0 3px rgba(100, 100, 100, 0.2))'
          };
        }
        
        @keyframes bigBangExplosion {
          0% { 
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
            filter: blur(0px) brightness(1.5);
          }
          8% { 
            transform: translate(-50%, -50%) scale(calc(var(--explosion-scale, 30) * 0.1)) rotate(5deg);
            opacity: 1;
            filter: blur(0.2px) brightness(1.4);
          }
          20% { 
            transform: translate(-50%, -50%) scale(calc(var(--explosion-scale, 30) * 0.3)) rotate(15deg);
            opacity: 1;
            filter: blur(0.4px) brightness(1.3);
          }
          40% { 
            transform: translate(-50%, -50%) scale(calc(var(--explosion-scale, 30) * 0.6)) rotate(30deg);
            opacity: 0.95;
            filter: blur(0.6px) brightness(1.1);
          }
          60% { 
            transform: translate(-50%, -50%) scale(calc(var(--explosion-scale, 30) * 0.8)) rotate(45deg);
            opacity: 0.7;
            filter: blur(0.8px) brightness(0.9);
          }
          80% { 
            transform: translate(-50%, -50%) scale(calc(var(--explosion-scale, 30) * 0.95)) rotate(60deg);
            opacity: 0.4;
            filter: blur(1px) brightness(0.7);
          }
          100% { 
            transform: translate(-50%, -50%) scale(var(--explosion-scale, 30)) rotate(90deg);
            opacity: 0;
            filter: blur(1.5px) brightness(0.5);
          }
        }
        
        @keyframes particleBurst {
          0% { 
            transform: translate(-50%, -50%) scale(1.2) rotate(var(--burst-angle)) translateX(0);
            opacity: 1;
            filter: brightness(1.5);
          }
          25% { 
            transform: translate(-50%, -50%) scale(1) rotate(var(--burst-angle)) translateX(calc(var(--burst-distance) * 0.3));
            opacity: 0.9;
            filter: brightness(1.2);
          }
          60% { 
            transform: translate(-50%, -50%) scale(0.6) rotate(var(--burst-angle)) translateX(calc(var(--burst-distance) * 0.8));
            opacity: 0.5;
            filter: brightness(0.8);
          }
          100% { 
            transform: translate(-50%, -50%) scale(0.2) rotate(var(--burst-angle)) translateX(var(--burst-distance));
            opacity: 0;
            filter: brightness(0.4);
          }
        }
        
        @keyframes ioCorePulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }
        
        @keyframes countdownPulse {
          0% { 
            transform: scale(0.7) rotate(-5deg); 
            opacity: 0.7; 
            filter: blur(2px) brightness(0.8);
          }
          30% { 
            transform: scale(1.1) rotate(2deg); 
            opacity: 1; 
            filter: blur(0px) brightness(1.3);
          }
          60% { 
            transform: scale(1.05) rotate(-1deg); 
            opacity: 1; 
            filter: blur(0px) brightness(1.2);
          }
          100% { 
            transform: scale(1) rotate(0deg); 
            opacity: 0.95; 
            filter: blur(0px) brightness(1);
          }
        }
        
        @keyframes introParticleOrbit {
          0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
        }
        
        @keyframes introParticlePulse {
          0% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
          100% { opacity: 0.8; transform: scale(1); }
        }
      `;
      document.head.appendChild(style);
    }

    // Create glow container
    if (!glowContainerRef.current) {
      const glowContainer = document.createElement('div');
      glowContainer.id = 'particle-glow-container';
      glowContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      `;
      container.canvas.element.parentNode.appendChild(glowContainer);
      glowContainerRef.current = glowContainer;
    }

    const canvas = container.canvas.element;
    if (canvas && introPhase === 'complete') {
      let lastMouseMoveTime = 0;
      const throttleDelay = 16;

      canvas.addEventListener('mousemove', (event) => {
        const now = Date.now();
        if (now - lastMouseMoveTime < throttleDelay) return;
        lastMouseMoveTime = now;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const rect = canvas.getBoundingClientRect();
          const mouseX = event.clientX - rect.left;
          const mouseY = event.clientY - rect.top;
          
          const particles = container.particles.array;
          const glowColors = ['#FFD700', '#00FF00', '#8A2BE2', '#FF69B4', '#00BFFF'];
          
          cleanupOldGlows();
          
          particles
            .map(particle => ({
              particle,
              distance: Math.sqrt(
                Math.pow(particle.position.x - mouseX, 2) + 
                Math.pow(particle.position.y - mouseY, 2)
              )
            }))
            .filter(({distance}) => distance < 100)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 15)
            .forEach(({particle, distance}) => {
              particle.color.value = isDarkMode ? "#ffffff" : "#333333";
              
              if (Math.random() > 0.8) {
                const glowColor = glowColors[Math.floor(Math.random() * glowColors.length)];
                createGlowEffect(particle, glowColor, mouseX, mouseY);
              }
              
              particle.size.value = Math.min(particle.size.value * 1.2, 8);
              particle.opacity.value = Math.min(particle.opacity.value * 1.2, 1);
            });

          particles.forEach(particle => {
            const distance = Math.sqrt(
              Math.pow(particle.position.x - mouseX, 2) + 
              Math.pow(particle.position.y - mouseY, 2)
            );
            
            if (distance >= 100) {
              particle.color.value = isDarkMode ? "#ffffff" : "#666666";
              const originalSize = particle.options.size.value;
              particle.size.value = Array.isArray(originalSize) ? 
                Math.random() * (originalSize[1] - originalSize[0]) + originalSize[0] :
                typeof originalSize === 'object' ? 
                  Math.random() * (originalSize.max - originalSize.min) + originalSize.min :
                  originalSize;
              particle.opacity.value = isDarkMode ? 0.4 : 0.5;
            }
          });
        });
      });
    }
  }, [isDarkMode, createGlowEffect, cleanupOldGlows, introPhase]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      glowElementsRef.current.clear();
    };
  }, []);

  // Get particle configuration based on intro phase
  const getParticleConfig = () => {
    if (introPhase === 'countdown' || introPhase === 'explosion') {
      // Intro configuration - concentrated circular formation
      return {
        autoPlay: true,
        background: { color: { value: "transparent" } },
        clear: true,
        fullScreen: { enable: true, zIndex: 0 },
        detectRetina: true,
        fpsLimit: 60,
        interactivity: { detectsOn: "window", events: { resize: { enable: true } } },
        particles: {
          number: { value: 150 },
          color: { 
            value: [
              isDarkMode ? "#FFD700" : "#8A2BE2",
              isDarkMode ? "#FF69B4" : "#FF69B4", 
              isDarkMode ? "#00FF00" : "#00BFFF"
            ]
          },
          shape: { type: "circle" },
          size: { 
            value: { min: 1, max: 3 },
            animation: {
              enable: true,
              speed: 3,
              size_min: 0.5,
              sync: false
            }
          },
          opacity: { 
            value: 0.9,
            animation: {
              enable: true,
              speed: 2,
              opacity_min: 0.4,
              sync: false
            }
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: { default: "none" },
            path: {
              enable: true,
              options: {
                sides: 0,
                turnSteps: 30,
                angle: 45
              }
            }
          },
          links: { enable: false }
        },
        emitters: {
          position: { x: 50, y: 50 },
          rate: { quantity: 8, delay: 0.05 },
          size: { width: 0, height: 0 },
          particles: {
            move: {
              enable: true,
              speed: { min: 0.5, max: 1.5 },
              outModes: { default: "none" },
              path: {
                enable: true,
                options: {
                  sides: 0,
                  turnSteps: 50,
                  angle: 30
                }
              }
            }
          }
        }
      };
    } else if (introPhase === 'complete') {
      // Post-explosion configuration
      return {
        autoPlay: true,
        background: { color: { value: "transparent" } },
        clear: true,
        fullScreen: { enable: true, zIndex: 0 },
        detectRetina: true,
        fpsLimit: 60,
        interactivity: {
          detectsOn: "window",
          events: {
            onClick: { enable: true, mode: "push" },
            onHover: { 
              enable: true, 
              mode: ["bubble", "connect"],
              parallax: { enable: false }
            },
            resize: { enable: true, delay: 0.5 }
          },
          modes: {
            bubble: {
              distance: 100,
              duration: 0.4,
              opacity: 1,
              size: 10,
              color: { value: ["#FFD700", "#00FF00", "#8A2BE2", "#FF69B4", "#00BFFF"] }
            },
            connect: {
              distance: 80,
              links: { opacity: 0.3 },
              radius: 30
            },
            push: { quantity: 3 }
          }
        },
        particles: {
          number: { 
            value: 100,
            density: { enable: true, area: 800 }
          },
          color: { value: isDarkMode ? "#ffffff" : "#666666" },
          links: {
            enable: true,
            color: isDarkMode ? "#ffffff" : "#666666",
            distance: 100,
            opacity: isDarkMode ? 0.15 : 0.1,
            width: 1
          },
          move: {
            enable: true,
            speed: 1.8,
            direction: "none",
            outModes: { default: "bounce" },
            random: true
          },
          opacity: {
            value: isDarkMode ? 0.4 : 0.5,
            animation: {
              enable: true,
              speed: 0.4,
              opacity_min: 0.1,
              sync: false
            }
          },
          shape: { type: "circle" },
          size: { 
            value: { min: 2, max: 5 },
            animation: {
              enable: true,
              speed: 0.5,
              size_min: 1,
              sync: false
            }
          },
          shadow: {
            enable: true,
            color: isDarkMode ? "#ffffff" : "#666666",
            blur: 5,
            offset: { x: 0, y: 0 }
          }
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true
      };
    }
    return {};
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Particles */}
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          style={{ 
            zIndex: introPhase === 'complete' ? 0 : 1,
            filter: isDarkMode 
              ? 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))' 
              : 'drop-shadow(0 0 8px rgba(100, 100, 100, 0.3))'
          }}
          options={getParticleConfig()}
        />
      )}
    </div>
  );
}