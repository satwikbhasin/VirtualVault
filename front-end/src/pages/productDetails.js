import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Container, Row, Image, Col, Button } from "react-bootstrap";
import productMapInstance from "../services/productsToMap";
import { Link } from "react-router-dom";
import "../styling/text-styling.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const product = productMapInstance.map.get(productId);

  return (
    <Container>
      <Row className="text-center pt-4">
        <Col className="col-1">
          <Link to="/products">x
            <Button className="btn-dark">Back</Button>
          </Link>
        </Col>
        <Col>
          <h2 class="font-product-heading">{product.name}</h2>
        </Col>
      </Row>
      <hr />
      <Row className="pt-3 pb-3">
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
          <h3 class="font-product-price">{product.price}</h3>
          <p className="">{product.description}</p>
        </Col>
      </Row>
      <Row className="pb-3"></Row>
    </Container>
  );
};

export default ProductDetails;
