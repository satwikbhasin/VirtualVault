import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "../styling/productsView.css";
import { useState, useEffect } from "react";
import productMapInstance from "../services/productCacher";
import Pagination from "@mui/material/Pagination";
import ProductDetailsView from "./productDetailsView/productDetailsView.js";

const ProductsView = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [productsMap, setProductsMap] = useState(new Map());
  const [totalProductSize, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [productId, setProductId] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCardIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredCardIndex(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const totalProducts = await productMapInstance.initialize();
        setTotalProducts(totalProducts.count);
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
  const handleChangePage = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {showProductDetails ? (
        <ProductDetailsView productId={productId}></ProductDetailsView>
      ) : (
        <Container>
          <Row className="mt-4 justify-content-center">
            <div className="pagination-container">
              <Pagination
                variant="outlined"
                color="success"
                count={Math.ceil(totalProductSize / productsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                className="mb-3"
              />
            </div>
          </Row>

          <Row className="pb-4">
            {currentProducts.map((item) => (
              <Col md={4} lg={4} xl={4} key={item._id}>
                <Button
                  variant=""
                  onClick={() => {
                    setShowProductDetails(true);
                    setProductId(item._id);
                  }}
                  class="card-name"
                >
                  <Card
                    className={`mb-3 card ${
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
                </Button>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProductsView;
