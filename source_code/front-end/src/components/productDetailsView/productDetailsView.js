import React from "react";
import "bootstrap";
import { Container, Row, Image, Col, Button } from "react-bootstrap";
import productMapInstance from "../../services/productCacher";
import "../.././styling/text-styling.css";
import "../.././styling/productDetailsView.css";
import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  handleGoBack,
  copyPageLinkToClipboard,
  downloadImage,
  downloadProductInfoWord,
  downloadProductInfoPDF,
} from "./helper";

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
          </Col>
          <Col className="col-7 ">
            <h3 className="font-product-price">${product.price}</h3>
            <p className="">{product.description}</p>
            <Row>
              <h5>Download</h5>
            </Row>
            <Row>
              <Col className="col-1 utility-button-holder me-2">
                <Button
                  className="utility-buttons"
                  onClick={() => {
                    downloadImage(product.image);
                  }}
                >
                  <div className="align-items-center">
                    <i class="bi bi-file-earmark-image fs-5 me-1"></i>
                    <span>Image</span>
                  </div>
                </Button>
              </Col>
              <Col className="col-1 utility-button-holder me-2">
                <Button
                  className="utility-buttons"
                  onClick={() => {
                    downloadProductInfoPDF(product);
                  }}
                >
                  <div className="align-items-center">
                    <i class="bi bi-file-earmark-pdf fs-5 me-1"></i>
                    <span>PDF</span>
                  </div>
                </Button>
              </Col>
              <Col className="col-1 utility-button-holder align-items-center me-2">
                <Button
                  className="utility-buttons"
                  onClick={() => {
                    downloadProductInfoWord(product);
                  }}
                >
                  <div className="align-items-center">
                    <i class="bi bi-file-earmark-word-fill fs-5 me-1"></i>
                    <span>Word</span>
                  </div>
                </Button>
              </Col>
            </Row>
            <Row className="mt-3">
              <h5>Share</h5>
            </Row>
            <Row>
              <Col>
                <Button
                  className="utility-buttons"
                  onClick={() => {
                    copyPageLinkToClipboard(productId);
                    setShowCopied(true);
                  }}
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
