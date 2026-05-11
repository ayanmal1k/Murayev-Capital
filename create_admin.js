import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA77eTagxG89rWJTBFoqXzcsg8jcEnDs5Q",
  authDomain: "murayev-capital-2026.firebaseapp.com",
  projectId: "murayev-capital-2026",
  storageBucket: "murayev-capital-2026.firebasestorage.app",
  messagingSenderId: "196928144635",
  appId: "1:196928144635:web:72f676caba231ccc0e9c5e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function createAdmin() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, "admin@murayev.com", "Admin123!");
    console.log("Admin user created successfully:", userCredential.user.email);
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log("Admin user already exists.");
      process.exit(0);
    }
    console.error("Error creating user:", error);
    process.exit(1);
  }
}

createAdmin();
