// require("dotenv").config();

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDu2xr12WXaRo3O0jTLPfhaLXuzn5NWtm4",
  authDomain: "stockmarketlive-e71dc.firebaseapp.com",
  projectId: "stockmarketlive-e71dc",
  storageBucket: "stockmarketlive-e71dc.appspot.com",
  messagingSenderId: "851409949610",
  appId: "1:851409949610:web:51d293150bacc081f991d3",
  measurementId: "G-Y0GZQZ8R1W",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
