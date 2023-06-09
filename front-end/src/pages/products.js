import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styling/card.css";
import { useState } from "react";
import productMapInstance from "../services/productMap";

const Products = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCardIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredCardIndex(null);
  };

  const productsMap = productMapInstance.getProductsFromMap();

  return (
    <Container>
      <Row className="pt-4 pb-4">
        {Array.from(productsMap.values()).map((item) => (
          <Col md={4} lg={4} xl={4} key={item.product_id}>
            <Link to={`/product/${item.product_id}`} class="card-name">
              <Card
                className={`m-3 card ${
                  hoveredCardIndex === item.product_id ? "enlarged" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(item.product_id)}
                onMouseLeave={handleMouseLeave}
              >
                <Card.Body>
                  <Card.Img src={item.image} className="card-image" />
                  <Card.Title className="pt-2" class="font-product-name">
                    {item.name}
                  </Card.Title>
                  {/* <Card.Text className="m-2">{item.description}</Card.Text> */}
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
