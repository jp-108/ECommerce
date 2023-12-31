import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoYoxaW6ICXO27cSQ5yFUjhMCW96fkTZA",
  authDomain: "e-commerce-108.firebaseapp.com",
  projectId: "e-commerce-108",
  storageBucket: "e-commerce-108.appspot.com",
  messagingSenderId: "879368884104",
  appId: "1:879368884104:web:1ba6cf8fb90be13c15743d",
  measurementId: "G-3D052P7PDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)
