// ===== THEME SYSTEM =====
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// Detect OS preference
const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// Load saved theme or use OS default
const savedTheme = localStorage.getItem('theme') || osTheme;
html.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

// Toggle theme with animation
themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  
  // Add transition class
  html.style.transition = 'all 0.3s ease';
  
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
  
  // Remove transition after animation
  setTimeout(() => {
    html.style.transition = '';
  }, 300);
});

function updateIcon(theme) {
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  icon.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
}

// Listen for OS theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Only auto-switch if user hasn't manually set a preference
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    updateIcon(newTheme);
  }
});

// ===== MOBILE SIDEBAR =====
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const overlay = document.getElementById('overlay');

// Toggle sidebar
menuToggle.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scroll
});

// Close sidebar when clicking overlay
overlay.addEventListener('click', closeSidebar);

// Close sidebar function
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = ''; // Restore scroll
}

// Close sidebar when pressing Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('open')) {
    closeSidebar();
  }
});

// ===== NAVIGATION =====
const navLinks = document.querySelectorAll('.nav-link');
const breadcrumb = document.querySelector('.breadcrumb-item');

// Handle navigation clicks
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    // Skip external links
    if (href.startsWith('http')) return;
    
    e.preventDefault();
    
    // Remove active class from all links
    navLinks.forEach(l => l.classList.remove('active'));
    
    // Add active class to clicked link
    link.classList.add('active');
    
    // Update breadcrumb
    const linkText = link.querySelector('span').textContent;
    breadcrumb.textContent = linkText;
    
    // Close mobile sidebar
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
    
    // Smooth scroll to section
    if (href.startsWith('#') && href !== '#') {
      const targetId = href.substring(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        const headerHeight = 60;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    if (href === '#' || href.startsWith('http')) return;
    
    e.preventDefault();
    
    const targetId = href.substring(1);
    const target = document.getElementById(targetId);
    
    if (target) {
      const headerHeight = 60;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== INTERSECTION OBSERVER FOR ACTIVE SECTION =====
const sections = document.querySelectorAll('.section');

const observerOptions = {
  root: null,
  rootMargin: '-80px 0px -70% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      
      // Update active nav link
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
          
          // Update breadcrumb
          const linkText = link.querySelector('span').textContent;
          breadcrumb.textContent = linkText;
        }
      });
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
  sectionObserver.observe(section);
});

// ===== CODE COPY FUNCTIONALITY =====
function copyCode(button) {
  const codeSample = button.closest('.code-sample');
  const codeBlock = codeSample.querySelector('.code-block code');
  const codeText = codeBlock.textContent;
  
  // Copy to clipboard
  navigator.clipboard.writeText(codeText).then(() => {
    // Show success feedback
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.style.background = 'var(--success)';
    button.style.color = 'white';
    button.style.borderColor = 'var(--success)';
    
    // Reset after 2 seconds
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.background = '';
      button.style.color = '';
      button.style.borderColor = '';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    
    // Fallback: show error
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-times"></i> Failed';
    button.style.background = 'var(--danger)';
    button.style.color = 'white';
    button.style.borderColor = 'var(--danger)';
    
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.background = '';
      button.style.color = '';
      button.style.borderColor = '';
    }, 2000);
  });
}

// Make copyCode function global
window.copyCode = copyCode;

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

// Add styles for scroll to top button
const style = document.createElement('style');
style.textContent = `
  .scroll-to-top {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--accent);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 12px rgba(88, 101, 242, 0.4);
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 1000;
  }
  
  .scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .scroll-to-top:hover {
    background: var(--accent-hover);
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(88, 101, 242, 0.5);
  }
  
  .scroll-to-top:active {
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    .scroll-to-top {
      bottom: 16px;
      right: 16px;
      width: 44px;
      height: 44px;
    }
  }
`;
document.head.appendChild(style);

// Show/hide scroll to top button
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  
  scrollTimeout = setTimeout(() => {
    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }, 100);
});

// Scroll to top when clicked
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== HEADER SHADOW ON SCROLL =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 10) {
    header.style.boxShadow = 'var(--shadow)';
  } else {
    header.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ===== ANIMATE ELEMENTS ON SCROLL =====
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.card, .project-card, .stat-card, .skill-category, .timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add delay based on index for staggered animation
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
  
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
};

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
  animateOnScroll();
}

// ===== STATS COUNTER ANIMATION =====
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-value');
  
  counters.forEach(counter => {
    const target = counter.textContent;
    
    // Extract number from text (e.g., "12" from "12", "2.4k+" from "2.4k+")
    const match = target.match(/[\d.]+/);
    if (!match) return;
    
    const targetNum = parseFloat(match[0]);
    const suffix = target.replace(/[\d.]+/, '');
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNum / steps;
    let current = 0;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              // Format the number
              const formatted = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
              counter.textContent = formatted + suffix;
            }
          }, duration / steps);
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
};

// Initialize counter animations
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateCounters);
} else {
  animateCounters();
}

// ===== LOADING STATE =====
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Remove any loading indicators
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 300);
  }
});

// ===== PERFORMANCE: DEBOUNCE RESIZE EVENTS =====
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  
  resizeTimeout = setTimeout(() => {
    // Close sidebar on desktop
    if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  }, 250);
});

// ===== ACCESSIBILITY: FOCUS TRAP FOR MOBILE MENU =====
const focusableElements = 'a[href], button:not([disabled]), textarea, input, select';

sidebar.addEventListener('keydown', (e) => {
  if (!sidebar.classList.contains('open')) return;
  
  const firstFocusable = sidebar.querySelectorAll(focusableElements)[0];
  const focusableContent = sidebar.querySelectorAll(focusableElements);
  const lastFocusable = focusableContent[focusableContent.length - 1];
  
  // Trap focus inside sidebar when open
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }
});

// ===== CONSOLE MESSAGE =====
console.log(
  '%c👋 Hello, Developer!',
  'font-size: 20px; font-weight: bold; color: #5865f2;'
);
console.log(
  '%cInterested in how this portfolio was built? Check out the source code on GitHub!',
  'font-size: 14px; color: #4f5660;'
);
console.log(
  '%c🚀 Built with vanilla JavaScript, CSS, and lots of ☕',
  'font-size: 12px; color: #747f8d;'
);

// ===== EASTER EGG: KONAMI CODE =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-konamiSequence.length);
  
  if (konamiCode.join('') === konamiSequence.join('')) {
    // Easter egg activated!
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const easterEggStyle = document.createElement('style');
    easterEggStyle.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(easterEggStyle);
    
    console.log('%c🎉 KONAMI CODE ACTIVATED! 🎉', 'font-size: 24px; font-weight: bold; color: #3ba55d;');
    
    setTimeout(() => {
      document.body.style.animation = '';
      easterEggStyle.remove();
    }, 5000);
  }
});

// ===== INITIALIZE =====
console.log('%c✅ Portfolio loaded successfully!', 'font-size: 12px; color: #3ba55d; font-weight: bold;');
