/* ═══════════════════════════════════════════
   tabs.js — Catálogo de precios

   Cada botón `.cat-tab[data-tab="x"]` muestra el panel `#tab-x`.
   Los paneles con el atributo `data-has-addons` muestran además el bloque
   de servicios adicionales. Para agregar un servicio basta con sumar el
   botón y su panel en el HTML; este archivo no necesita cambios.
═══════════════════════════════════════════ */
(() => {
  'use strict';

  const REVEAL_DELAY_MS = 60;

  const tabs       = document.querySelectorAll('.cat-tab');
  const panels     = document.querySelectorAll('.cat-panel');
  const addonsWrap = document.querySelector('.cat-addons-wrap');
  if (!tabs.length) return;

  // Los elementos dentro de un panel oculto nunca disparan el observer de
  // main.js, así que se revelan a mano cuando el panel se muestra.
  function revealPending(root) {
    root.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      setTimeout(() => el.classList.add('visible'), REVEAL_DELAY_MS);
    });
  }

  function activateTab(tabId) {
    let activePanel = null;

    tabs.forEach(tab => {
      const isActive = tab.dataset.tab === tabId;
      tab.classList.toggle('cat-tab--active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    panels.forEach(panel => {
      const isActive = panel.id === `tab-${tabId}`;
      panel.classList.toggle('cat-panel--active', isActive);
      panel.hidden = !isActive;
      if (isActive) activePanel = panel;
    });

    if (!activePanel) return;
    revealPending(activePanel);

    if (addonsWrap) {
      const showAddons = activePanel.hasAttribute('data-has-addons');
      addonsWrap.hidden = !showAddons;
      if (showAddons) revealPending(addonsWrap);
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });

  // Enlaces "Ver precios" de las tarjetas de servicio y opciones de la guía
  // "¿Cuándo fue su último corte?": abren su tab.
  // El scroll hacia #precios lo resuelve el handler de anclas de main.js.
  document.querySelectorAll('.service-link[data-tab], .cat-guide-item[data-tab]').forEach(link => {
    link.addEventListener('click', () => activateTab(link.dataset.tab));
  });
})();
