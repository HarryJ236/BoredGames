// Navbar Loader
document.addEventListener("DOMContentLoaded", function () {
  fetch("/navbar.html")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load navbar");
      return response.text();
    })
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;

      // Firebase setup
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase.firestore().collection("users").doc(user.uid).get()
            .then(doc => {
              if (doc.exists) {
                const username = doc.data().username || user.email;
                const usernameSpan = document.getElementById("navbarUsername");
                if (usernameSpan) {
                  usernameSpan.textContent = username;
                }
              }
            })
            .catch(err => console.error("Failed to fetch username:", err));
        }
      });
    })
    .catch(error => console.error("Error loading the navbar:", error));
});
