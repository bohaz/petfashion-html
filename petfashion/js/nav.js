/* ═══════════════════════════════════════════
   nav.js — Scroll navbar + menú móvil
═══════════════════════════════════════════ */

// ── Scroll state ──────────────────────────
const navbar      = document.getElementById('navbar');
const locationBar = document.querySelector('.nav-location-bar');

function onScroll() {
  const scrolled = window.scrollY > 40;
  navbar.classList.toggle('scrolled', scrolled);
  if (locationBar) locationBar.style.top = scrolled ? '52px' : '68px';
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

// ── Active link highlight ─────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'rgba(228,179,85,1)'
      : '';
  });
}, { passive: true });

// ── Mobile menu ───────────────────────────
const toggle      = document.querySelector('.nav-toggle');
const mobileNav   = document.getElementById('nav-mobile');
const mobileLinks = mobileNav.querySelectorAll('a');

function closeMobileNav() {
  toggle.classList.remove('open');
  mobileNav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

toggle.addEventListener('click', () => {
  const isOpen = toggle.classList.toggle('open');
  mobileNav.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileNav();
});