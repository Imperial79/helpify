// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "helpify-3a458.firebaseapp.com",
  projectId: "helpify-3a458",
  storageBucket: "helpify-3a458.appspot.com",
  messagingSenderId: "1050731531547",
  appId: "1:1050731531547:web:776a4b5239d420471797be",
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);
export const firebaseApp = getFirestore(db);
