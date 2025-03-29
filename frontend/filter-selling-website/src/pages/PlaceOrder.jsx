import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { fetchProductById } from "../services/productService";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Header from "./Header";

const PlaceOrder = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    bankSlip: null,
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, bankSlip: e.target.files[0] });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("You must be logged in to place an order.");
      return;
    }

    if (!formData.bankSlip) {
      alert("Please upload a bank slip.");
      return;
    }

    setUploading(true);

    try {
      // Upload bank slip to Firebase Storage
      const storageRef = ref(storage, `bankSlips/${currentUser.uid}/${formData.bankSlip.name}`);
      const uploadTask = uploadBytesResumable(storageRef, formData.bankSlip);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed", error);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Create order object
          const newOrder = {
            productId: id,
            productName: product.name,
            productImage: product.image,
            price: product.price,
            fullName: formData.fullName,
            email: formData.email,
            address: formData.address,
            bankSlipURL: downloadURL,
            orderDate: new Date().toISOString(),
            status: "Pending",
          };

          // Add order to Firestore inside user's orders array
          const userRef = doc(db, "users", currentUser.uid);
          await updateDoc(userRef, {
            orders: arrayUnion(newOrder),
          });

          alert("Order placed successfully!");
          navigate("/orders");
        }
      );
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Try again.");
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center p-8 text-red-500">
        <p>{error || "Product not found"}</p>
        <Link to="/products" className="mt-4 inline-block text-blue-500 hover:underline">
          <FaArrowLeft className="inline mr-2" />
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Review Your Order</h1>

          {/* Product Info */}
          <div className="flex flex-col md:flex-row gap-6">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full md:w-1/3 h-60 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-lg font-bold text-blue-600 mt-4">${product.price}</p>
              <p className="text-sm text-gray-500 mt-1">
                Stock: {product.stock > 0 ? "Available" : "Out of Stock"}
              </p>
            </div>
          </div>

          {/* Order Form */}
          <form className="mt-6 space-y-4" onSubmit={handlePlaceOrder}>
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Upload Banking Slip</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-200"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-3 rounded-lg text-white font-semibold ${
                uploading ? "bg-gray-400" : "bg-green-700 hover:bg-green-600 transition"
              }`}
            >
              {uploading ? "Placing Order..." : "Confirm Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
