import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Container, Row, Image, Col, Button } from "react-bootstrap";
import productMapInstance from "../services/productCacher";
import { Link } from "react-router-dom";
import "../styling/text-styling.css";
import { useState, useEffect } from "react";
import HeadingNavbar from "../components/headingNavbar.js";
import UserNavbar from "../components/userNavbar.js";

const ProductDetails = () => {
  const [product, setProduct] = useState(new Map());

  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await productMapInstance.fetchAllProducts();
        const fetchedProduct = await productMapInstance.getProductByIdFromMap(
          productId
        );
        setProduct(fetchedProduct);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <HeadingNavbar />
      <UserNavbar />
      <Container>
        <Row className="mt-3">
          <Link to="/user/products">
            <Button variant="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="35"
                height="35"
                className="mx-2"
              >
                <path d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L5.81 11.5h14.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06Z"></path>
              </svg>
              Back
            </Button>
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
            <h3 className="font-product-price">${product.price}</h3>
            <p className="">{product.description}</p>
          </Col>
        </Row>
        <Row className="pb-3"></Row>
      </Container>
    </>
  );
};

export default ProductDetails;
