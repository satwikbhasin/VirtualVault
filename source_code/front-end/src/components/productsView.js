import React from "react";
import { Card, Button, Row, Dropdown } from "react-bootstrap";
import "../styling/productsView.css";
import { useState, useEffect } from "react";
import productMapInstance from "../services/productCacher";
import Pagination from "@mui/material/Pagination";
import ProductDetailsView from "./productDetailsView/productDetailsView.js";
import { getCategories } from "../services/inventoryAPIs";

const ProductsView = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [productsMap, setProductsMap] = useState(new Map());
  const [totalProductSize, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [productId, setProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

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

        const allProducts = await productMapInstance.getAllProductsFromMap();

        const filteredProducts =
          selectedCategory === "All"
            ? allProducts
            : Array.from(allProducts.values()).filter(
                (item) => item.category === selectedCategory
              );

        setProductsMap(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="primary-bg full-screen-bg">
      {showProductDetails ? (
        <ProductDetailsView productId={productId}></ProductDetailsView>
      ) : totalProductSize > 0 ? (
        <div className="primary-bg">
          <div className="pagination-container">
            <Pagination
              color="primary"
              count={Math.ceil(totalProductSize / productsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              className="p-4 pagination"
            />
            <Dropdown className="category-filter-container ">
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                className="category-filter"
              >
                Category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleCategorySelect("All")}>
                  All
                </Dropdown.Item>
                {categories.map((category) => (
                  <Dropdown.Item
                    key={category.id}
                    onClick={() => handleCategorySelect(category.categoryName)}
                  >
                    {category.categoryName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Row className="products-container">
            {currentProducts.map((item) => (
              <div className="col-md-4 col-lg-4 col-xl-4 mb-3" key={item._id}>
                <Button
                  variant=""
                  onClick={() => {
                    setShowProductDetails(true);
                    setProductId(item._id);
                  }}
                  class="card-name"
                >
                  <Card
                    className={`card ${
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
      ) : (
        <div className="primary-bg no-products-found-text">No Products</div>
      )}
    </div>
  );
};

export default ProductsView;
