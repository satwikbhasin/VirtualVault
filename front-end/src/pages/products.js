import React from "react";
import ProductList from "../components/productListGenerator";
import productData from "../data.json";

const Products = () => {
  return (
    <div>
        <ProductList data={productData} />
    </div>
  );
};

export default Products;
