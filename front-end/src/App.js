import Home from "./pages/home.js";
import Products from "./pages/products.js";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/pages/products.js" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
