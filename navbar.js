// navbar.js
document.addEventListener("DOMContentLoaded", async function () {
  const navbarContainer = document.getElementById("navbar-container");

  try {
    const response = await fetch("/navbar.html");
    if (!response.ok) throw new Error("Failed to load navbar");
    const html = await response.text();
    navbarContainer.innerHTML = html;

    // Firebase logic after navbar has loaded
    firebase.auth().onAuthStateChanged(async (user) => {
      const accountNameElement = document.querySelector(".account-name");
      if (user) {
        try {
          const userDoc = await firebase.firestore().collection("users").doc(user.uid).get();
          if (userDoc.exists) {
            const username = userDoc.data().username;
            accountNameElement.textContent = username || user.email;
          } else {
            accountNameElement.textContent = user.email;
          }
        } catch (err) {
          console.error("Error fetching user document:", err);
          accountNameElement.textContent = user.email;
        }
      } else {
        accountNameElement.textContent = "Guest";
      }
    });
  } catch (error) {
    console.error("Error loading the navbar:", error);
  }
});
