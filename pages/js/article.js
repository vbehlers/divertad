
document.addEventListener('DOMContentLoaded', function () {
  function openModal(modal) {
    if (modal) modal.style.display = 'flex';
  }

  function closeModal(modal) {
    if (modal) modal.style.display = 'none';
  }

  function bindIn(root = document) {
    // Bind openers
    root.querySelectorAll('[data-modal-target]').forEach((btn) => {
      if (btn.dataset.modalBound === 'true') return;
      btn.dataset.modalBound = 'true';
      btn.addEventListener('click', () => {
        const sel = btn.getAttribute('data-modal-target');
        const modal = sel ? document.querySelector(sel) : null;
        openModal(modal);
      });
    });

    // Bind closers
    root.querySelectorAll('[data-modal-close]').forEach((btn) => {
      if (btn.dataset.modalBound === 'true') return;
      btn.dataset.modalBound = 'true';
      btn.addEventListener('click', () => {
        const modal = btn.closest('.fixed');
        closeModal(modal);
      });
    });

    // Bind overlay click-to-close
    root.querySelectorAll('.fixed').forEach((modal) => {
      if (modal.dataset.modalBound === 'true') return;
      modal.dataset.modalBound = 'true';
      modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal(modal);
      });
    });
  }

  // Initial bind
  bindIn(document);

  // Re-bind after HTML includes load
  document.addEventListener('includes:loaded', () => bindIn(document));
});

