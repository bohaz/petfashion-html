/* ═══════════════════════════════════════════
   nav.js — Navbar al hacer scroll, enlace activo y menú móvil
═══════════════════════════════════════════ */
(() => {
  'use strict';

  const SCROLLED_AT = 40;  // px de scroll a partir de los cuales el navbar se compacta
  const SPY_OFFSET  = 120; // px de margen para considerar una sección como "actual"

  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // ── Estado al hacer scroll + enlace activo ─
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  function updateOnScroll() {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > SCROLLED_AT);

    let currentId = '';
    sections.forEach(section => {
      if (scrollY >= section.offsetTop - SPY_OFFSET) currentId = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  // Un solo listener, limitado a una ejecución por frame.
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateOnScroll();
      ticking = false;
    });
  }, { passive: true });

  updateOnScroll();

  // ── Menú móvil ────────────────────────────
  const toggle    = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('nav-mobile');
  if (!toggle || !mobileNav) return;

  function setMobileNav(isOpen) {
    toggle.classList.toggle('open', isOpen);
    mobileNav.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  toggle.addEventListener('click', () => {
    setMobileNav(!mobileNav.classList.contains('open'));
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMobileNav(false));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMobileNav(false);
  });
})();
