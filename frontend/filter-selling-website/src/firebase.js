// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFnhSqaYmMsAOND-JAo-Wj-_YCf14vvUA",
  authDomain: "filter-selling-website-f7ccf.firebaseapp.com",
  projectId: "filter-selling-website-f7ccf",
  storageBucket: "filter-selling-website-f7ccf.firebasestorage.app",
  messagingSenderId: "1068747553499",
  appId: "1:1068747553499:web:49528ea198e54058142afe",
//   measurementId: "G-SCM6CX36M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);