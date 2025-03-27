import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import "./index.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />

        </Routes>
      
    </>
  );
}

export default App;
