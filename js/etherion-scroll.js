/**
 * ETHERION SCROLL ANIMATION CONTROLLER
 * =====================================
 * Handles scroll-based animations for the Etherion car image
 * in the achievements timeline section.
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        scrollThreshold: 0.2,         // Start animation when 20% visible
        scrollOffset: 60,             // Offset from top (px)
        parallaxStrength: 0,          // Disabled for performance
        debounceDelay: 16,            // Scroll event debounce (60fps)
        enableParticles: false,       // Disabled for performance
        particleCount: 0,             // Disabled
        speedLinesCount: 0            // Disabled for performance
    };

    // State
    let isAnimating = false;
    let scrollTimeout = null;
    let etherionWrapper = null;
    let scrollProgress = 0;

    /**
     * Initialize the Etherion scroll animation system
     */
    function initEtherionScroll() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setup);
        } else {
            setup();
        }
    }

    /**
     * Setup the animation system
     */
    function setup() {
        etherionWrapper = document.querySelector('.etherion-image-wrapper');
        
        if (!etherionWrapper) {
            console.warn('Etherion wrapper not found. Skipping animation setup.');
            return;
        }

        // Setup scroll observer (particles and parallax disabled for performance)
        setupScrollObserver();

        console.log('✨ Etherion scroll animation initialized (optimized mode)');
    }

    /**
     * Create Intersection Observer for scroll-triggered animation
     */
    function setupScrollObserver() {
        const observerOptions = {
            root: null,
            rootMargin: `-${CONFIG.scrollOffset}px 0px`,
            threshold: CONFIG.scrollThreshold
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isAnimating) {
                    activateEtherion();
                    isAnimating = true;
                } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
                    // Reset when scrolled back up
                    deactivateEtherion();
                    isAnimating = false;
                }
            });
        }, observerOptions);

        observer.observe(etherionWrapper);
    }

    /**
     * Activate the Etherion animation
     */
    function activateEtherion() {
        etherionWrapper.classList.add('active');
        console.log('🚀 Etherion activated!');
    }

    /**
     * Deactivate the Etherion animation
     */
    function deactivateEtherion() {
        etherionWrapper.classList.remove('active');
    }

    /**
     * Setup parallax scroll effect
     */
    function setupParallaxScroll() {
        window.addEventListener('scroll', debounce(() => {
            if (!etherionWrapper.classList.contains('active')) return;

            const scrollPosition = window.pageYOffset;
            const etherionRect = etherionWrapper.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate scroll progress (0 to 1)
            const scrollProgress = Math.max(0, Math.min(1, 
                (windowHeight - etherionRect.top) / (windowHeight + etherionRect.height)
            ));

            // Calculate parallax offset with enhanced depth
            const parallaxY = (scrollProgress - 0.5) * 50 * CONFIG.parallaxStrength;
            const parallaxX = (scrollProgress - 0.5) * 30 * CONFIG.parallaxStrength;
            const parallaxRotate = (scrollProgress - 0.5) * 3;

            // Apply parallax transform with racing motion feel
            const image = etherionWrapper.querySelector('.etherion-scroll-image');
            if (image) {
                image.style.transform = `
                    translateZ(80px) 
                    translateY(${parallaxY}px) 
                    translateX(${parallaxX}px)
                    rotateY(${parallaxRotate}deg)
                `;
            }

            // Apply parallax to glow ring (opposite direction for depth)
            const glowRing = etherionWrapper.querySelector('.etherion-glow-ring');
            if (glowRing) {
                const ringTransform = `
                    translate(-50%, -50%) 
                    scale(1) 
                    rotateZ(${scrollProgress * 360}deg)
                    translateY(${-parallaxY * 0.3}px)
                `;
                glowRing.style.transform = ringTransform;
            }

            // Update scroll progress
            updateScrollProgress();

        }, CONFIG.debounceDelay));
    }

    /**
     * Create floating particles around Etherion
     */
    function createFloatingParticles() {
        const container = etherionWrapper.parentElement;
        
        for (let i = 0; i < CONFIG.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'etherion-particle';
            
            const size = Math.random() * 5 + 2;
            const hue = Math.random() > 0.5 ? 'rgba(255, 0, 110,' : 'rgba(255, 46, 156,';
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, ${hue} 0.9), transparent);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
                z-index: 5;
                box-shadow: 0 0 ${size * 2}px ${hue} 0.6);
                animation: particleFloat ${Math.random() * 4 + 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            container.appendChild(particle);
        }

        // Add particle float animation with horizontal drift
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translate(0, 0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.8;
                }
                50% {
                    transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * -120}px);
                    opacity: 1;
                }
                90% {
                    opacity: 0.4;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Animate particles on activation
     */
    function animateParticles() {
        const particles = document.querySelectorAll('.etherion-particle');
        particles.forEach((particle, index) => {
            setTimeout(() => {
                particle.style.opacity = '1';
                particle.style.animation = `particleFloat ${Math.random() * 3 + 2}s ease-in-out infinite`;
            }, index * 50);
        });
    }

    /**
     * Create ripple effect on activation
     */
    function createRippleEffect() {
        const ripple = document.createElement('div');
        ripple.className = 'etherion-ripple';
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            border: 3px solid rgba(255, 0, 110, 0.6);
            border-radius: 50%;
            z-index: 8;
            animation: rippleExpand 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        `;
        
        etherionWrapper.appendChild(ripple);

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rippleExpand {
                0% {
                    width: 100px;
                    height: 100px;
                    opacity: 1;
                }
                100% {
                    width: 600px;
                    height: 600px;
                    opacity: 0;
                    border-width: 1px;
                }
            }
        `;
        document.head.appendChild(style);

        // Remove after animation
        setTimeout(() => ripple.remove(), 1500);
    }

    /**
     * Create racing speed lines effect
     */
    function createSpeedLines() {
        const container = etherionWrapper.parentElement;
        
        for (let i = 0; i < CONFIG.speedLinesCount; i++) {
            const speedLine = document.createElement('div');
            const yPosition = 30 + (i * 15); // Stagger vertically
            const delay = i * 0.15; // Stagger timing
            
            speedLine.className = 'speed-line';
            speedLine.style.cssText = `
                position: absolute;
                top: ${yPosition}%;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(
                    to right,
                    transparent 0%,
                    rgba(255, 0, 110, ${0.3 + i * 0.1}) 30%,
                    rgba(255, 46, 156, ${0.5 + i * 0.1}) 50%,
                    rgba(255, 0, 110, ${0.3 + i * 0.1}) 70%,
                    transparent 100%
                );
                transform: scaleX(0) translateX(-100%);
                transform-origin: left center;
                z-index: 3;
                opacity: 0;
                box-shadow: 0 0 15px rgba(255, 0, 110, 0.4);
                animation: speedLineRush ${1.2 + i * 0.2}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s forwards;
            `;
            
            container.appendChild(speedLine);
            
            // Remove after animation
            setTimeout(() => speedLine.remove(), 2000 + (delay * 1000));
        }

        // Add speed line animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes speedLineRush {
                0% {
                    transform: scaleX(0) translateX(-100%);
                    opacity: 0;
                }
                20% {
                    opacity: 1;
                }
                50% {
                    transform: scaleX(1.5) translateX(0%);
                    opacity: 0.8;
                }
                100% {
                    transform: scaleX(2) translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Create scroll progress indicator
     */
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'etherion-scroll-progress';
        etherionWrapper.parentElement.appendChild(progressBar);
    }

    /**
     * Update scroll progress bar
     */
    function updateScrollProgress() {
        const progressBar = document.querySelector('.etherion-scroll-progress');
        if (!progressBar) return;

        const container = document.querySelector('.etherion-scroll-container');
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate progress (0 to 100)
        let progress = 0;
        if (rect.top < windowHeight && rect.bottom > 0) {
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            progress = (visibleHeight / rect.height) * 100;
        }

        progressBar.style.height = `${Math.min(progress, 100)}%`;
    }

    /**
     * Play activation sound (optional - requires audio file)
     */
    function playActivationSound() {
        // Check if audio file exists
        const audio = new Audio('media/activation-sound.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {
            // Silently fail if audio not available
        });
    }

    /**
     * Debounce utility function
     */
    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(scrollTimeout);
                func(...args);
            };
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(later, wait);
        };
    }

    /**
     * Add click interaction to Etherion image
     */
    function setupImageInteraction() {
        const image = etherionWrapper?.querySelector('.etherion-scroll-image');
        if (!image) return;

        image.addEventListener('click', () => {
            // Create burst effect
            createBurstEffect();
            
            // Add temporary scale effect
            image.style.transform = 'translateZ(80px) scale(1.1)';
            setTimeout(() => {
                image.style.transform = '';
            }, 300);
        });
    }

    /**
     * Create burst effect on click
     */
    function createBurstEffect() {
        for (let i = 0; i < 12; i++) {
            const burst = document.createElement('div');
            const angle = (i / 12) * Math.PI * 2;
            const distance = 150;
            
            burst.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 4px;
                height: 4px;
                background: var(--primary-pink);
                border-radius: 50%;
                z-index: 20;
                animation: burstOut 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                --angle: ${angle}rad;
                --distance: ${distance}px;
            `;
            
            etherionWrapper.appendChild(burst);
            setTimeout(() => burst.remove(), 800);
        }

        // Add burst animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes burstOut {
                0% {
                    transform: translate(-50%, -50%) translate(0, 0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) 
                               translate(calc(cos(var(--angle)) * var(--distance)), 
                                       calc(sin(var(--angle)) * var(--distance)));
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Cleanup and destroy
     */
    function destroy() {
        window.removeEventListener('scroll', setupParallaxScroll);
        const particles = document.querySelectorAll('.etherion-particle');
        particles.forEach(p => p.remove());
    }

    // Initialize when script loads
    initEtherionScroll();

    // Add interaction after setup
    setTimeout(setupImageInteraction, 1000);

    // Export for potential external control
    window.EtherionScroll = {
        activate: activateEtherion,
        deactivate: deactivateEtherion,
        destroy: destroy
    };

})();
