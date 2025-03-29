import { db } from "../firebase.js";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";

export const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };


  // Fetch a single product by ID
  export const fetchProductById = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);
  
      if (productSnap.exists()) {
        return { id: productSnap.id, ...productSnap.data() };
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };
  