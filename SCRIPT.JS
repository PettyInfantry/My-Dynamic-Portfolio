// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const header = document.querySelector('header');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const scrollToTop = document.querySelector('.scroll-to-top');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Initialize Particles.js for hero background
    initParticles();
    
    // Initialize animations
    initAnimations();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll events
    initScrollEvents();
    
    // Initialize project filtering
    initProjectFilter();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize skill bars animation
    animateSkillBars();

    // ===== Function Definitions =====
    
    // Initialize Particles.js
    function initParticles() {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#3b82f6'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#3b82f6',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Initialize animations with Intersection Observer
    function initAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        const slideElements = document.querySelectorAll('.slide-in');
        
        const appearOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            });
        }, appearOptions);
        
        fadeElements.forEach(element => {
            appearOnScroll.observe(element);
        });
        
        slideElements.forEach(element => {
            appearOnScroll.observe(element);
        });
    }
    
    // Initialize mobile menu functionality
    function initMobileMenu() {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when a nav item is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Initialize scroll events
    function initScrollEvents() {
        // Add scroll event listener
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            // Add shadow to header on scroll
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
                scrollToTop.classList.add('visible');
            } else {
                header.classList.remove('scrolled');
                scrollToTop.classList.remove('visible');
            }
            
            // Update active nav link based on scroll position
            updateActiveNavLink();
        });
        
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initialize project filtering
    function initProjectFilter() {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get filter value
                const filterValue = btn.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Initialize form validation
    function initFormValidation() {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const subject = document.getElementById('subject').value.trim();
                const message = document.getElementById('message').value.trim();
                
                // Reset error messages
                document.querySelectorAll('.form-error').forEach(error => {
                    error.textContent = '';
                });
                
                // Validate form
                let isValid = true;
                
                if (name === '') {
                    document.getElementById('name').nextElementSibling.textContent = 'Please enter your name';
                    isValid = false;
                }
                
                if (email === '') {
                    document.getElementById('email').nextElementSibling.textContent = 'Please enter your email';
                    isValid = false;
                } else if (!isValidEmail(email)) {
                    document.getElementById('email').nextElementSibling.textContent = 'Please enter a valid email';
                    isValid = false;
                }
                
                if (subject === '') {
                    document.getElementById('subject').nextElementSibling.textContent = 'Please enter a subject';
                    isValid = false;
                }
                
                if (message === '') {
                    document.getElementById('message').nextElementSibling.textContent = 'Please enter your message';
                    isValid = false;
                }
                
                // If form is valid, submit it (simulated)
                if (isValid) {
                    // In a real application, you would send the form data to a server
                    const submitBtn = contactForm.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending...';
                    
                    // Simulate form submission
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        
                        // Show success message
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.textContent = 'Your message has been sent successfully!';
                        successMessage.style.color = 'var(--success)';
                        successMessage.style.padding = '16px';
                        successMessage.style.marginTop = '16px';
                        successMessage.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                        successMessage.style.borderRadius = 'var(--border-radius)';
                        successMessage.style.textAlign = 'center';
                        
                        contactForm.appendChild(successMessage);
                        
                        // Remove success message after 5 seconds
                        setTimeout(() => {
                            successMessage.remove();
                        }, 5000);
                    }, 1500);
                }
            });
        }
    }
    
    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animate skill bars when they come into view
    function animateSkillBars() {
        const skillsSection = document.getElementById('skills');
        
        if (skillsSection) {
            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        skillBars.forEach(bar => {
                            const progress = bar.getAttribute('data-progress');
                            bar.style.width = `${progress}%`;
                        });
                        skillsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            skillsObserver.observe(skillsSection);
        }
    }
});

// Add music control functionality
document.addEventListener('DOMContentLoaded', () => {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = musicToggle.querySelector('i');
    let isPlaying = false;

    // Set initial volume
    bgMusic.volume = 0.3;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.className = 'fas fa-volume-mute';
        } else {
            bgMusic.play().catch(error => {
                console.log("Audio playback failed:", error);
            });
            musicIcon.className = 'fas fa-volume-up';
        }
        isPlaying = !isPlaying;
    });

    // Lazy load iframes when they come into view
    const videos = document.querySelectorAll('.video-container');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const iframe = container.querySelector('iframe');
                if (!iframe.src) {
                    iframe.src = iframe.dataset.src;
                }
                videoObserver.unobserve(container);
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => {
        videoObserver.observe(video);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = musicToggle.querySelector('i');
    let musicStarted = false;

    // Start music on first user interaction (anywhere or on the button)
    function startMusic() {
        if (!musicStarted) {
            music.play().catch(() => {});
            musicStarted = true;
            updateIcon();
        }
    }

    // Toggle music play/pause
    function toggleMusic(e) {
        e.stopPropagation(); // Prevents double-triggering startMusic
        if (!musicStarted) {
            startMusic();
        } else if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
        updateIcon();
    }

    // Update icon based on music state
    function updateIcon() {
        if (music.paused) {
            musicIcon.classList.remove('fa-volume-up');
            musicIcon.classList.add('fa-volume-mute');
        } else {
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-volume-up');
        }
    }

    // Start music on first click anywhere
    document.body.addEventListener('click', startMusic, { once: true });
    // Toggle music on button click
    musicToggle.addEventListener('click', toggleMusic);

    // Update icon if user pauses/plays music via other means
    music.addEventListener('play', updateIcon);
    music.addEventListener('pause', updateIcon);

    // Set initial icon
    updateIcon();
});