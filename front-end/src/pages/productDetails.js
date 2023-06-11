import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Container, Row, Image, Col, Button } from "react-bootstrap";
// import productMapInstance from "../services/productsToMap";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../styling/text-styling.css";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const [product, setProduct] = useState(new Map());

  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await Axios.get(
          "http://localhost:3001/products/getProduct/" + productId
        );
        setProduct(fetchedProduct.data);
        // const fetchedProduct = await productMapInstance.fetchProductById(
        //   productId
        // );
        // setProduct(fetchedProduct);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <Container>
      <Row className="mt-3">
        <Link to="/products">
          <Button className="btn-dark">Back</Button>
        </Link>
      </Row>
      <Row className="text-center">
        <h2 className="font-product-heading">{product.name}</h2>
      </Row>
      <hr />
      <Row className="pt-1 pb-3">
        <Col className="col-5">
          <Image
            style={{
              height: "500px",
              width: "500px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src={product.image}
            alt=""
          ></Image>
        </Col>
        <Col className="col-7 mt-2">
          <h3 className="font-product-price">{product.price}</h3>
          <p className="">{product.description}</p>
        </Col>
      </Row>
      <Row className="pb-3"></Row>
    </Container>
  );
};

export default ProductDetails;
