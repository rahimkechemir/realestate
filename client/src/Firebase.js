// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "rahimestate.firebaseapp.com",
  projectId: "rahimestate",
  storageBucket: "rahimestate.firebasestorage.app",
  messagingSenderId: "214272919561",
  appId: "1:214272919561:web:f88057055011fb1337d0d8",
  measurementId: "G-C2SR5Y3N0X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);