// Load the navbar and set up auth username
document.addEventListener("DOMContentLoaded", function () {
  fetch("/navbar.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load navbar");
      return response.text();
    })
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;

      // After loading navbar, set username if logged in
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.firestore().collection("users").doc(user.uid).get()
            .then((doc) => {
              if (doc.exists) {
                const username = doc.data().username || user.email;
                const usernameSpan = document.getElementById("navbarUsername");
                if (usernameSpan) {
                  usernameSpan.textContent = username;
                }
              }
            })
            .catch((error) => {
              console.error("Failed to fetch username:", error);
            });
        }
      });
    })
    .catch((error) => console.error("Error loading the navbar:", error));
});
