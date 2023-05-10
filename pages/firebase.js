import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const API_KEY = process.env.REACT_APP_API_KEY;
const SENDER_ID = process.env.REACT_APP_SENDER_ID;
const APP_ID = process.env.REACT_APP_ID;
const APP_DOMAIN = process.env.REACT_APP_AUTHDOMAIN;
const APP_STORAGEBUCKET = process.env.REACT_APP_STORAGEBUCKET;
const PROJECTID = process.env.REACT_APP_PROJECTID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: APP_DOMAIN,
  projectId: PROJECTID,
  storageBucket: APP_STORAGEBUCKET,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
