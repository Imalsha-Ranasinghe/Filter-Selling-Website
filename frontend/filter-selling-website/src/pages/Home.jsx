import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-600">Filter Store</h1>
          <div className="flex items-center gap-4">
            {currentUser && (
              <>
                <span className="text-gray-600">
                  Welcome, {currentUser.email}
                </span>
                <button
                  onClick={logout}
                  className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Premium Filters Collection
          </h2>
          {/* Add your products/content here */}
        </div>
      </main>
    </div>
  );
}