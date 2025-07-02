// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksList = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Smooth scroll and close menu
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = item.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
      
      if (window.innerWidth <= 768) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      }
    }
  });
});

// Close menu when clicking outside
window.addEventListener('click', (e) => {
  if (window.innerWidth <= 768 && 
      !e.target.closest('.nav-links') && 
      !e.target.closest('.mobile-menu-btn')) {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// Close mobile menu when a nav link is clicked
function closeMenu() {
  navLinks.classList.remove('active');
  menuBtn.setAttribute('aria-expanded', 'false');
}

// Active link highlighting
function setActiveLink() {
  let index = sections.length;
  
  while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
  
  navLinksList.forEach((link) => link.classList.remove('active'));
  navLinksList[index]?.classList.add('active');
}

// Sticky navbar on scroll
function handleScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  setActiveLink();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu after clicking a link
      closeMenu();
    }
  });
});

// Typewriter effect for hero section
const nameElement = document.getElementById('animated-name');
const names = ["Fahad Hayat", "a Problem Solver", "a Cloud Enthusiast", "a MERN Developer"];
let nameIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;
let pauseTime = 2000;

function typeWriter() {
  const currentName = names[nameIndex];
  
  if (isDeleting) {
    charIndex--;
    typingSpeed = 50;
  } else {
    charIndex++;
    typingSpeed = 150;
  }
  
  // Add colored span to the current name
  const coloredName = `<span style="color: var(--accent)">${currentName.substring(0, charIndex)}</span>`;
  nameElement.innerHTML = coloredName;
  
  // Check if we've reached the end of the current name
  if (!isDeleting && charIndex === currentName.length) {
    isDeleting = true;
    typingSpeed = pauseTime;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    nameIndex = (nameIndex + 1) % names.length;
  }
  
  setTimeout(typeWriter, typingSpeed);
}

// Initialize theme from localStorage
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// Initialize scroll reveal animations
function initScrollReveal() {
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    delay: 200,
    reset: false
  });

  sr.reveal('.section', { interval: 200 });
  sr.reveal('.project-card', { interval: 200 });
  sr.reveal('.skill-category', { interval: 150 });
  sr.reveal('.timeline-item', { interval: 200 });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initTheme();
  
  // Start typewriter effect
  setTimeout(typeWriter, 1000);
  
  // Initialize scroll reveal if the library is loaded
  if (typeof ScrollReveal !== 'undefined') {
    initScrollReveal();
  }
  
  // Set active nav link on page load
  setActiveLink();
});

// Add scroll event listener for sticky navbar and active link highlighting
window.addEventListener('scroll', handleScroll);

// Theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// Add animation class to hero content
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  heroContent.style.opacity = '0';
  heroContent.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    heroContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }, 300);
}

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
  });
});

// Add smooth scroll behavior for the entire page
document.documentElement.style.scrollBehavior = 'smooth';

// Remove smooth scroll when using arrow keys for better accessibility
let isScrolling = false;
window.addEventListener('keydown', (e) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) {
    document.documentElement.style.scrollBehavior = 'auto';
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 1000);
  }
});
