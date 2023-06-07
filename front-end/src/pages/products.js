import React from "react";
import ProductList from "../components/productListGenerator";
import productData from "../data.json";
import { Container } from "react-bootstrap";

const Products = () => {
  return (
    <Container>
      <ProductList data={productData} />
    </Container>
  );
};

export default Products;