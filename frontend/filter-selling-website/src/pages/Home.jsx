import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Products from "./Products";

export default function Home() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link
                to={"/"}
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
                  <div className="hidden md:flex items-center space-x-2">
                    <span className="text-gray-600">
                      Welcome, {currentUser.email}
                    </span>
                    <button
                      onClick={logout}
                      className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl text-white p-8 mb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Premium Water Filtration Systems
            </h1>
            <p className="text-xl mb-6">
              Experience crystal-clear water with NSF certified filters
            </p>
            <Link
              to="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Shop Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Featured Products */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Best Selling Filters
          </h2>
          <Products />
        </section>

        {/* Features Section */}
        <section className="bg-white rounded-xl shadow-md p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                💧
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Advanced Filtration
              </h3>
              <p className="text-gray-600">
                NSF certified removal of 99.9% contaminants
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                ⏳
              </div>
              <h3 className="text-xl font-semibold mb-2">Long Lasting</h3>
              <p className="text-gray-600">
                6-month filter lifespan with usage tracking
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                🛡️
              </div>
              <h3 className="text-xl font-semibold mb-2">10-Year Warranty</h3>
              <p className="text-gray-600">
                Industry-leading protection guarantee
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-gray-600 mb-4">
                "The best water filtration system we've ever used. Noticeable
                difference in water taste!"
              </p>
              <div className="flex items-center">
                <img
                  src="/customer-1.jpg"
                  alt="Customer"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-gray-600 text-sm">Homeowner</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-gray-600 mb-4">
                "Easy installation and amazing customer support. Highly
                recommend!"
              </p>
              <div className="flex items-center">
                <img
                  src="/customer-2.jpg"
                  alt="Customer"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-gray-600 text-sm">Restaurant Owner</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img
                src="/logo-white.png"
                alt="AquaPure Filters"
                className="h-12 mb-4"
              />
              <p className="text-gray-400">
                Clean water solutions for homes and businesses
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/filters"
                    className="text-gray-400 hover:text-white"
                  >
                    Water Filters
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accessories"
                    className="text-gray-400 hover:text-white"
                  >
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/replacements"
                    className="text-gray-400 hover:text-white"
                  >
                    Replacements
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/installation"
                    className="text-gray-400 hover:text-white"
                  >
                    Installation Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/warranty"
                    className="text-gray-400 hover:text-white"
                  >
                    Warranty
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                {/* Add other social icons */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 AquaPure Filters. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-6">
              <img
                src="/nsf-certified-white.png"
                alt="NSF Certified"
                className="h-8"
              />
              <img
                src="/epa-approved-white.png"
                alt="EPA Approved"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
