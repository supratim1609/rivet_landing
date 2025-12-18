// Rivet Landing Page - Premium Interactive Features

// ============================================
// 1. CUSTOM CURSOR EFFECT
// ============================================
const cursor = document.createElement('div');
const cursorTrail = document.createElement('div');
cursor.className = 'custom-cursor';
cursorTrail.className = 'custom-cursor-trail';
document.body.appendChild(cursor);
document.body.appendChild(cursorTrail);

let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let cursorX = mouseX, cursorY = mouseY;
let trailX = mouseX, trailY = mouseY;

// Only enable custom cursor on desktop
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate cursor with smooth following
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;

        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        cursorTrail.style.transform = `translate(${trailX - 4}px, ${trailY - 4}px)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .copy-btn, .group');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

// ============================================
// 2. SCROLL PROGRESS INDICATOR
// ============================================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();

// ============================================
// 3. PARALLAX SCROLLING
// ============================================
const parallaxBg = document.querySelector('.mesh-gradient');
const parallaxFloat = document.querySelector('.animate-float');

function handleParallax() {
    const scrolled = window.pageYOffset;

    if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    if (parallaxFloat) {
        parallaxFloat.style.transform = `translateY(${-scrolled * 0.1}px)`;
    }
}

window.addEventListener('scroll', handleParallax);

// ============================================
// 4. 3D TILT EFFECT ON CARDS
// ============================================
const tiltCards = document.querySelectorAll('.group');

tiltCards.forEach(card => {
    card.classList.add('tilt-card');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
    });
});

// ============================================
// 5. TYPEWRITER EFFECT (DISABLED - New hero section doesn't use it)
// ============================================
/*
function typewriterEffect() {
    const heroHeading = document.querySelector('h1');
    if (!heroHeading) return;

    const originalText = heroHeading.innerHTML;
    const textContent = 'Backend for <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-rivet-200 to-rivet-500">Modern Dart.</span>';

    // Extract plain text for typing
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = textContent;
    const plainText = tempDiv.textContent || tempDiv.innerText;

    heroHeading.innerHTML = '';
    let charIndex = 0;
    let currentHTML = '';
    let inTag = false;

    function type() {
        if (charIndex < textContent.length) {
            const char = textContent[charIndex];

            if (char === '<') inTag = true;
            if (char === '>') inTag = false;

            currentHTML += char;

            if (!inTag && char === '>') {
                heroHeading.innerHTML = currentHTML + '<span class="typewriter-cursor"></span>';
            } else if (!inTag) {
                heroHeading.innerHTML = currentHTML + '<span class="typewriter-cursor"></span>';
            }

            charIndex++;
            setTimeout(type, inTag ? 0 : 50);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroHeading.innerHTML = currentHTML;
            }, 1000);
        }
    }

    // Start typing after a brief delay
    setTimeout(type, 500);
}

// Run typewriter on page load
window.addEventListener('load', typewriterEffect);
*/


// ============================================
// 6. ANIMATED STATS COUNTER
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = '+' + Math.floor(start / 100) + 'k';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = '+2k';
        }
    }

    updateCounter();
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statsElement = entry.target;
            animateCounter(statsElement, 2000);
            statsObserver.unobserve(statsElement);
        }
    });
}, { threshold: 0.5 });

const statsNumber = document.querySelector('.w-8.h-8.rounded-full.border-2.border-black.bg-dark-surface');
if (statsNumber) {
    statsNumber.classList.add('stats-number');
    statsObserver.observe(statsNumber);
}

// ============================================
// 7. CODE TYPING ANIMATION
// ============================================
function animateCode() {
    const codeLines = document.querySelectorAll('.code-window .flex');

    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.animation = 'fadeInLine 0.3s ease forwards';
        }, index * 100);
    });
}

// Run code animation after typewriter
setTimeout(animateCode, 3000);

// ============================================
// 8. MOBILE MENU
// ============================================
const mobileMenuHTML = `
    <div class="mobile-menu-overlay"></div>
    <div class="mobile-menu">
        <nav>
            <a href="#features">Features</a>
            <a href="#middleware">Middleware</a>
            <a href="#get-started">Get Started</a>
            <a href="https://github.com/supratim1609/rivet" target="_blank">GitHub</a>
        </nav>
    </div>
`;

document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);

// Create hamburger button
const navButtons = document.querySelector('nav .flex.items-center.gap-4');
if (navButtons) {
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    navButtons.insertBefore(hamburger, navButtons.firstChild);

    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
    });

    mobileMenuOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        });
    });
}

// ============================================
// 9. COPY TO CLIPBOARD
// ============================================
const copyButton = document.querySelector('.copy-btn');
const commandInput = document.querySelector('input[readonly]');

if (copyButton && commandInput) {
    copyButton.addEventListener('click', async function () {
        try {
            await navigator.clipboard.writeText(commandInput.value);

            const originalHTML = copyButton.innerHTML;
            copyButton.classList.add('copied');
            copyButton.innerHTML = '<span class="material-symbols-outlined text-sm">check</span> Copied!';

            setTimeout(() => {
                copyButton.classList.remove('copied');
                copyButton.innerHTML = originalHTML;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
}

// ============================================
// 10. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
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

// ============================================
// 11. SCROLL-BASED NAVBAR BACKGROUND
// ============================================
const navbar = document.querySelector('nav');
if (navbar) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// 12. INTERSECTION OBSERVER FOR FADE-IN
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and sections
document.querySelectorAll('.group').forEach(el => {
    observer.observe(el);
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c⚡ Rivet Framework', 'color: #a3e635; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with Dart. Powered by performance.', 'color: #fafafa; font-size: 14px;');
console.log('%cInterested in contributing? Check out https://github.com/supratim1609/rivet', 'color: #a1a1aa; font-size: 12px;');

// ============================================
// 13. LAUNCH CONFETTI
// ============================================
window.addEventListener('load', () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
});
// ============================================
// 14. ANNOUNCEMENT MODAL LOGIC
// ============================================
const modal = document.getElementById('announcement-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalCard = document.getElementById('modal-card');

function closeModal() {
    if (modal) {
        modal.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

// 3D Tilt for Modal
if (modalCard) {
    document.addEventListener('mousemove', (e) => {
        if (modal.style.display === 'none') return;

        const rect = modalCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Only tilt if mouse is somewhat near the center of screen to avoid weird jumps
        // or just base it on screen position relative to center
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        const rotateX = ((e.clientY - screenCenterY) / screenCenterY) * -15; // Max 15deg tilt
        const rotateY = ((e.clientX - screenCenterX) / screenCenterX) * 15;

        modalCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset on mouse leave? No, let it float based on cursor position always when open
}
