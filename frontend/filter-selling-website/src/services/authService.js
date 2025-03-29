import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";

export const handleSignUp = async (email, password, fullName) => {
  try {
    // 1. Create auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // 2. Create user document in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: email,
      
      lastLogin: null
    });

    console.log("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw for error handling in UI
  }
};