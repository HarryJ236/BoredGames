// Firebase Config
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

// Sign-Up Function
function signUp() {
  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (!username || !email || !password) {
    document.getElementById("signupStatus").textContent = "Please fill out all fields.";
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Save username to Firestore
      return db.collection("users").doc(user.uid).set({
        username: username,
        email: user.email
      });
    })
    .then(() => {
      document.getElementById("signupStatus").textContent = "Account created successfully.";
    })
    .catch((error) => {
      document.getElementById("signupStatus").textContent = "Error: " + error.message;
    });
}

// Log-In Function
function logIn() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    document.getElementById("loginStatus").textContent = "Please fill out both fields.";
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("loginStatus").textContent = "Logged in as " + user.email;
    })
    .catch((error) => {
      document.getElementById("loginStatus").textContent = "Login error: " + error.message;
    });
}

// Toggle between forms
function toggleForm(formType) {
  document.getElementById("signUpForm").style.display = formType === 'signup' ? 'block' : 'none';
  document.getElementById("loginForm").style.display = formType === 'signup' ? 'none' : 'block';
}

auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Logged in as " + user.email);
  } else {
    console.log("User logged out.");
  }
});
