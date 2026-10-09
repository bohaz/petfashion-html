/* ═══════════════════════════════════════════
   faq.js — Acordeón de preguntas frecuentes
   Solo una respuesta abierta a la vez.
═══════════════════════════════════════════ */
(() => {
  'use strict';

  const questions = document.querySelectorAll('.faq-question');

  function closeItem(item) {
    item.classList.remove('open');
    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  }

  questions.forEach(button => {
    button.addEventListener('click', () => {
      const item    = button.closest('.faq-item');
      const wasOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(closeItem);

      if (!wasOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
