// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5htRsR70PqMCLHnK0YlXrC_U6_PnJkoU",
  authDomain: "habits-81742.firebaseapp.com",
  projectId: "habits-81742",
  storageBucket: "habits-81742.appspot.com", // Corrected storage bucket URL
  messagingSenderId: "679242921526",
  appId: "1:679242921526:web:d076187e8d66ce3b0d0a97",
  measurementId: "G-SNVZET73YP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };