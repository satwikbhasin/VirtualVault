import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import UserHome from "./userPages/userHome.js";
import Products from "./userPages/products.js";
import Contact from "./userPages/contact.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./userPages/productDetails.js";
import RouteProtection from "./services/routeProtection.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/user/" element={<UserHome />} />
        <Route exact path="/user/home" element={<UserHome />} />
        <Route path="/user/products" element={<Products />} />
        <Route path="/user/contact" element={<Contact />} />
        <Route path="/user/product/:productId" element={<ProductDetails />} />

        <Route
          path="/admin/login"
          element={<RouteProtection route={"/admin/login"} />}
        />
        <Route
          path="/admin/"
          element={<RouteProtection route={"/admin/home"} />}
        />
        <Route
          path="/admin/home"
          element={<RouteProtection route={"/admin/home"} />}
        />
        <Route
          path="/admin/inventory"
          element={<RouteProtection route={"/admin/inventory"} />}
        />
        <Route
          path="/admin/contact"
          element={<RouteProtection route={"/admin/contact"} />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
