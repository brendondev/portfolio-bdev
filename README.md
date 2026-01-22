# Brendon Portfolio

Portfolio website built with pure HTML, CSS, and JavaScript. A modern, responsive WordPress developer portfolio featuring a dark/light theme toggle, multi-language support (PT/EN), and interactive project modals.

## Features

- 🎨 **Modern Bento Grid Design** - Clean, organized layout with card-based components
- 🌓 **Dark/Light Theme** - Toggle between themes with localStorage persistence
- 🌐 **Multi-language Support** - Portuguese (default) and English with instant switching
- 📱 **Fully Responsive** - Optimized for all screen sizes
- ⚡ **No Frameworks** - Pure HTML/CSS/JS for maximum performance
- 🔗 **Interactive Modals** - Detailed project views with smooth animations
- 📝 **Blog Integration** - Fetches posts from Dev.to API
- 🚀 **Netlify Ready** - Deploy-ready static site

## Project Structure

```
portfolio-astro/
├── index.html      # Main HTML file with all content and modals
├── styles.css      # Complete styling with CSS variables
├── script.js       # All JavaScript functionality
├── favicon.svg     # Site favicon
└── img/            # Project screenshots
    ├── cloud-rocktron.png
    ├── digi-vet.com.br.png
    ├── digi-vet.com.png
    ├── iecmbrasil.png
    └── moodle-integration.png
```

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-astro
```

2. Open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000` in your browser.

### Deploying to Netlify

1. Push your code to a GitHub repository
2. Connect your repository to Netlify
3. Netlify will automatically detect it's a static site
4. Your site will be live at `https://your-site.netlify.app`

## Customization

### Changing Content

Edit `index.html` to update:
- Project information and descriptions
- Experience and education sections
- Contact information
- Links to your social profiles

### Adding Projects

1. Add a project card in the "Selected Work" section:
```html
<article class="project-bento-card bento-card project-modal-trigger" data-project="project-id">
  <div class="project-image" style="background: linear-gradient(...)">
    <!-- Image or icon -->
  </div>
  <div class="project-content">
    <h3>Project Title</h3>
    <p>Short description</p>
  </div>
</article>
```

2. Add a modal at the bottom of the file:
```html
<div class="modal-overlay" id="modal-project-id">
  <div class="modal-container">
    <button class="modal-close" onclick="closeModal('project-id')">&times;</button>
    <div class="modal-content">
      <!-- Modal content -->
    </div>
  </div>
</div>
```

### Adding Translations

Add new translation keys to `script.js` in the `translations` object:

```javascript
const translations = {
  pt: {
    your_key: 'Seu texto em português',
  },
  en: {
    your_key: 'Your text in English',
  }
};
```

Then add `data-i18n="your_key"` to any HTML element you want to translate.

### Theme Colors

Edit the CSS variables in `styles.css`:

```css
:root {
  --accent: #6366f1;
  --accent-light: rgba(99, 102, 241, 0.1);
  --bg-primary: #0f0f0f;
  --bg-secondary: #1a1a1a;
  --bg-card: #242424;
  --text-primary: #f5f5f5;
  --text-secondary: #a3a3a3;
}
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, grid, flexbox, animations
- **JavaScript (ES6+)** - No frameworks, pure JS
- **Dev.to API** - Blog post integration
- **Font Awesome** - Icons (via CDN in HTML)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lighthouse score: ~95-100
- No external JavaScript frameworks
- Minimal CSS footprint
- Optimized for Core Web Vitals

## License

MIT License - Feel free to use this template for your own portfolio.

## Author

**Brendon** - WordPress Developer & Plugin Creator

- GitHub: [@brendondev](https://github.com/brendondev)
- LinkedIn: [/in/brendondev](https://linkedin.com/in/brendondev)
- Dev.to: [@brendondev](https://dev.to/brendondev)
- Email: brendonlima@gmail.com
