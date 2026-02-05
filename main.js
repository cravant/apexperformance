/* ========================================
   APEX PERFORMANCE - JAVASCRIPT
   Interactive Features & Animations
   ======================================== */

// === MOBILE NAVIGATION ===
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// === SMOOTH SCROLLING ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// === SCROLL ANIMATIONS (Simple AOS Alternative) ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// === NAVBAR SCROLL EFFECT ===
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// === GALLERY FILTERING ===
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    // Add animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// === GALLERY MODAL ===
const modal = document.getElementById('galleryModal');

// Build data for each gallery item
const buildData = [
    {
        title: '2015 Nissan GT-R',
        mods: 'Twin Turbo Upgrade, ECU Tune, Full Exhaust System, Upgraded Intercooler',
        hp: '+285 HP',
        peak: '680 WHP',
        description: 'This GT-R build pushed the limits with upgraded twin turbos and a fully custom ECU tune. The result? Massive power gains while maintaining daily driveability. Dyno-tested and track-proven.'
    },
    {
        title: '2020 BMW M4',
        mods: 'Track Suspension Setup, Big Brake Kit, Aero Package, Weight Reduction',
        hp: '+120 HP',
        peak: '1:42 Lap Time',
        description: 'Built for the track with precision suspension tuning, upgraded brakes, and aerodynamic enhancements. This M4 is a corner-carving weapon that shaved 4 seconds off previous lap times.'
    },
    {
        title: '2018 Subaru WRX STI',
        mods: 'Big Turbo Kit, Fuel System Upgrade, Coilover Suspension, Custom Tune',
        hp: '+180 HP',
        peak: '485 WHP',
        description: 'A comprehensive build featuring a larger turbo, supporting fuel mods, and suspension upgrades. This STI delivers explosive power with the reliability Subaru is known for.'
    },
    {
        title: '2021 Toyota Supra A90',
        mods: 'Big Single Turbo, Methanol Injection, Built Motor, Custom Exhaust',
        hp: '+420 HP',
        peak: '9.8s Quarter Mile',
        description: 'Fully built motor with big turbo setup and methanol injection. This Supra runs consistent 9-second quarter miles and stands as one of our most aggressive drag builds.'
    },
    {
        title: '2013 Nissan 370Z',
        mods: 'Supercharger Kit, Limited Slip Differential, Angle Kit, Coilovers',
        hp: '+210 HP',
        peak: '520 WHP',
        description: 'Purpose-built drift machine with supercharged power delivery and angle kit for maximum steering lock. This Z is a sideways monster that dominates drift events.'
    },
    {
        title: '2019 Honda Civic Type R',
        mods: 'Stage 2 ECU Tune, Downpipe, Cold Air Intake, Intercooler Upgrade',
        hp: '+95 HP',
        peak: '401 WHP',
        description: 'A perfectly balanced Stage 2 build that maximizes the K20C1 turbo engine. Great power gains without sacrificing the Type R\'s legendary handling and daily usability.'
    },
    {
        title: '2017 Porsche 911 GT3',
        mods: 'Race Exhaust System, ECU Flash, Track Alignment, Weight Reduction',
        hp: '+65 HP',
        peak: '1:38 Lap Time',
        description: 'Refinement of an already incredible track machine. With careful tuning and weight reduction, we extracted more performance from the naturally aspirated flat-six.'
    },
    {
        title: '2016 Dodge Challenger Hellcat',
        mods: 'Pulley Upgrade, E85 Flex Fuel Tune, Long Tube Headers, Drag Suspension',
        hp: '+245 HP',
        peak: '10.2s Quarter Mile',
        description: 'American muscle unleashed. Smaller pulley and E85 tune transform this Hellcat into a supercharged beast. Perfect for straight-line domination.'
    },
    {
        title: '2022 Volkswagen Golf R',
        mods: 'IS38 Turbo Swap, DSG Tune, Cold Air Intake, Downpipe',
        hp: '+155 HP',
        peak: '470 WHP',
        description: 'The ultimate sleeper. IS38 turbo upgrade paired with DSG transmission tune creates a Golf R that surprises everything on the road. AWD traction puts all that power down.'
    }
];

function openModal(index) {
    const data = buildData[index];
    
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalMods').textContent = data.mods;
    document.getElementById('modalHP').textContent = data.hp;
    document.getElementById('modalPeak').textContent = data.peak;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalImageLabel').textContent = data.title;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// === CONTACT FORM VALIDATION ===
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const vehicle = document.getElementById('vehicle').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !phone || !vehicle || !service || !message) {
            formError.classList.add('active');
            formSuccess.classList.remove('active');
            
            setTimeout(() => {
                formError.classList.remove('active');
            }, 5000);
            
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formError.textContent = 'Please enter a valid email address.';
            formError.classList.add('active');
            formSuccess.classList.remove('active');
            
            setTimeout(() => {
                formError.classList.remove('active');
                formError.textContent = 'Please fill out all required fields.';
            }, 5000);
            
            return;
        }
        
        // If validation passes
        formSuccess.classList.add('active');
        formError.classList.remove('active');
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 10 seconds
        setTimeout(() => {
            formSuccess.classList.remove('active');
        }, 10000);
        
        // In a real application, you would send the form data to a server here
        console.log('Form submitted:', { name, email, phone, vehicle, service, message });
    });
}

// === NUMBER COUNTER ANIMATION ===
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 16);
}

// Animate stats when they come into view
const statNumbers = document.querySelectorAll('.stat-number, .perf-number, .about-stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            const number = parseInt(text.match(/\d+/)?.[0] || 0);
            
            if (number > 0) {
                entry.target.textContent = '0';
                
                setTimeout(() => {
                    animateCounter(entry.target, number, 2000);
                    
                    // Add back any suffix (like +, s, etc.)
                    const suffix = text.replace(/[\d,]/g, '').trim();
                    if (suffix) {
                        const originalText = entry.target.textContent;
                        const interval = setInterval(() => {
                            const currentText = entry.target.textContent;
                            if (currentText.includes(suffix)) {
                                clearInterval(interval);
                            } else {
                                entry.target.innerHTML = `${currentText}<span>${suffix}</span>`;
                            }
                        }, 100);
                    }
                }, 200);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// === SCROLL PROGRESS INDICATOR (Optional Enhancement) ===
function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    // You can add a progress bar element in the navbar if desired
    // document.querySelector('.scroll-progress').style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// === PARALLAX EFFECT FOR HERO ===
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.5;
        }
    });
}

// === CURSOR TRAIL EFFECT (Optional Enhancement for Desktop) ===
if (window.innerWidth > 1024) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // You can add custom cursor elements here if desired
}

// === LAZY LOADING IMAGES (If real images are added) ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// === TESTIMONIAL SLIDER (Optional Enhancement) ===
// If you want to add a carousel effect to testimonials, implement here

// === PERFORMANCE OPTIMIZATION ===
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    updateScrollProgress();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// === PAGE LOAD ANIMATIONS ===
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero [data-aos]');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('aos-animate');
        }, index * 100);
    });
});

// === SERVICE CARDS TILT EFFECT (Optional Enhancement) ===
const serviceCards = document.querySelectorAll('.service-card');
if (window.innerWidth > 768) {
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// === INITIALIZE ===
console.log('APEX Performance - Website Loaded Successfully');
console.log('This is a demo website created to showcase premium car tuning design.');

// Add any additional initialization code here
