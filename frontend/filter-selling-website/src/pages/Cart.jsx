import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FaTrash, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setCart(userDoc.data().cart || []);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCart();
  }, [user]);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const removeItem = async (itemId) => {
    // Remove item from cart
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);

    // Update cart in Firestore
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { cart: updatedCart });
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    // Prevent quantity from going below 1
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);

    // Update cart in Firestore
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { cart: updatedCart });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center mb-6">
            <FaShoppingCart className="text-3xl text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
              <button 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => window.history.back()}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-contain rounded-lg"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.brand}</p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="mx-4">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-600 flex items-center mt-1"
                            >
                              <FaTrash className="mr-1" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal ({cart.length} items)</span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                  

                    <hr className="my-4" />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${(parseFloat(calculateTotal()) ).toFixed(2)}</span>
                    </div>

                    <button className="w-full bg-teal-600 font-semibold text-white py-3 rounded-lg mt-6
                      hover:bg-green-700 transition-colors flex items-center justify-center">
                      <FaCreditCard className="mr-2" />
                      Proceed to Checkout
                    </button>

                    
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Cart;
