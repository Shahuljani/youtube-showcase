// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0gD6HRZwl4pU-5QSwn-EcjkGHTvhY8Ac",
  authDomain: "yoursmedia-2a769.firebaseapp.com",
  projectId: "yoursmedia-2a769",
  storageBucket: "yoursmedia-2a769.firebasestorage.app",
  messagingSenderId: "980480631442",
  appId: "1:980480631442:web:67c66aea8d5877570d3c4b",
  measurementId: "G-F6P9JR0TXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);