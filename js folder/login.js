document.addEventListener('DOMContentLoaded', () => {
  const loginFormModal = document.getElementById('login-form-modal');
  const loginIcon = document.getElementById('login-icon');

  // Modal functions
  window.showLoginForm = function() {
      if (loginFormModal) loginFormModal.style.display = 'block';
  };

  window.closeLoginForm = function() {
      if (loginFormModal) loginFormModal.style.display = 'none';
  };

  window.addEventListener('click', (event) => {
      if (loginFormModal && event.target === loginFormModal) {
          loginFormModal.style.display = 'none';
      }
  });

  // Login icon redirect
  if (loginIcon) {
      loginIcon.addEventListener('click', () => {
          window.location.href = 'login.html';
      });
  }
});
