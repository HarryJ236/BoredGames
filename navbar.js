// Load navbar and initialize Firebase
document.addEventListener("DOMContentLoaded", function () {
  fetch("/navbar.html")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load navbar");
      return response.text();
    })
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;
      const script = document.createElement("script");
      script.src = "/firebase-init.js";
      document.body.appendChild(script);
    })
    .catch(error => console.error("Navbar load error:", error));
});
