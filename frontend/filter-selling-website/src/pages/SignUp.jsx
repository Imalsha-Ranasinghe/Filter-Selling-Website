import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function SignUp() {
  const { signup} = useAuth();
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center"
          >
            {loading ? (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="mt-6">
          <button
            
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#fff" d="M24 5c3.5 0 6.6 1.3 9 3.4l-4 4C26.8 10.2 24.4 9 21 9c-5.4 0-10 3.3-12 8 1.4-2.3 3.4-4.3 5.8-5.6L21 27V11h6v16h3v-8h3v8h3v-8h3v-3h-3v-3h-3v-3h-3l1.5-4H34c1.1 3.2 1.7 6.6 1.7 10 0 15-10 23-23 23-5.4 0-10.4-1.7-14.6-4.7l3.8-3.8C8.7 39.1 14.6 42 21 42c12.1 0 21-9 21-21 0-3.3-.8-6.4-2.2-9.2L39 12c-3 4.9-7.8 8-15 8z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}