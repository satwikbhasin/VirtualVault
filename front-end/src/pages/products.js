import React from "react";
import ProductList from "../components/productListGenerator";
import jsonData from "../data.json";
import { Container } from "react-bootstrap";

const Products = () => {
  return (
    <Container>
      <ProductList data={jsonData} />
    </Container>
  );
};

export default Products;