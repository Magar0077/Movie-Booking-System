// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQoy4w_zFIdfcLFj6WNFhEOg66TKSpwPk",
  authDomain: "movie-booking-3773e.firebaseapp.com",
  projectId: "movie-booking-3773e",
  storageBucket: "movie-booking-3773e.firebasestorage.app",
  messagingSenderId: "658550727643",
  appId: "1:658550727643:web:7808d1f234e010bb267dfe",
  measurementId: "G-GBH7H39WDX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ ADD THIS
export const auth = getAuth(app);

// (optional – analytics only works on https or production)
export const analytics = getAnalytics(app);
