// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFnhSqaYmMsAOND-JAo-Wj-_YCf14vvUA",
  authDomain: "filter-selling-website-f7ccf.firebaseapp.com",
  projectId: "filter-selling-website-f7ccf",
  storageBucket: "filter-selling-website-f7ccf.appspot.com", // Corrected
  messagingSenderId: "1068747553499",
  appId: "1:1068747553499:web:49528ea198e54058142afe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
const user = auth.currentUser;
const userId = user ? user.uid : null; 
console.log("Current User ID:", userId); // Log the user ID for debugging
export const db = getFirestore(app);
export const storage = getStorage(app);
