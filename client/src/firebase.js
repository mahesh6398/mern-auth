// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-472d7.firebaseapp.com",
  projectId: "mern-auth-472d7",
  storageBucket: "mern-auth-472d7.appspot.com",
  messagingSenderId: "217674768247",
  appId: "1:217674768247:web:c44dec270eaf7677370b72"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);