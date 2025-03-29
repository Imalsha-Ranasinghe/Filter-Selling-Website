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
import Contact from "./pages/Contact";
import CartOrders from "./pages/CartOrders";

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
     
      {/* Private Routes */}
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
      <Route path="/cart-order" element={<PrivateRoute element={<CartOrders />} />} />
      
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
