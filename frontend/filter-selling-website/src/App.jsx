import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={currentUser ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!currentUser ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!currentUser ? <SignUp /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;