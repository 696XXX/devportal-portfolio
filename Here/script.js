const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');
const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const savedTheme = localStorage.getItem('theme') || osTheme;
html.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
  if (document.getElementById('discord-widget')) {
    updateDiscordWidget(next);
  }
});

function updateIcon(theme) {
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  icon.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
}

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

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }
  });
});

if (document.getElementById('discord-widget')) {
  const SERVER_ID = '1311858099413323847'; // nah yg ini nih, ganti id server discord lu
  const initialTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  updateDiscordWidget(initialTheme);
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