import React from "react";
import { Card, Row, Dropdown } from "react-bootstrap";
import "../styling/productsView.css";
import { useState, useEffect } from "react";
import productMapInstance from "../services/productCacher";
import Pagination from "@mui/material/Pagination";
import { getCategories } from "../services/inventoryAPIs";

const Products = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [productsMap, setProductsMap] = useState(new Map());
  const [totalProductSize, setTotalProductSize] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setTotalProductSize(totalProducts);
        const allProducts = await productMapInstance.getAllProductsFromMap();

        const filteredProducts =
          selectedCategory === "All"
            ? allProducts
            : Array.from(allProducts.values()).filter(
                (item) => item.category === selectedCategory
              );

        if (selectedCategory === "All") {
          setTotalProductSize(allProducts.size);
        } else {
          setTotalProductSize(filteredProducts.length);
        }
        setProductsMap(filteredProducts);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.from(productsMap.values()).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleChangePage = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="primary-bg full-screen-bg">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : totalProductSize > 0 ? (
        <>
          <div className="primary-bg">
            <div className="category-filter-container">
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  className="category-filter"
                >
                  {selectedCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleCategorySelect("All")}>
                    All
                  </Dropdown.Item>
                  {categories.map((category) => (
                    <Dropdown.Item
                      key={category.id}
                      onClick={() =>
                        handleCategorySelect(category.categoryName)
                      }
                    >
                      {category.categoryName}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Row className="products-container">
              {currentProducts.map((item) => (
                <div className="col-md-4 col-lg-4 col-xl-4 mb-5" key={item._id}>
                  <a href={"/user/product/" + item._id} class="card-name">
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
                  </a>
                </div>
              ))}
            </Row>
          </div>
          <div className="pagination-container">
            <Pagination
              color="primary"
              count={Math.ceil(totalProductSize / productsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              className="pagination"
            />
          </div>
        </>
      ) : (
        <div className="primary-bg no-products-found-text">No Products</div>
      )}
    </div>
  );
};

export default Products;
