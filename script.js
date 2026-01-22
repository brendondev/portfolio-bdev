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
  
  try {
    const response = await fetch('https://dev.to/api/articles?username=brendondev&per_page=4');
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const posts = await response.json();
    
    if (posts.length === 0) {
      container.innerHTML = `
        <div class="bento-card" style="grid-column: span 2; text-align: center; color: var(--text-secondary);">
          Nenhum post encontrado. <a href="https://dev.to/brendondev" target="_blank" style="color: var(--accent);">Escreva seu primeiro post no Dev.to!</a>
        </div>
      `;
      return;
    }
    
    container.innerHTML = posts.map(post => `
      <a href="${post.url}" target="_blank" class="thought-bento-card bento-card" style="text-decoration: none; display: block;">
        <div class="date">${new Date(post.published_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
        <h3>${post.title}</h3>
        <p class="read-time">${post.reading_time_minutes} min de leitura</p>
      </a>
    `).join('');
    
  } catch (error) {
    console.error('Error loading blog posts:', error);
    container.innerHTML = `
      <div class="bento-card" style="grid-column: span 2; text-align: center; color: var(--text-secondary);">
        Não foi possível carregar os posts. <a href="https://dev.to/brendondev" target="_blank" style="color: var(--accent);">Ver no Dev.to →</a>
      </div>
    `;
  }
}
