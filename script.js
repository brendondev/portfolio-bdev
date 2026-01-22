// Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    
    themeToggle.onclick = function() {
      isDark = !isDark;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
    };
  }
  
  // Navigation Active State
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  
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
  
  // Form Submission
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
  
  // Load Blog Posts from Dev.to
  loadBlogPosts();
});

// Load Blog Posts from Dev.to API
async function loadBlogPosts() {
  const container = document.getElementById('blog-posts');
  if (!container) return;
  
  container.innerHTML = `
    <div class="bento-card" style="grid-column: span 2; text-align: center; color: var(--text-secondary);">
      <p style="margin-bottom: 12px;">📝 Writing</p>
      <p style="font-size: 0.875rem; margin-bottom: 12px;">Meus artigos no Dev.to:</p>
      <a href="https://dev.to/brendondev" target="_blank" style="color: var(--accent); font-weight: 600;">
        Ver meus posts no Dev.to →
      </a>
      <p style="font-size: 0.75rem; margin-top: 16px; color: var(--text-muted);">
        Posts também aparecem aqui automaticamente
      </p>
    </div>
  `;
  
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch('https://dev.to/api/articles?username=brendondev', {
      signal: controller.signal
    });
    
    clearTimeout(timeout);
    
    if (!response.ok) throw new Error('API error');
    
    const posts = await response.json();
    
    if (posts && posts.length > 0) {
      container.innerHTML = posts.slice(0, 4).map(post => `
        <a href="${post.url}" target="_blank" class="thought-bento-card bento-card" style="text-decoration: none; display: block;">
          <div class="date">${new Date(post.published_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          <h3>${post.title}</h3>
          <p class="read-time">${post.reading_time_minutes} min de leitura</p>
        </a>
      `).join('');
    }
  } catch (error) {
    console.log('Blog posts will show link fallback');
  }
}

// Modal Functions
function openModal(projectId) {
  const modal = document.getElementById('modal-' + projectId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(projectId) {
  const modal = document.getElementById('modal-' + projectId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', function() {
  // Modal click handlers
  const modalTriggers = document.querySelectorAll('.project-modal-trigger');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      openModal(projectId);
    });
  });
  
  // Close modal on background click
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        const projectId = this.id.replace('modal-', '');
        closeModal(projectId);
      }
    });
  });
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        const projectId = modal.id.replace('modal-', '');
        closeModal(projectId);
      });
    }
  });
});
