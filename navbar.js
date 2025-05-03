document.addEventListener("DOMContentLoaded", function () {
  fetch("/navbar.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load navbar");
      return response.text();
    })
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;

      // Initialize Firebase if it isn't already
      if (!firebase.apps.length) {
        const firebaseConfig = {
          apiKey: "AIzaSyCuekWtRk9TOUuchwgQ_qPZkc_BbJ0rQmQ",
          authDomain: "boredgames-website.firebaseapp.com",
          projectId: "boredgames-website",
        };
        firebase.initializeApp(firebaseConfig);
      }

      const auth = firebase.auth();
      const db = firebase.firestore();

      auth.onAuthStateChanged((user) => {
        if (user) {
          db.collection("users").doc(user.uid).get()
            .then((doc) => {
              if (doc.exists) {
                const username = doc.data().username || user.email;
                const usernameSpan = document.getElementById("navbarUsername");
                if (usernameSpan) usernameSpan.textContent = username;
              }
            })
            .catch((error) => console.error("Error fetching user data:", error));
        }
      });
    })
    .catch((error) => console.error("Error loading the navbar:", error));
});
