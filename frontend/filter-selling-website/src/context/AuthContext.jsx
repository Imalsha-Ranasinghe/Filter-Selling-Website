import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // Import Firestore instance
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove } from 'firebase/firestore'; // Add Firestore imports

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, additionalData = {}) {
    try {
      // 1. Create auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Create user document in Firestore with empty cart and orders arrays
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        createdAt: serverTimestamp(),
        cart: [], // Initialize an empty cart array
        orders: [], // Initialize an empty orders array
        ...additionalData
      });

      return userCredential;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  async function updateUserProfile(updates) {
    if (!currentUser) throw new Error('No authenticated user');
    
    try {
      // Update Firestore document
      await setDoc(doc(db, 'users', currentUser.uid), updates, { merge: true });
      
      // Update auth user if needed (example: displayName)
      if (updates.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: updates.displayName
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  }

  // Add cart-related functions here
  async function addToCart(productId, name, price, quantity) {
    if (!currentUser) throw new Error('No authenticated user');
    
    const cartItem = { productId, name, price, quantity };

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        cart: arrayUnion(cartItem) // Add item to the cart array
      });
      console.log('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }

  async function removeFromCart(productId) {
    if (!currentUser) throw new Error('No authenticated user');
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        cart: arrayRemove({ productId })
      });
      console.log('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  }

  async function checkout() {
    if (!currentUser) throw new Error('No authenticated user');
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const cartItems = userData.cart;

        // Add cart items to orders array
        await updateDoc(userRef, {
          orders: arrayUnion(...cartItems), // Spread to add each cart item to orders
          cart: [] // Clear the cart after checkout
        });

        console.log('Checkout successful');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setCurrentUser({
          ...user,
          ...userDoc.data()
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateUserProfile,
    addToCart,
    removeFromCart,
    checkout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
