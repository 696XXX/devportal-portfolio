// script.js
// ==== Theme System ====
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// Detect OS preference
const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// Load saved theme or use OS default
const savedTheme = localStorage.getItem('theme') || osTheme;
html.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

// Toggle theme
themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
  // Update Discord widget if on discord page
  if (document.getElementById('discord-widget')) {
    updateDiscordWidget(next);
  }
});

function updateIcon(theme) {
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  icon.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
}

// ==== Mobile Sidebar ====
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
});

// Close sidebar on nav link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }
  });
});

// ==== Discord Widget (only on discord.html) ====
if (document.getElementById('discord-widget')) {
  const SERVER_ID = '123456789012345678'; // Replace with your actual Discord server ID
  const initialTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  updateDiscordWidget(initialTheme);

  // Observer for theme changes
  const observer = new MutationObserver(() => {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    updateDiscordWidget(newTheme);
  });
  observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
}

function updateDiscordWidget(theme) {
  const widgetDiv = document.getElementById('discord-widget');
  widgetDiv.innerHTML = `
    <iframe 
      src="https://discord.com/widget?id=${SERVER_ID}&theme=${theme}" 
      width="350" 
      height="190" 
      allowtransparency="true" 
      frameborder="0" 
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      style="border-radius: 8px; max-width: 100%;">
    </iframe>
  `;
}

// ==== Flip Cards on Click ===
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// ==== Shuffle Skills on Click (only on skills.html) ====
if (document.querySelector('.skills-grid')) {
  const skillsGrid = document.querySelector('.skills-grid');
  skillsGrid.addEventListener('click', (e) => {
    if (e.target.closest('.skill-item')) {
      const skills = Array.from(skillsGrid.children);
      skills.sort(() => Math.random() - 0.5);
      skills.forEach(skill => skillsGrid.appendChild(skill));
      skillsGrid.style.transition = 'all 0.5s ease';
      setTimeout(() => skillsGrid.style.transition = '', 500);
    }
  });
}

// Tambahkan di akhir script.js
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

