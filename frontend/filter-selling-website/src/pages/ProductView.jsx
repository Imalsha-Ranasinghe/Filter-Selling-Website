import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProductById } from '../services/productService'
import { FaArrowLeft, FaShoppingCart, FaWallet } from 'react-icons/fa'
import Header from './Header'
import { db } from '../firebase' // Import Firebase Firestore
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext' // Assuming you have an auth context
import CustomNotification from './Notification'
import { FiShoppingCart } from 'react-icons/fi'

const ProductView = () => {
  const { id } = useParams()
  const { currentUser } = useAuth() // Get logged-in user
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id)
        setProduct(data)
      } catch (error) {
        console.error(error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getProduct()
  }, [id])

  const handleAddToCart = async () => {
    if (!currentUser) {
      alert('You must be logged in to add items to the cart.')
      return
    }

    try {
      const userCartRef = doc(db, 'users', currentUser.uid) // Reference to the user's document
      const userDoc = await getDoc(userCartRef)

      let cartItems = []
      if (userDoc.exists()) {
        cartItems = userDoc.data().cart || []
      }

      const existingItemIndex = cartItems.findIndex(item => item.id === product.id)

      if (existingItemIndex !== -1) {
        // If product is already in cart, update quantity
        cartItems[existingItemIndex].quantity += quantity
      } else {
        // Otherwise, add new item
        cartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image
        })
      }

      await setDoc(userCartRef, { cart: cartItems }, { merge: true }) // Merge cart updates

      setNotification({
        type: 'success',
        message: 'Product added to the cart successfully',
      });
    } catch (error) {
        setNotification({
            type: 'error',
            message: 'Something went wrong. Please try again.',
          });
      console.error('Error adding to cart:', error)
    }
  }


  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading product...</p>
      </div>
    )
  }

  if (error || !product) {
   
    return (
      <div className="text-center p-8 text-red-500">
        <p>{error || 'Product not found'}</p>
        <a href="/products" className="mt-4 inline-block text-blue-500 hover:underline">
          <FaArrowLeft className="inline mr-2" />
          Back to Products
        </a>
      </div>
    )
  }

  const triggerSuccessNotification = () => {
    setNotification({
      type: 'success',
      message: 'Action was successful!',
    });
  };

  const triggerErrorNotification = () => {
    setNotification({
      type: 'error',
      message: 'Something went wrong. Please try again.',
    });
  };

  const handleCloseNotification = () => {
    setNotification(null); // Hide notification after it's closed
  };

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
                        to="/support"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                      >
                        Support
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
    {/* Conditionally render Notification component */}
    {notification && (
        <CustomNotification
          type={notification.type}
          message={notification.message}
          onClose={handleCloseNotification}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <a href="/products" className="text-blue-500 hover:underline flex items-center mb-6">
            <FaArrowLeft className="mr-2" />
            Back to Products
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                {product.stock > 0 ? (
                  <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="ml-4 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Brand</h4>
                  <p className="text-gray-800">{product.brand}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Category</h4>
                  <p className="text-gray-800 capitalize">{product.category}</p>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 bg-gray-100 border rounded-l-md hover:bg-gray-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-16 text-center border-t border-b"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 bg-gray-100 border rounded-r-md hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleAddToCart}
                 
                  disabled={product.stock === 0}
                  className="flex items-center justify-center gap-2 bg-blue-800 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>

                <Link
                to={`/place-order/${product.id}`}
                  disabled={product.stock === 0}
                  className="flex items-center justify-center gap-2 font-semibold bg-green-700 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <FaWallet />
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductView
