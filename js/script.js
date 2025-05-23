// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // Filter projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active', 'primary-bg', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('border', 'border-gray-300', 'hover:bg-gray-100'));
            
            // Add active class to clicked button
            button.classList.add('active', 'primary-bg', 'text-white');
            button.classList.remove('border', 'border-gray-300', 'hover:bg-gray-100');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Before-after slider
    const beforeAfterContainers = document.querySelectorAll('.before-after');
    
    beforeAfterContainers.forEach(container => {
        const slider = container.querySelector('.slider');
        const after = container.querySelector('.after');
        let isDragging = false;
        
        if (slider && after) {
            slider.addEventListener('mousedown', (e) => {
                isDragging = true;
                e.preventDefault();
            });
            
            window.addEventListener('mouseup', () => {
                isDragging = false;
            });
            
            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                
                const containerRect = container.getBoundingClientRect();
                let x = e.clientX - containerRect.left;
                
                // Limit x to container boundaries
                x = Math.max(0, Math.min(x, containerRect.width));
                
                const percent = (x / containerRect.width) * 100;
                
                after.style.width = `${100 - percent}%`;
                slider.style.left = `${percent}%`;
            });
            
            // Touch events for mobile
            slider.addEventListener('touchstart', (e) => {
                isDragging = true;
                e.preventDefault();
            });
            
            window.addEventListener('touchend', () => {
                isDragging = false;
            });
            
            window.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                
                const containerRect = container.getBoundingClientRect();
                let x = e.touches[0].clientX - containerRect.left;
                
                // Limit x to container boundaries
                x = Math.max(0, Math.min(x, containerRect.width));
                
                const percent = (x / containerRect.width) * 100;
                
                after.style.width = `${100 - percent}%`;
                slider.style.left = `${percent}%`;
            });
        }
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            alert('Merci pour votre message ! Nous vous contacterons bientôt.');
            contactForm.reset();
        });
    }

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('invisible');
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
                backToTopButton.classList.add('invisible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Loader animation
    const loader = document.getElementById('loader');
    const loadingBar = document.querySelector('.loading-bar');
    
    if (loader && loadingBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            loadingBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }
        }, 100);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation des éléments au scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const serviceCards = document.querySelectorAll('.service-card');
    const projectCards = document.querySelectorAll('.project-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments
    fadeElements.forEach(element => observer.observe(element));
    serviceCards.forEach(card => observer.observe(card));
    projectCards.forEach(card => observer.observe(card));
    testimonialCards.forEach(card => observer.observe(card));
});

// Animation observer
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all animated elements
document.querySelectorAll('.fade-in, .service-card, .project-card, .testimonial-card, .hero-content').forEach((el) => {
    animationObserver.observe(el);
});
