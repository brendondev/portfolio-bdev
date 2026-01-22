// Debug - verify script is running
console.log('Script loaded');

// Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  
  const themeToggle = document.getElementById('themeToggle');
  console.log('Theme toggle found:', !!themeToggle);
  
  if (themeToggle) {
    // Get current theme state
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    console.log('Initial theme:', isDark ? 'dark' : 'light');
    
    // Click handler
    themeToggle.onclick = function() {
      isDark = !isDark;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      console.log('Theme switched to:', isDark ? 'dark' : 'light');
    };
  }
  
  // Navigation Active State
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  console.log('Nav links:', navLinks.length);
  console.log('Sections:', sections.length);
  
  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
  
  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('.submit-btn');
      if (submitBtn) {
        submitBtn.textContent = '✓ Message sent!';
        setTimeout(() => {
          this.reset();
          submitBtn.textContent = 'Send Message';
        }, 3000);
      }
    });
  }
});
