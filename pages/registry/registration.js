document.addEventListener("DOMContentLoaded", () => {
  const signUp = () => {
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!email || !password || !username) {
      document.getElementById("signupStatus").textContent = "Fill all fields.";
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        return firebase.firestore().collection("users").doc(userCredential.user.uid).set({ username });
      })
      .then(() => {
        document.getElementById("signupStatus").textContent = "Signed up successfully!";
      })
      .catch(error => {
        document.getElementById("signupStatus").textContent = error.message;
      });
  };

  const logIn = () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      document.getElementById("loginStatus").textContent = "Enter email and password.";
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        document.getElementById("loginStatus").textContent = "Login successful!";
        window.location.href = "/index.html";
      })
      .catch(error => {
        document.getElementById("loginStatus").textContent = error.message;
      });
  };

  const toggleForm = (form) => {
    document.getElementById("signUpForm").style.display = form === "signup" ? "block" : "none";
    document.getElementById("loginForm").style.display = form === "login" ? "block" : "none";
  };

  // Expose functions to global scope
  window.signUp = signUp;
  window.logIn = logIn;
  window.toggleForm = toggleForm;
});
