// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQoy4w_zFIdfcLFj6WNFhEOg66TKSpwPk",
  authDomain: "movie-booking-3773e.firebaseapp.com",
  projectId: "movie-booking-3773e",
  storageBucket: "movie-booking-3773e.firebasestorage.app",
  messagingSenderId: "658550727643",
  appId: "1:658550727643:web:7808d1f234e010bb267dfe",
  measurementId: "G-GBH7H39WDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);