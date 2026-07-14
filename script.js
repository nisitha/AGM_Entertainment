/* ============================================================
   AGM ENTERTAINMENT — Interactive JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Navbar Scroll Effect ───────────────────────────────────
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // ─── Mobile Nav Toggle ──────────────────────────────────────
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ─── Hero Particle Generator ────────────────────────────────
    const particleContainer = document.getElementById('heroParticles');
    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = (40 + Math.random() * 60) + '%';
        particle.style.animationDelay = (Math.random() * 6) + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        particleContainer.appendChild(particle);
    }

    // ─── Scroll-triggered Animations (IntersectionObserver) ─────
    const animatedElements = document.querySelectorAll('[data-animate]');

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                animateObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => animateObserver.observe(el));

    // ─── Stat Counter Animation ─────────────────────────────────
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const duration = 2000;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease-out-quart
                    const eased = 1 - Math.pow(1 - progress, 4);
                    const current = Math.round(eased * target);
                    el.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        el.textContent = target;
                    }
                }

                requestAnimationFrame(updateCount);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // ─── Smooth anchor scrolling with offset ────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── Gold shimmer animation on hero title ───────────────────
    const titleLine2 = document.querySelector('.title-line-2');
    if (titleLine2) {
        let angle = 135;
        function shimmer() {
            angle = (angle + 0.3) % 360;
            titleLine2.style.background =
                `linear-gradient(${angle}deg, #e8c84a 0%, #d4af37 40%, #b8941e 80%, #e8c84a 100%)`;
            titleLine2.style.backgroundClip = 'text';
            titleLine2.style.webkitBackgroundClip = 'text';
            titleLine2.style.webkitTextFillColor = 'transparent';
            requestAnimationFrame(shimmer);
        }
        // Start shimmer after initial animation
        setTimeout(shimmer, 2000);
    }

    // ─── Parallax on hero scroll ────────────────────────────────
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            const parallaxOffset = scrolled * 0.3;
            const opacity = 1 - (scrolled / (window.innerHeight * 0.7));
            heroContent.style.transform = `translateY(${parallaxOffset}px)`;
            heroContent.style.opacity = Math.max(opacity, 0);
        }
    }, { passive: true });

});

// ─── Contact Form Handler ───────────────────────────────────
function handleSubmit(e) {
    e.preventDefault();

    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');

    // Simple validation visual feedback
    const inputs = form.querySelectorAll('input, textarea');
    let valid = true;
    inputs.forEach(input => {
        if (input.required && !input.value.trim()) {
            input.style.borderColor = '#c0392b';
            valid = false;
        } else {
            input.style.borderColor = '';
        }
    });

    if (!valid) return;

    // Show success state
    form.style.display = 'none';
    success.classList.add('visible');
}

function resetForm() {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    form.reset();
    form.style.display = '';
    success.classList.remove('visible');
}
