// firebase-init.js
const firebaseConfig = {
  apiKey: "AIzaSyCuekWtRk9TOUuchwgQ_qPZkc_BbJ0rQmQ",
  authDomain: "boredgames-website.firebaseapp.com",
  projectId: "boredgames-website",
  storageBucket: "boredgames-website.firebasestorage.app",
  messagingSenderId: "728925547202",
  appId: "1:728925547202:web:f5a0da6d3df1ab66a7695b",
  measurementId: "G-083HCSVHRF"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Handle navbar username update
firebase.auth().onAuthStateChanged(async (user) => {
  const accountNameElement = document.querySelector(".account-name");
  const logoutButton = document.getElementById("logoutButton");

  if (!accountNameElement) return;

  if (user) {
    if (logoutButton) {
      logoutButton.style.display = "inline-block";
      logoutButton.onclick = () => {
        auth.signOut().then(() => {
          window.location.href = "/pages/registry/registration.html";
        });
      };
    }

    try {
      const doc = await db.collection("users").doc(user.uid).get();
      const username = doc.exists ? doc.data().username : user.email;
      accountNameElement.textContent = username;
    } catch (err) {
      console.error("Error fetching user document:", err);
      accountNameElement.textContent = user.email;
    }
  } else {
    accountNameElement.textContent = "Guest";
    if (logoutButton) logoutButton.style.display = "none";
  }
});
