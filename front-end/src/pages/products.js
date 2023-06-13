import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styling/productCard.css";
import { useState, useEffect } from "react";
import productMapInstance from "../services/productsToMap";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Products = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [productsMap, setProductsMap] = useState(new Map());
  const [totalProductSize, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const handleMouseEnter = (index) => {
    setHoveredCardIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredCardIndex(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const totalProductSize = await productMapInstance.initialize();
        setTotalProducts(totalProductSize.count);
        setProductsMap(await productMapInstance.getAllProductsFromMap());
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  // Calculate indexes of the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.from(productsMap.values()).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row className="mt-4">
        <PaginationControl
          page={currentPage}
          limit={productsPerPage}
          total={totalProductSize}
          changePage={paginate}
        />
      </Row>
      <Row className="pb-4">
        {currentProducts.map((item) => (
          <Col md={4} lg={4} xl={4} key={item._id}>
            <Link to={`/product/${item._id}`} class="card-name">
              <Card
                className={`m-2 card ${
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
