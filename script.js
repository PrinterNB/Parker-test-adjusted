// ===== Typing effect =====
const phrases = [
  'Full-Stack Developer',
  'Creative Problem Solver',
  'Open Source Enthusiast',
  'Coffee-Powered Coder',
];

const typingEl = document.getElementById('typing-text');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typingEl.textContent = current.slice(0, charIndex--);
    typingTimeout = setTimeout(type, 60);
  } else {
    typingEl.textContent = current.slice(0, charIndex++);
    typingTimeout = setTimeout(type, charIndex <= current.length ? 100 : 1500);
  }

  if (!isDeleting && charIndex > current.length) {
    isDeleting = true;
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(type, 1500);
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingTimeout = setTimeout(type, 300);
  }
}

type();

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const skillCards = document.querySelectorAll('.skill-card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));
skillCards.forEach((el) => observer.observe(el));

// ===== Navbar shadow on scroll =====
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20
    ? '0 4px 30px rgba(0,0,0,0.4)'
    : 'none';
});

// ===== Smooth active nav link highlight =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--clr-text)'
            : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -40% 0px' }
);

sections.forEach((s) => sectionObserver.observe(s));

// ===== Parallax orbs =====
const orbs = Array.from(document.querySelectorAll('.orb'));
let rafPending = false;
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(() => {
      const x = (mouseX / window.innerWidth - 0.5) * 30;
      const y = (mouseY / window.innerHeight - 0.5) * 30;
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.4;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
      rafPending = false;
    });
  }
});
