import React from "react";
import "bootstrap";
import { Container, Row, Image, Col, Button } from "react-bootstrap";
import productMapInstance from "../services/productCacher";
import "../styling/text-styling.css";
import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { saveAs } from "file-saver";

const ProductDetailsView = ({ productId }) => {
  const [product, setProduct] = useState(new Map());
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await productMapInstance.fetchAllProducts();
        const fetchedProduct = await productMapInstance.getProductByIdFromMap(
          productId
        );
        setProduct(fetchedProduct);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleGoBack = () => {
    if (window.location.pathname === "/admin/inventory") {
      window.location.href = "/admin/inventory";
    } else {
      window.location.href = "/user/products";
    }
  };

  const copyPageLinkToClipboard = () => {
    navigator.clipboard
      .writeText("http://localhost:3000/user/product/" + productId)
      .then(() => {
        setShowCopied(true);
      });
  };

  const downloadImage = () => {
    saveAs(product.image, "image.jpg");
  };

  return (
    <>
      <Container>
        <div className="d-flex align-items-center justify-content-center pt-3">
          <Button variant="" className="mr-auto" onClick={handleGoBack}>
            <div className="d-flex align-items-center">
              <i class="bi bi-arrow-bar-left fs-3"></i>
              <span>Back</span>
            </div>
          </Button>
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <h2 className="font-product-heading text-center">{product.name}</h2>
          </div>
        </div>
        <hr />
        <Row className="pt-1 pb-3">
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
            />
            <Row className="d-flex align-items-center justify-content-center">
              <Button variant="" className="" onClick={downloadImage} col="6">
                <div className="d-flex align-items-center justify-content-center">
                  <i class="bi bi-cloud-arrow-down-fill fs-4 me-1"></i>
                  <span>Download Image</span>
                </div>
              </Button>
            </Row>
          </Col>
          <Col className="col-7 mt-2">
            <h3 className="font-product-price">${product.price}</h3>
            <p className="mb-3">{product.description}</p>
            <Row className="mt-3">
              <Col>
                <Button
                  variant=""
                  className="border-dark"
                  onClick={copyPageLinkToClipboard}
                  col="6"
                >
                  {!showCopied ? (
                    <div className="align-items-center">
                      <i className="bi bi-clipboard-fill fs-5 me-1"></i>
                      <span>Copy</span>
                    </div>
                  ) : (
                    <div className="align-items-center">
                      <i className="bi bi-clipboard-check-fill fs-5 me-1"></i>
                      <span>Copied</span>
                    </div>
                  )}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetailsView;
