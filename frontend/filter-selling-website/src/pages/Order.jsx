import React, { useState } from "react";

const Order = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    file: null,
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.file) {
      alert("Please upload the banking slip to proceed.");
      return;
    }
    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Confirm Your Order
        </h2>

        {!orderPlaced ? (
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
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

            {/* Email */}
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

            {/* Address */}
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

            {/* Manual Banking Slip Upload */}
            <div>
              <label className="block text-gray-700 font-medium">
                Upload Banking Slip
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Place Order
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-green-600">
              🎉 Order Placed Successfully!
            </h3>
            <p className="text-gray-700 mt-2">
              Your order has been confirmed. We will verify your payment and
              process your order soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
