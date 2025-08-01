// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment, collection, getDocs } from "firebase/firestore";

// 🔒 Usa tus propias credenciales desde Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyA9iyH_Mgho_vY-Fp_FCQrPYGLjlVdyOig",
  authDomain: "medvoxel-d1249.firebaseapp.com",
  projectId: "medvoxel-d1249",
  storageBucket: "medvoxel-d1249.firebasestorage.app",
  messagingSenderId: "1011407582358",
  appId: "1:1011407582358:web:6acf9e3916b9348984feb7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, db, setDoc, doc, getDoc, updateDoc, increment, collection, getDocs };
