import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import { FaSpinner, FaFilter, FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "./Header";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    const filtered = selectedCategory === "All" 
      ? products 
      : products.filter((p) => p.category === selectedCategory);
    setFilteredProducts(filtered);
    handleSortChange(sortOrder, filtered); // Maintain current sort order
  };

  const handleSortChange = (order, productsToSort = filteredProducts) => {
    setSortOrder(order);
    const sortedProducts = [...productsToSort].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sortedProducts);
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto" />
        <p className="mt-2 text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
<div>


    <div className="container mx-auto p-4 lg:p-6">
  
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-center">
        Explore Our Products
      </h1>

      {/* Controls Container */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaFilter className="text-gray-500" />
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="p-2 border rounded-lg bg-white font-semibold w-full md:w-48 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          >
            <option value="All">All Categories</option>
            <option value="Home">Home</option>
            <option value="Office">Office</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>

        <div className="flex items-center font-semibold gap-2 w-full md:w-auto">
          <FaSortAmountDown className="text-gray-500" />
          <select
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
            className="p-2 border rounded-lg bg-white w-full md:w-48 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">No products found in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-gray-900">${product.price}</p>
                  <Link to={`/product/${product.id}`} className="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-200">
                    View Filter
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Products;