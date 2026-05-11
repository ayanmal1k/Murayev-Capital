import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA77eTagxG89rWJTBFoqXzcsg8jcEnDs5Q",
  authDomain: "murayev-capital-2026.firebaseapp.com",
  projectId: "murayev-capital-2026",
  storageBucket: "murayev-capital-2026.firebasestorage.app",
  messagingSenderId: "196928144635",
  appId: "1:196928144635:web:72f676caba231ccc0e9c5e"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
