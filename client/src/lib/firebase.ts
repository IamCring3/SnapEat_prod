// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUn4hyFh0B7Dc9xr11rSG-N8hDFKg1TvU",
  authDomain: "snapeat-b583a.firebaseapp.com",
  projectId: "snapeat-b583a",
  storageBucket: "snapeat-b583a.firebasestorage.app",
  messagingSenderId: "378794431847",
  appId: "1:378794431847:web:bc48380ee36b17635e8bc2",
  measurementId: "G-JHSFB9Z5HM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
