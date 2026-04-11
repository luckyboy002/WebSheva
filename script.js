/* ============================================
   PERSONA 5 PORTFOLIO — INTERACTIVE SCRIPT
   "Take Your Heart" Engine
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === LOADING SCREEN ===
    const loadingScreen = document.getElementById('loading-screen');
    
    if (!sessionStorage.getItem('hasLoaded')) {
        // Prevent scroll during loading
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
            initAnimations();
            sessionStorage.setItem('hasLoaded', 'true');
        }, 2800);
    } else {
        loadingScreen.style.display = 'none';
        document.body.style.overflow = 'auto';
        initAnimations();
    }

    // === NAVBAR SCROLL EFFECT ===
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    let lastScrollY = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;

        // Add/remove scrolled class
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // === MOBILE MENU TOGGLE ===
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // === SCROLL REVEAL ANIMATIONS ===
    function initAnimations() {
        // Add reveal classes to elements
        const revealElements = [
            { selector: '.text-card', class: 'reveal-left' },
            { selector: '.confidant-card', class: 'reveal-right' },
            { selector: '.skill-card', class: 'reveal' },
            { selector: '.project-card', class: 'reveal' },
            { selector: '.calling-card', class: 'reveal-left' },
            { selector: '.contact-form-wrapper', class: 'reveal-right' },
            { selector: '.contact-links', class: 'reveal-left' },
            { selector: '.section-header', class: 'reveal' },
        ];

        revealElements.forEach(({ selector, class: revealClass }) => {
            document.querySelectorAll(selector).forEach((el, i) => {
                el.classList.add(revealClass);
                el.style.transitionDelay = `${i * 0.1}s`;
            });
        });

        // Create intersection observer for scroll reveals
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Trigger skill level animations
                    if (entry.target.classList.contains('skill-card')) {
                        const levelFill = entry.target.querySelector('.level-fill');
                        if (levelFill) {
                            const level = levelFill.getAttribute('data-level');
                            levelFill.style.setProperty('--level', level);
                            setTimeout(() => levelFill.classList.add('animated'), 200);
                        }
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            revealObserver.observe(el);
        });

        // Animate stat bars in hero card
        setTimeout(() => {
            document.querySelectorAll('.stat-fill').forEach(fill => {
                fill.classList.add('animated');
            });
        }, 3500);
    }

    // === CURSOR TRAIL EFFECT (Desktop only) ===
    if (window.matchMedia('(pointer: fine)').matches) {
        const trailContainer = document.getElementById('cursor-trail');
        const trailDots = [];
        const TRAIL_LENGTH = 8;

        for (let i = 0; i < TRAIL_LENGTH; i++) {
            const dot = document.createElement('div');
            dot.classList.add('trail-dot');
            dot.style.width = `${8 - i}px`;
            dot.style.height = `${8 - i}px`;
            dot.style.opacity = `${0.6 - (i * 0.07)}`;
            trailContainer.appendChild(dot);
            trailDots.push({
                el: dot,
                x: 0,
                y: 0
            });
        }

        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateTrail() {
            let prevX = mouseX;
            let prevY = mouseY;

            trailDots.forEach((dot, i) => {
                const speed = 0.35 - (i * 0.02);
                dot.x += (prevX - dot.x) * speed;
                dot.y += (prevY - dot.y) * speed;
                dot.el.style.left = `${dot.x}px`;
                dot.el.style.top = `${dot.y}px`;
                prevX = dot.x;
                prevY = dot.y;
            });

            requestAnimationFrame(animateTrail);
        }

        animateTrail();
    }

    // === CONTACT FORM HANDLING ===
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;

        // Animate button
        submitBtn.querySelector('.btn-text').textContent = 'SENDING...';
        submitBtn.style.pointerEvents = 'none';

        // Simulate sending
        setTimeout(() => {
            submitBtn.querySelector('.btn-text').textContent = 'CARD SENT! ✓';
            submitBtn.style.background = '#22CC44';

            // Create celebration particles
            createParticles(submitBtn);

            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.pointerEvents = 'auto';
                contactForm.reset();
            }, 3000);
        }, 1500);
    });
    }

    // === PARTICLE EFFECT ===
    function createParticles(originEl) {
        const rect = originEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: ${['#FF0000', '#FFD700', '#FFFFFF', '#FF2222'][Math.floor(Math.random() * 4)]};
                left: ${centerX}px;
                top: ${centerY}px;
                pointer-events: none;
                z-index: 10000;
                clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            `;
            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / 20;
            const velocity = Math.random() * 100 + 60;
            const dx = Math.cos(angle) * velocity;
            const dy = Math.sin(angle) * velocity;

            particle.animate([
                { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px) scale(0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'forwards'
            }).onfinish = () => particle.remove();
        }
    }

    // === PERSONA CARD TILT EFFECT ===
    const personaCard = document.querySelector('.persona-card');
    if (personaCard && window.matchMedia('(pointer: fine)').matches) {
        personaCard.addEventListener('mousemove', (e) => {
            const rect = personaCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;

            personaCard.style.transform = `rotate(-2deg) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        personaCard.addEventListener('mouseleave', () => {
            personaCard.style.transform = 'rotate(-2deg)';
        });
    }

    // === SKILL CARD HOVER SOUND EFFECT (Visual) ===
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Flash effect on hover
            const flash = document.createElement('div');
            flash.style.cssText = `
                position: absolute;
                inset: 0;
                background: rgba(255, 0, 0, 0.15);
                pointer-events: none;
                z-index: 10;
            `;
            card.appendChild(flash);

            flash.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: 300,
                fill: 'forwards'
            }).onfinish = () => flash.remove();
        });
    });

    // === DYNAMIC TEXT TYPING EFFECT FOR HERO ===
    const roles = ['DEVELOPER', 'DESIGNER', 'CREATOR', 'INNOVATOR', 'PHANTOM THIEF'];
    let roleIndex = 0;
    const accentLine = document.querySelector('.title-line.line-3.accent');

    if (accentLine) {
        setInterval(() => {
            roleIndex = (roleIndex + 1) % roles.length;

            accentLine.style.opacity = '0';
            accentLine.style.transform = 'translateY(20px) skewX(-5deg)';

            setTimeout(() => {
                accentLine.textContent = roles[roleIndex];
                accentLine.setAttribute('data-text', roles[roleIndex]);
                accentLine.style.opacity = '1';
                accentLine.style.transform = 'translateY(0) skewX(0deg)';
            }, 300);
        }, 3000);
    }

    // === PARALLAX EFFECT FOR BG SHAPES ===
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const shapes = document.querySelectorAll('.bg-shape');
        shapes.forEach((shape, i) => {
            const speed = 0.05 * (i + 1);
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // === KONAMI CODE EASTER EGG ===
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateAllOutAttack();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateAllOutAttack() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: var(--red);
            z-index: 100000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: allOutFlash 2s forwards;
        `;

        const text = document.createElement('div');
        text.textContent = 'ALL-OUT ATTACK!';
        text.style.cssText = `
            font-family: 'Anton', sans-serif;
            font-size: 5rem;
            color: white;
            letter-spacing: 0.1em;
            text-shadow: 4px 4px 0 black;
            animation: allOutText 2s forwards;
        `;

        overlay.appendChild(text);
        document.body.appendChild(overlay);

        // Add keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes allOutFlash {
                0% { opacity: 0; }
                10% { opacity: 1; }
                70% { opacity: 1; }
                100% { opacity: 0; pointer-events: none; }
            }
            @keyframes allOutText {
                0% { transform: scale(3) rotate(-10deg); opacity: 0; }
                20% { transform: scale(1) rotate(0deg); opacity: 1; }
                70% { transform: scale(1) rotate(0deg); opacity: 1; }
                100% { transform: scale(0.8) rotate(5deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            overlay.remove();
            style.remove();
        }, 2500);
    }

    // === PAGE VISIBILITY CHANGE ===
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            document.title = 'TAKE YOUR HEART — Portfolio';
        } else {
            document.title = '💔 Come back! — Portfolio';
        }
    });

});
