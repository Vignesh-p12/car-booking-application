// src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Correct Firebase configuration for your project
const firebaseConfig = {
  apiKey: "AIzaSyCpCZU-VLH3xjGgN-hVjZduTR1QgQX_d8c",
  authDomain: "carss-97ece.firebaseapp.com",
  projectId: "carss-97ece",
  storageBucket: "carss-97ece.appspot.com", // ✅ Corrected from .app to .appspot.com
  messagingSenderId: "186958781321",
  appId: "1:186958781321:web:ba9dbd33ee115cdf5a1f58",
  measurementId: "G-3HBZB0JRPX"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
