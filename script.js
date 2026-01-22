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

// Theme Toggle - CORRIGIDO
const initTheme = () => {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply saved theme or system preference
  const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
};

// Navigation Active State - CORRIGIDO
const initNavigation = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Run on load
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
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target && typeof lenis !== 'undefined') {
        lenis.scrollTo(target, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
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
  initTheme();
  initNavigation();
  initForm();
  initSmoothScroll();
  initAnimations();
  initHeroCards();
  initParallax();
});
