(function() {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙';
  }
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success message
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '✓ Message sent!';
      submitBtn.style.background = 'var(--gradient-primary)';
      
      // Reset form after delay
      setTimeout(() => {
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 3000);
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('fade-in');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.project-card, .experience-item, .tool-card, .thought-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Parallax effect on hero
  let ticking = false;
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero::before, .hero::after');
    if (parallax && scrolled < 600) {
      const speed = 0.5;
      document.documentElement.style.setProperty('--parallax-offset', `${scrolled * speed}px`);
    }
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);

  // Active navigation state
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
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

  // Add hover effect to project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // Logo hover effect
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  }
})();