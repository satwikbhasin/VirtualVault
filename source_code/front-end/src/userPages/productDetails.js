import React from "react";
import "bootstrap";
import { useParams } from "react-router-dom";
import UserNavbar from "../components/userNavbar.js";
import ProductDetailsView from "../components/productDetailsView.js";

const ProductDetails = () => {
  const { productId } = useParams();

  return (
    <>
      <UserNavbar />
      <ProductDetailsView productId={productId} />
    </>
  );
};

export default ProductDetails;
