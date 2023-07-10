import React from "react";
import { Card, Button, Row } from "react-bootstrap";
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
  const [productsPerPage] = useState(9);
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
    <div className="ternary-bg">
      {showProductDetails ? (
        <ProductDetailsView productId={productId}></ProductDetailsView>
      ) : (
        <div className="ternary-bg">
          <div className="justify-content-center">
            <div className="pagination-container">
              <Pagination
                color="primary"
                count={Math.ceil(totalProductSize / productsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                className="p-4 pagination"
              />
            </div>
          </div>

          <Row className="products-container">
            {currentProducts.map((item) => (
              <div className="col-md-4 col-lg-4 col-xl-4" key={item._id}>
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
              </div>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductsView;
