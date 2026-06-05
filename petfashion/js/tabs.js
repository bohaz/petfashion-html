/* ═══════════════════════════════════════════
   tabs.js — Catálogo de precios
═══════════════════════════════════════════ */

const catTabs   = document.querySelectorAll('.cat-tab');
const catPanels = document.querySelectorAll('.cat-panel');
const addonsWrap = document.querySelector('.cat-addons-wrap');

// Tabs donde los complementarios son relevantes
const TABS_WITH_ADDONS = ['corte-bano', 'mantenimiento', 'unas'];

function activateTab(tabId) {
  // Alias: "bano" apuntaba al tab antiguo — redirigir a "mantenimiento"
  if (tabId === 'bano') tabId = 'mantenimiento';

  catTabs.forEach(tab => {
    const isActive = tab.dataset.tab === tabId;
    tab.classList.toggle('cat-tab--active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  catPanels.forEach(panel => {
    const isActive = panel.id === `tab-${tabId}`;
    panel.classList.toggle('cat-panel--active', isActive);
    isActive ? panel.removeAttribute('hidden') : panel.setAttribute('hidden', '');

    if (isActive) {
      panel.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 60);
      });
    }
  });

  // Mostrar/ocultar sección de complementarios según tab activo
  if (addonsWrap) {
    const showAddons = TABS_WITH_ADDONS.includes(tabId);
    addonsWrap.hidden = !showAddons;
    if (showAddons) {
      addonsWrap.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 80);
      });
    }
  }
}

catTabs.forEach(tab => {
  tab.addEventListener('click', () => activateTab(tab.dataset.tab));
});

document.querySelectorAll('.service-link[data-tab]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    activateTab(link.dataset.tab);
    const pricingSection = document.getElementById('precios');
    if (pricingSection) {
      setTimeout(() => {
        window.scrollTo({
          top: pricingSection.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }, 50);
    }
  });
});