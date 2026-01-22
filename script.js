// Lenis Smooth Scroll
const lenis = (() => {
  'use strict';
  const t = {
      mothly: 12,
      weekly: 4,
      daily: 1,
      hourly: 1
  };

  class Lenis {
      constructor(t) {
          this.options = Object.assign({
              duration: 1.2,
              easing: (t => t),
              direction: 'vertical',
              gestureDirection: 'vertical',
              smooth: !0,
              mouseMultiplier: 1,
              smoothTouch: !1,
              touchMultiplier: 2,
              infinite: !1,
              callback: () => {}
          }, t);
          this.className = 'lenis';
          this.version = '1.0.11';
          this.rAF = 0;
          this.rAFCancelled = !0;
          this.isScrollable = !0;
          this.isLocked = !1;
          this.isInstalling = !1;
          this.isBouncing = !1;
          this.isSuspended = !1;
          this.isPaused = !1;
          this.isUserInteraction = !1;
          this.isStopped = !1;
          this.isScriptBased = !1;
          this.scroll = {
              0: 0
          };
          this.contentHeight = 0;
          this.scrollHeight = 0;
          this.bodyHeight = 0;
          this.hasScrollEvent = !1;
          this.hasWheelEvent = !1;
          this.hasTouchEvent = !1;
          this.onHasScrollEvent = {
              v: 0
          };
          this.onHasWheelEvent = {
              v: 0
          };
          this.onHasTouchEvent = {
              v: 0
          };
          this.onUserInteraction = {
              v: 0
          };
          this.onScroll = {
              v: 0
          };
          this.isNeeded = () => !0;
          this.validate = () => !0;
          this.setup = () => {
              const {
                  options: e,
                  scroll: s,
                  element: i
              } = this;
              if (e.infinite) {
                  this.getScrollCallback = (t => {
                      const e = Math.round(t / this.innerHeight) * this.innerHeight;
                      const s = Math.ceil(e / this.innerHeight);
                      if (s !== this.activeIndex) {
                          this.activeIndex = s;
                          return e - (s - 1) * this.innerHeight;
                      }
                      return t;
                  });
              }
          };
          this.destroy = () => {
              this.stop();
              this.rAF = 0;
              this.scroll = {
                  0: 0
              };
          };
          this.update = (t, e) => {
              this.rAF = requestAnimationFrame((() => {
                  const t = this.targetScroll + (this.currentScroll - this.targetScroll) * this.easing(this.time);
                  this.targetScroll = t;
                  this.currentScroll = t;
                  this.onScroll.v++;
                  e || (this.scroll[t] = t);
                  this.callback(t);
                  this.rAF = requestAnimationFrame(this.update);
              }));
          };
          this.start = () => {
              this.rAFCancelled = !1;
              this.rAF = requestAnimationFrame(this.update);
          };
          this.stop = () => {
              this.rAFCancelled = !0;
              cancelAnimationFrame(this.rAF);
          };
          this.scrollTo = (t, e) => {
              this.isLocked = !0;
              const s = this.targetScroll;
              this.targetScroll = this.getScrollByTarget(t);
              e && (this.duration = e.duration);
              this.duration = e.duration || this.duration;
              this.easing = e.easing || this.easing;
              this.startTime = Date.now();
              this.rAF = requestAnimationFrame(this.animate);
          };
          this.animate = () => {
              const t = this.duration ? Math.min((Date.now() - this.startTime) / this.duration, 1) : 1;
              const e = this.easing(t);
              const s = this.targetScroll - this.startScroll;
              const i = this.scrollToPos + s * e;
              this.targetScroll = i;
              this.currentScroll = i;
              this.scroll[i] = i;
              t < 1 ? this.rAF = requestAnimationFrame(this.animate) : (this.isLocked = !1, this.onUserInteraction.v++, this.rAF = requestAnimationFrame(this.update));
          };
          this.getScrollByTarget = (t) => {
              const e = typeof t === 'number';
              if (e) return t;
              if (t === 0) return 0;
              let s = 0;
              const i = document.body.scrollHeight;
              const r = window.innerHeight;
              const n = t.getBoundingClientRect();
              const a = this.options.direction === 'vertical' ? window.scrollY || window.pageYOffset : window.scrollX || window.pageXOffset;
              s = this.options.direction === 'vertical' ? n.top + a - i + (this.options.infinite ? this.innerHeight : 0) : n.left + a - i + (this.options.infinite ? this.innerWidth : 0);
              return s;
          };
          this.getScrollCallback = (t => t);
          this.on = (t, e) => {
              this[t].v++;
          };
          this.off = (t, e) => {
              this[t].v--;
          };
          this.cancel = () => {
              this.rAFCancelled = !0;
              cancelAnimationFrame(this.rAF);
          };
          this.scrollToPos = 0;
          this.targetScroll = 0;
          this.currentScroll = 0;
          this.startScroll = 0;
          this.time = 0;
          this.easing = e => e;
          this.duration = 1.2;
          this.startTime = Date.now();
          this.options = Object.assign({}, t);
          this.element = window;
          this.innerHeight = window.innerHeight;
          this.innerWidth = window.innerWidth;
          this.scroll = {
              0: 0
          };
          this.activeIndex = 0;
          this.targetScroll = 0;
          this.currentScroll = 0;
          this.startScroll = 0;
          this.setup();
      }
  }

  function e(t, e, s) {
      return Math.max(Math.min(t, s), e);
  }

  function s(t) {
      return t.getBoundingClientRect();
  }

  function i(t, e) {
      const i = s(t);
      const r = i[e];
      return r;
  }

  function r(t) {
      const e = i(t, 'top');
      const s = i(t, 'bottom');
      return e + s;
  }

  function n(t) {
      const e = i(t, 'height');
      return Math.round(e);
  }

  function a(t) {
      const e = n(t);
      return e;
  }

  return Lenis;
})();

// Initialize Lenis
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

// Custom Cursor
const initCursor = () => {
  const cursor = document.createElement('div');
  const cursorDot = document.createElement('div');
  
  cursor.className = 'cursor';
  cursorDot.className = 'cursor-dot';
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let dotX = 0;
  let dotY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  const updateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;
    
    cursor.style.left = cursorX - 10 + 'px';
    cursor.style.top = cursorY - 10 + 'px';
    cursorDot.style.left = dotX - 2 + 'px';
    cursorDot.style.top = dotY - 2 + 'px';
    
    requestAnimationFrame(updateCursor);
  };
  
  updateCursor();
  
  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .tool-card, .thought-card, .bento-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  
  return { cursor, cursorDot };
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
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
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
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 50;
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const moveX = x * force * 0.5;
        const moveY = y * force * 0.5;
        
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
    
    // Add scrolled class to nav
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
};

// Form Submission
const initForm = () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '✓ Message sent!';
      submitBtn.style.background = 'var(--gradient-primary)';
      
      setTimeout(() => {
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 3000);
    });
  }
};

// Smooth Scroll for Anchor Links
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, {
          duration: 1.5,
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
        }, index * 100);
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
    card.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
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
      const speed = 0.1 + (index * 0.05);
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
