import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import PrivateRoute from "../PrivateRoute"; // Import the PrivateRoute component
import About from "./pages/About";

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/about" element={<About />} />
      {/* Private Routes */}
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
      <Route
        path="/place-order/:id"
        element={<PrivateRoute element={<PlaceOrder />} />}
      />

      {/* Public Routes */}
      <Route
        path="/login"
        element={!currentUser ? <SignIn /> : <Navigate to="/home" />}
      />
      <Route
        path="/signup"
        element={!currentUser ? <SignUp /> : <Navigate to="/home" />}
      />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductView />} />
    </Routes>
  );
}

export default App;
