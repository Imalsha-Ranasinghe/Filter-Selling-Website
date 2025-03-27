import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import "./index.css";

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Welcome/>} />

        </Routes>
      
    </>
  );
}

export default App;
