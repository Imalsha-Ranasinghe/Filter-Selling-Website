import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Header from './Header';

export default function SignUp() {
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      setError('');
      setLoading(true);
      await signup(email.value, password.value);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <Header/>
    
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Image Section - Hidden on mobile */}
          <div className="hidden md:block md:w-1/2 relative">
            <img 
              src='https://www.focuswater.com.sg/cdn/shop/articles/shutterstock_1595598817-min_6ff89d12-100d-4309-be58-a7fccb7577b6.jpg?v=1683619029&width=3000'
              alt="Clean water"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">Pure Water Solutions</h2>
                <p className="opacity-90">Join our community for clean water access</p>
              </div>
            </div>
          </div>

          {/* Form Section - Full width on mobile, half width on desktop */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                Create Your Account
              </h1>
              <p className="text-gray-600 text-center mb-6 md:mb-8 text-sm md:text-base">
                Access clean water solutions & exclusive offers
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Create Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      required
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      8+ characters with numbers and symbols
                    </div>
                  </div>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <span>Get Pure Water Access</span>
                      <span className="hidden md:inline">→</span>
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-700 font-semibold underline-offset-4 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}