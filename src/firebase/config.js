// require("dotenv").config();

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECTID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
//   appId: process.env.FIREBASE_APPID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDu2xr12WXaRo3O0jTLPfhaLXuzn5NWtm4",
  authDomain: "stockmarketlive-e71dc.firebaseapp.com",
  projectId: "stockmarketlive-e71dc",
  storageBucket: "stockmarketlive-e71dc.appspot.com",
  messagingSenderId: "851409949610",
  appId: "1:851409949610:web:51d293150bacc081f991d3",
  measurementId: "G-Y0GZQZ8R1W",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
