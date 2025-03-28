import React from 'react';
import Header from './Header';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiSearch, FiChevronDown, FiStar } from 'react-icons/fi';

const Welcome = () => {
  return (
    <div>
      {/* Header should be self-closing */}
      <Header />
      
      

      {/* Hero Section */}
      <section className="pt-28 pb-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent leading-tight">
              Pure Water, <br/>Healthy Life
            </h1>
            <p className="text-xl text-gray-600">
              Advanced filtration solutions for homes and businesses. Certified performance with smart monitoring.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-100">
                Browse Products
              </button>
              <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors">
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-6 pt-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <FiStar key={i} className="text-2xl text-amber-400" />
              ))}
              <span className="text-gray-600">4.9/5 (2k+ Reviews)</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative bg-indigo-50 rounded-2xl p-8 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1618835962148-cf177563c6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80"
                alt="Water Filter System"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white p-6 rounded-xl shadow-md flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">99.9%</div>
                  <div className="text-sm text-gray-600">Purity Rate</div>
                </div>
                <div className="h-auto w-px bg-gray-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">5s</div>
                  <div className="text-sm text-gray-600">Installation</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <div className="bg-indigo-50 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-600 mb-8">Trusted by leading companies</div>
          <div className="flex flex-wrap justify-center gap-12 opacity-60">
            {['Company1', 'Company2', 'Company3', 'Company4'].map((company, i) => (
              <div key={i} className="text-2xl font-bold text-indigo-600">{company}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Smart Monitoring',
              color: 'bg-indigo-100',
              text: 'Real-time water quality tracking through mobile app',
              icon: '📱'
            },
            { 
              title: 'Eco-Friendly',
              color: 'bg-teal-100',
              text: 'Sustainable materials & energy efficient operation',
              icon: '🌿'
            },
            { 
              title: 'Expert Support',
              color: 'bg-amber-100',
              text: '24/7 technical support and maintenance',
              icon: '🛠️'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-2xl ${feature.color} transition-all`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Best Selling Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="h-64 bg-gray-100 relative overflow-hidden">
                  <img
                    src={`https://source.unsplash.com/random/600x400?water-filter,${item}`}
                    alt="Product"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-amber-400 text-white px-3 py-1 rounded-full text-sm">
                    -20%
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Advanced Filter System</h3>
                    <div className="flex items-center gap-1 text-amber-400">
                      <FiStar /> 4.9
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">Triple-stage purification with smart sensors</p>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-indigo-600">$299</div>
                      <div className="text-sm text-gray-400 line-through">$349</div>
                    </div>
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                      <FiShoppingCart /> Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '15K+', label: 'Happy Customers' },
              { number: '98%', label: 'Success Rate' },
              { number: '24/7', label: 'Support' },
              { number: '5Y', label: 'Warranty' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="p-6"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome; // Fixed typo in "Welcome"