import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "../styling/card.css";
import { useState } from "react";

const ProductsList = ({ data }) => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCardIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredCardIndex(null);
  };

  return (
    <Container>
      <Row className="pt-4">
        {data.map((item, index) => (
          <Col md={6} lg={6} xl={6} >
            <Card
              className={`m-3 p-2 card ${
                hoveredCardIndex === index ? "enlarged" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Card.Body>
                <Card.Img src={item.image} className="card-image" />
                <Card.Title className="m-2">{item.name}</Card.Title>
                <Card.Text className="m-2">{item.description}</Card.Text>
                <Button className="btn-dark m-1">Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsList;
