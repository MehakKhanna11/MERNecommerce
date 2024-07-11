// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_FIREBASE_KEY),
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDKGdfr4sVsRZJ7_K6trBVfqHcDZxXhdB8",
//   authDomain: "mernecommerce-720c4.firebaseapp.com",
//   projectId: "mernecommerce-720c4",
//   storageBucket: "mernecommerce-720c4.appspot.com",
//   messagingSenderId: "1055933868552",
//   appId: "1:1055933868552:web:d51f74a3eb95267ea2ffbd",
//   // measurementId: "G-8CMYRL542Q"
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth(app);














