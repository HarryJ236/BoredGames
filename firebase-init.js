// firebase-init.js (all pages will refer to this for connection to firebase)
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

const doc = await db.collection("users").doc(user.uid).get();
const username = doc.exists ? doc.data().username : user.email;
accountNameElement.textContent = username;
