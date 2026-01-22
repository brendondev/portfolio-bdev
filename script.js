// Lenis Smooth Scroll
const initLenis = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  
  return lenis;
};

// Custom Cursor - Fixed
const initCursor = () => {
  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  
  if (!cursor || !cursorDot) return;
  
  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;
  let dotX = -100;
  let dotY = -100;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  const updateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
    
    requestAnimationFrame(updateCursor);
  };
  
  updateCursor();
  
  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-bento-card, .tool-bento-card, .thought-bento-card, .bento-card, .magnetic');
  
  interactiveElements.forEach(el => {
    if (el) {
      el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
    }
  });
};

// Tilt Effect
const initTilt = () => {
  const tiltElements = document.querySelectorAll('.project-bento-card, .tool-bento-card, .thought-bento-card, .stats-card, .experience-bento-card');
  
  tiltElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
    
    element.addEventListener('mouseenter', () => {
      element.style.transition = 'transform 0.1s ease';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
};

// Magnetic Effect
const initMagnetic = () => {
  const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-logo, .theme-toggle');
  
  magneticElements.forEach(element => {
    if (!element) return;
    
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 50;
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const moveX = x * force * 0.4;
        const moveY = y * force * 0.4;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
    });
  });
};

// Theme Toggle
const initTheme = () => {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && !systemDark)) {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
  }
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
};

// Navigation Active State
const initNavigation = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
};

// Form Submission
const initForm = () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Message sent!';
    submitBtn.style.background = 'var(--gradient-primary)';
    
    setTimeout(() => {
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
    }, 3000);
  });
};

// Smooth Scroll for Anchor Links
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target && typeof lenis !== 'undefined') {
        lenis.scrollTo(target, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  });
};

// Intersection Observer for Animations
const initAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  document.querySelectorAll('.bento-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });
};

// Hero Cards Animation
const initHeroCards = () => {
  const heroCards = document.querySelectorAll('.hero-card');
  heroCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
  });
};

// Parallax Effect on Scroll
const initParallax = () => {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroCards = document.querySelectorAll('.hero-card');
    
    heroCards.forEach((card, index) => {
      const speed = 0.1 + (index * 0.03);
      card.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initCursor();
  initTilt();
  initMagnetic();
  initTheme();
  initNavigation();
  initForm();
  initSmoothScroll();
  initAnimations();
  initHeroCards();
  initParallax();
});
