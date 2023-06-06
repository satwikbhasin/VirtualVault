import Contact from "./pages/contact";
import Products from "./pages/products";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Contact />} />
        <Route path="/pages/products.js" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
