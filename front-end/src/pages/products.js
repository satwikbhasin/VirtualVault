import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styling/productCard.css";
import { useState, useEffect } from "react";
import Axios from "axios";
// import productMapInstance from "../services/productsToMap";

const Products = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [productsMap, setProductsMap] = useState(new Map());

  const handleMouseEnter = (index) => {
    setHoveredCardIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredCardIndex(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await Axios.get(
          "http://localhost:3001/products/getAllProducts"
        );
        const updatedProductsMap = new Map();
        fetchedProducts.data.forEach((item) => {
          updatedProductsMap.set(item._id, item);
        });
        setProductsMap(updatedProductsMap);
        // setProductsMap(productMapInstance.getProductsFromMap());
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <Row className="pt-4 pb-4">
        {Array.from(productsMap.values()).map((item) => (
          <Col md={4} lg={4} xl={4} key={item._id}>
            <Link to={`/product/${item._id}`} class="card-name">
              <Card
                className={`m-3 card ${
                  hoveredCardIndex === item._id ? "enlarged" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(item._id)}
                onMouseLeave={handleMouseLeave}
              >
                <Card.Body>
                  <Card.Img src={item.image} className="card-image" />
                  <Card.Title className="pt-2 font-product-name">
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
