import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FaTrash, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import CartOrders from './CartOrders';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

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
    <div>
          <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link
                to={"/home"}
                className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent"
              >
                AquaPure
              </Link>
              <div className="hidden md:flex space-x-8 ml-10">
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Products
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Contact
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  About Us
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <div className="hidden md:flex items-center space-x-8">
                    <Link to={"/cart"}>
                      <FiShoppingCart className="text-xl text-gray-700" />
                    </Link>

                    <button
                      onClick={logout}
                      className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center font-semibold"
                    >
                      Logout
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
   
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
    </div>
  );
}

export default Cart;
