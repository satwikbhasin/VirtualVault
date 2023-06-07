import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import '../styling/card.css';

const productsList = ({ data }) => {
  return (
    <Container>
      <Row>
        {data.map((item) => (
          <Col md={6} lg={6} xl={6}>
            <Card
              className="m-3 card"
            >
              <Card.Body>
                <Card.Img
                  src={item.img}
                  className="card-image"
                />
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

export default productsList;
