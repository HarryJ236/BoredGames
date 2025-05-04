// Load Navbar HTML and initialize Firebase logic
document.addEventListener("DOMContentLoaded", function () {
  fetch("/navbar.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load navbar");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;

      // Now load Firebase logic after navbar is in DOM
      const script = document.createElement("script");
      script.src = "/firebase-init.js";
      document.body.appendChild(script);
    })
    .catch((error) => console.error("Error loading the navbar:", error));
});
