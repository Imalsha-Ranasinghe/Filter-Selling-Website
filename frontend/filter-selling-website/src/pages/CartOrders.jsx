import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { FaFileUpload, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

const CartOrder = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    paymentSlip: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      paymentSlip: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission (you can integrate this with Firestore)
    console.log('Order Details:', formData);
    setIsSubmitted(true);
    // Redirect or show confirmation
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-12">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Confirm Your Order</h1>

          {isSubmitted ? (
            <div className="text-center p-6 bg-green-100 border border-green-300 rounded-xl">
              <FaCheckCircle className="text-4xl text-green-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800">Order Confirmed!</h2>
              <p className="text-gray-600 mt-2">Thank you for your order! You will receive an email confirmation shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label className="block text-gray-700 font-medium">Upload Payment Slip</label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  required
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-200"
                />
              </div>

              <button type="submit" className="w-full bg-blue-800 font-semibold text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Place Order
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartOrder;
