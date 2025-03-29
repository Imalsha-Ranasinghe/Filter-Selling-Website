import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
       <Route path="/" element={<Welcome />} />

      <Route
        path="/home"
        element={currentUser ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!currentUser ? <SignIn /> : <Navigate to="/home" />}
      />
      <Route
        path="/signup"
        element={!currentUser ? <SignUp /> : <Navigate to="/home" />}
      />
      <Route
        path="/products"
        element={<Products />}
      />
      <Route
        path="/product/:id"
        element={<ProductView />}
      />
      <Route
        path="/cart"
        element={<Cart />}
      />
      <Route
        path="/place-order/:id"
        element={<PlaceOrder/>}
      />
      <Route
        path="/order/:id"
        element={<Order/>}
      />
    </Routes>
  );
}

export default App;