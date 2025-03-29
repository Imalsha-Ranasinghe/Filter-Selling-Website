import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FaTrash, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import CartOrders from './CartOrders';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCartOrder, setShowCartOrder] = useState(false);
  const user = auth.currentUser;
  const { currentUser, logout } = useAuth();

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

  const handleProceedToCheckout = () => {
    setShowCartOrder(true);
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
          className="bg-white rounded-2xl shadow-lg p-6"
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col md:flex-row items-center bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-contain rounded-lg"
                      />
                      <div className="ml-4 flex-1 text-center md:text-left">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.brand}</p>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mt-2">
                          <div className="flex items-center justify-center md:justify-start">
                            <button className="w-8 h-8 bg-gray-200 rounded-md">-</button>
                            <span className="mx-4">{item.quantity}</span>
                            <button className="w-8 h-8 bg-gray-200 rounded-md">+</button>
                          </div>
                          <div className="text-center md:text-right mt-2 md:mt-0">
                            <p className="text-lg font-bold text-blue-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button className="text-red-500 hover:text-red-600 flex items-center mt-1">
                              <FaTrash className="mr-1" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
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
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleProceedToCheckout}
              className="w-full max-w-xs bg-teal-600 font-semibold text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <FaCreditCard className="mr-2" />
              Proceed to Checkout
            </button>
          </div>
        </motion.div>
        {showCartOrder && <div className="mt-8"><CartOrders /></div>}
      </div>
    </div>
  );
}

export default Cart;
