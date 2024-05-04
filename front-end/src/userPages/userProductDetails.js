import React from "react";
import "bootstrap";
import { useParams } from "react-router-dom";
import UserNavbar from "../components/userNavbar.js";
import ProductDetails from "../components/productDetails/productDetails.js";

const UserProductDetails = () => {
  const { productId } = useParams();

  return (
    <>
      <UserNavbar />
      <ProductDetails productId={productId} />
    </>
  );
};

export default UserProductDetails;
