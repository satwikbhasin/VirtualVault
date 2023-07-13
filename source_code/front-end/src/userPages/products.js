import React from "react";
import UserNavbar from "../components/userNavbar.js";
import ProductsView from "../components/productsView.js";

const Products = () => {
  return (
    <>
      <UserNavbar />
      <div className="primary-bg page-header justify-content-center align-content-center d-flex p-2"></div>
      <ProductsView />
    </>
  );
};

export default Products;
