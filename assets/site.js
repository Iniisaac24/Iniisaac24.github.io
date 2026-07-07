/* ─────────────────────────────────────────────────────────
   site.js — single source of truth for identity + shared behaviour.
   Change YOUR details in ONE place (SITE below) and every page,
   nav, and footer updates automatically.
   ───────────────────────────────────────────────────────── */

const SITE = {
  name:     'Ini Isaac Aniefiok',
  email:    'iniisaac20@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ini-isaac-a961b022a',
  github:   'https://github.com/Iniisaac24',
};

(function () {
  // Relative prefix: detail pages set <body data-base="..">
  const base = document.body.getAttribute('data-base') || '.';

  // 1. Identity text (nav logo, any [data-site-name])
  document.querySelectorAll('[data-site-name]').forEach(el => {
    const prefix = el.getAttribute('data-site-name');            // e.g. "← " or ""
    el.textContent = (prefix || '') + SITE.name;
  });

  // 2. Footer — rendered from SITE so it never drifts between pages
  const foot = document.getElementById('site-footer');
  if (foot) {
    foot.innerHTML =
      '<small>© ' + (new Date().getFullYear()) + ' ' + SITE.name + '</small>' +
      '<div class="f-links">' +
        '<a href="' + SITE.github + '" target="_blank" rel="noopener">GitHub</a>' +
        '<a href="' + SITE.linkedin + '" target="_blank" rel="noopener">LinkedIn</a>' +
        '<a href="mailto:' + SITE.email + '">Email</a>' +
      '</div>';
  }

  // 3. Email / linkedin / github links elsewhere on the page
  document.querySelectorAll('[data-site-email]').forEach(a => { a.href = 'mailto:' + SITE.email; });
  document.querySelectorAll('[data-site-linkedin]').forEach(a => { a.href = SITE.linkedin; });
  document.querySelectorAll('[data-site-github]').forEach(a => { a.href = SITE.github; });

  // 4. Nav shadow on scroll
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // 5. Theme toggle (persisted in localStorage; initial theme set inline in <head>)
  const toggle = document.getElementById('themeToggle');
  const hljs = document.getElementById('hljs-theme');
  const syncHljs = (theme) => {
    if (!hljs) return;
    hljs.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/' +
      (theme === 'dark' ? 'github-dark.min.css' : 'github.min.css');
  };
  syncHljs(document.documentElement.getAttribute('data-theme'));
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      syncHljs(next);
    });
  }
})();
