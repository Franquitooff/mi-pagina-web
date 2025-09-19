// ===== GESTIÓN PERSISTENTE DEL MODO OSCURO =====
function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  
  if (isDark) {
    setLightMode();
  } else {
    setDarkMode();
  }
}

function setDarkMode() {
  document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
  updateThemeButton('dark');
}

function setLightMode() {
  document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('theme', 'light');
  updateThemeButton('light');
}

function updateThemeButton(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  if (theme === 'dark') {
    themeToggle.querySelector('.toggle-thumb').style.transform = 'translateY(-50%)';
    themeToggle.querySelector('.toggle-track').style.backgroundColor = '#454545';
  } else {
    themeToggle.querySelector('.toggle-thumb').style.transform = 'translateY(-50%)';
    themeToggle.querySelector('.toggle-track').style.backgroundColor = '#aaa';
  }
}

// Aplicar tema al cargar
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    setDarkMode();
  } else {
    setLightMode();
  }
}

// Cargar tema cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
  loadTheme();
  
  // También aplicar a iframes y ventanas emergentes
  applyThemeToFrames();
});

// Aplicar tema a elementos embebidos
function applyThemeToFrames() {
  const theme = localStorage.getItem('theme') || 'light';
  const iframes = document.querySelectorAll('iframe');
  
  iframes.forEach(iframe => {
    try {
      iframe.contentWindow.postMessage({
        type: 'THEME_CHANGE',
        theme: theme
      }, '*');
    } catch (e) {
      console.log('No se pudo aplicar tema al iframe:', e);
    }
  });
}

// Escuchar cambios desde otras pestañas
window.addEventListener('storage', function(e) {
  if (e.key === 'theme') {
    if (e.newValue === 'dark') {
      setDarkMode();
    } else {
      setLightMode();
    }
  }
});

// Para comunicación entre iframes
window.addEventListener('message', function(e) {
  if (e.data.type === 'THEME_CHANGE') {
    if (e.data.theme === 'dark') {
      setDarkMode();
    } else {
      setLightMode();
    }
  }
});