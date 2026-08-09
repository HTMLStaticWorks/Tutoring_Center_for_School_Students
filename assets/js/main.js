/**
 * BrightPath Learning Center
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme
  initTheme();
  
  // Initialize RTL
  initRTL();
  
  // Initialize Navbar & Dropdown
  initNavbar();
  
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // Initialize GSAP Animations if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initGSAPAnimations();
  }
  
  // Initialize AOS if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      duration: 800,
      offset: 100
    });
  }
  
  // Initialize CountUp if available
  initCountUp();
  
  // Initialize Scroll to Top
  initScrollToTop();
});

/**
 * Theme Toggle Logic
 */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  });
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  if (theme === 'dark') {
    themeToggle.innerHTML = '<i data-lucide="moon"></i>';
  } else {
    themeToggle.innerHTML = '<i data-lucide="sun"></i>';
  }
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/**
 * RTL Toggle Logic
 */
function initRTL() {
  const currentDir = localStorage.getItem('dir') || 'ltr';
  setRTL(currentDir === 'rtl');

  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      setRTL(!isRTL);
    });
  });
}

function setRTL(isRTL) {
  const dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
  localStorage.setItem('dir', dir);
  
  // Update Bootstrap CSS
  const bootstrapLink = document.querySelector('link[href*="bootstrap.min.css"], link[href*="bootstrap.rtl.min.css"]');
  if (bootstrapLink) {
    if (isRTL) {
      bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css';
    } else {
      bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    }
  }
}

/**
 * Navbar & Dropdown Logic
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar-premium');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile Dropdown Fixes
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle-custom');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 991.98) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('show');
      }
    });
  });
}

/**
 * GSAP Animations
 */
function initGSAPAnimations() {
  // Hero Animations
  if (document.querySelector('.hero-title')) {
    gsap.from('.hero-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });
    
    gsap.from('.hero-buttons', {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.4,
      ease: 'power3.out'
    });
    
    gsap.from('.hero-image-wrapper', {
      x: 50,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
      ease: 'power3.out'
    });
  }

  // Staggered Cards
  const cards = gsap.utils.toArray('.stagger-card');
  if (cards.length > 0) {
    gsap.from(cards, {
      scrollTrigger: {
        trigger: cards[0],
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out'
    });
  }
}

/**
 * CountUp Animations
 */
function initCountUp() {
  if (typeof countUp !== 'undefined') {
    const counters = document.querySelectorAll('.counter-val');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const options = {
        duration: 2.5,
        useEasing: true,
        useGrouping: true
      };
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          let cu = new countUp.CountUp(counter, target, options);
          if (!cu.error) cu.start();
          observer.disconnect();
        }
      });
      observer.observe(counter);
    });
  }
}

/**
 * Scroll to Top Logic
 */
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (!scrollToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
