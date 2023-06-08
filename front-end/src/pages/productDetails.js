import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Container, Row, Image, Col, Button } from "react-bootstrap";
import productMapInstance from "../services/productMap";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const product = productMapInstance.map.get(productId);

  return (
    <>
      <Container>
        <Row className="text-center m-3 fw-bold">
          <h2>{product.name}</h2>
        </Row>
        <Row>
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
              className="mb-4"
            ></Image>
          </Col>
          <Col className="col-7 mt-2">
            <h3>{product.price}</h3>
            <p className="">{product.description}</p>
          </Col>
        </Row>
      </Container>

      <Container className="">
        <Link to="/products">
          <Button className="btn-dark">Back</Button>
        </Link>
      </Container>
    </>
  );
};

export default ProductDetails;
