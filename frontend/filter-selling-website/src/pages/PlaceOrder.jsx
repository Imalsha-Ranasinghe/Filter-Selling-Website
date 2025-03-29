import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import Header from "./Header";
import { useAuth } from "../context/AuthContext";

const PlaceOrder = () => {
  const { id } = useParams();
  const {currentUser} = useAuth(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <a href="/products" className="mt-4 inline-block text-blue-500 hover:underline">
          <FaArrowLeft className="inline mr-2" />
          Back to Products
        </a>
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
              <p className="text-sm text-gray-500 mt-1">Stock: {product.stock > 0 ? "Available" : "Out of Stock"}</p>
            </div>
          </div>

          {/* Confirm Order Button */}
          <Link to={`/order/${id}`} 
            className="mt-6 w-full flex items-center justify-center gap-2 bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition duration-200"
          >
            <FaCheckCircle />
            Confirm Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
