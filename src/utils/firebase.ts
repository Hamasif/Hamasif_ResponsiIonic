// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCD48RkWDyYH8Ot7FlflckyTyCQHJNk63Q",
    authDomain: "vue-firebase-6b1a3.firebaseapp.com",
    projectId: "vue-firebase-6b1a3",
    storageBucket: "vue-firebase-6b1a3.firebasestorage.app",
    messagingSenderId: "884345052115",
    appId: "1:884345052115:web:43c86292d60b03f4146d26",
  };

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebase);

export { auth, googleProvider, db };
