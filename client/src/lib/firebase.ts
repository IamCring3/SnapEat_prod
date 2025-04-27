// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzwVTCkbbzY7disGMLqzwN9_r5znNLzNM",
  authDomain: "snapeat-2288d.firebaseapp.com",
  projectId: "snapeat-2288d",
  storageBucket: "snapeat-2288d.firebasestorage.app",
  messagingSenderId: "567797575571",
  appId: "1:567797575571:web:b44e2b034dc0a7fd510266",
  measurementId: "G-C3YVWELGN6"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
