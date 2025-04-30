// Navbar Loader
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
        })
        .catch((error) => console.error("Error loading the navbar:", error));
});
