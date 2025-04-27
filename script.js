// Functionality for Navbar Buttons
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-button");

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      const link = button.dataset.link; // Get the link from data-link attribute
      window.location.href = link; // Navigate to the link
    });
  });
});
