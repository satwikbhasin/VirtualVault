import React from "react";
import "bootstrap";
import { Row, Col, Button, Modal, Card, Accordion } from "react-bootstrap";
import productMapInstance from "../../services/productCacher";
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
import { addInquiry } from "../../services/inquiryAPIs";
import "../.././styling/buttons.css";
import ReactImageMagnify from "react-image-magnify";

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(new Map());
  const [showCopied, setShowCopied] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "Not Applicable",
    message: "",
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  const resetForm = () => {
    setInquiryForm({
      name: "",
      email: "",
      phone: "",
      company: "NA",
      message: "",
    });
  };

  useEffect(() => {
    const fetchProductAndSimilarProducts = async () => {
      try {
        await productMapInstance.fetchAllProducts();
        const fetchedProduct = await productMapInstance.getProductByIdFromMap(
          productId
        );
        setProduct(fetchedProduct);

        const similarProducts = productMapInstance.getProductsFromMapByCategory(
          fetchedProduct.category
        );
        const filteredSimilarProducts = similarProducts.filter(
          (product) => product._id !== productId
        );
        setSimilarProducts(filteredSimilarProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductAndSimilarProducts();
  }, [productId]);

  const handleSendInquiry = async () => {
    try {
      await addInquiry(inquiryForm, product);
      setShowInquiryForm(false);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="primary-bg">
        <div className="d-flex p-3">
          <Button variant="" onClick={handleGoBack}>
            <div className="all-products-button">
              <i class="bi bi-arrow-bar-left fs-3"></i>
              <span>All Products</span>
            </div>
          </Button>
          <div className="flex-grow-1">
            <h2 className="product-heading">{product.name}</h2>
          </div>
        </div>
        <hr />
        <div className="d-flex p-3">
          <Col className="col-5">
            <div
              className="small-product-image"
              onClick={() => {
                setShowImageModal(true);
              }}
              style={{ cursor: "pointer" }}
            >
              {showImageModal ? (
                <img
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="layover-product-image"
                />
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="product-image"
                />
              )}
            </div>
          </Col>
          <Col className="col-7">
            <p>{product.description}</p>
            <Row>
              <div className="d-flex">
                <h6>Category:</h6>
                <h6 className="category-name ms-1">{product.category}</h6>
              </div>
            </Row>
            <Row className="mb-3 mt-3">
              <Col>
                <Button
                  className="inquire-button"
                  onClick={() => {
                    setShowInquiryForm(true);
                  }}
                >
                  <div>
                    <i class="bi bi-pencil-square me-2 fs-5"></i>
                    <span>Inquire</span>
                  </div>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="col-5">
                <Row>
                  <h5>Download</h5>
                </Row>
                <Row>
                  <Col className="col-1 utility-button-holder me-2">
                    <Button
                      className="utility-button"
                      onClick={() => {
                        downloadImage(product.image);
                      }}
                    >
                      <div>
                        <i class="bi bi-file-earmark-image fs-6 me-1"></i>
                        <span>Image</span>
                      </div>
                    </Button>
                  </Col>
                  <Col className="col-1 utility-button-holder me-2">
                    <Button
                      className="utility-button"
                      onClick={() => {
                        downloadProductInfoPDF(product);
                      }}
                    >
                      <div>
                        <i class="bi bi-file-earmark-pdf fs-6 me-1"></i>
                        <span>PDF</span>
                      </div>
                    </Button>
                  </Col>
                  <Col className="col-1 utility-button-holder me-2">
                    <Button
                      className="utility-button"
                      onClick={() => {
                        downloadProductInfoWord(product);
                      }}
                    >
                      <div>
                        <i class="bi bi-file-earmark-word-fill fs-6 me-1"></i>
                        <span>Word</span>
                      </div>
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <h5>Share</h5>
                </Row>
                <Row>
                  <Col className="col-1 utility-button-holder me-2">
                    <Button
                      className="utility-button"
                      onClick={() => {
                        copyPageLinkToClipboard(productId);
                        setShowCopied(true);
                      }}
                    >
                      {!showCopied ? (
                        <div>
                          <i className="bi bi-clipboard-fill fs-6 me-1"></i>
                          <span>Copy</span>
                        </div>
                      ) : (
                        <div>
                          <i className="bi bi-clipboard-check-fill fs-6 me-1"></i>
                          <span>Copied</span>
                        </div>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Accordion
              className="similar-products-accordion mt-4"
              defaultActiveKey={1}
            >
              <Accordion.Item key={2}>
                <Accordion.Header>
                  More from {product.category}
                </Accordion.Header>
                <Accordion.Body>
                  {product.category && similarProducts.length === 0 ? (
                    "No Products"
                  ) : (
                    <Row className="similar-products-row">
                      {similarProducts.map((product) => (
                        <Col key={product._id}>
                          <a
                            href={"/user/product/" + product._id}
                            class="card-name bg-dark"
                          >
                            <Card className="similar-products-card">
                              <Row>
                                <Col className="col-1">
                                  <img
                                    src={product.image}
                                    height="120px"
                                    width="300px"
                                    alt={product.name}
                                    className="similar-products-image"
                                  />
                                </Col>
                                <Col className="col-6 similar-products-details">
                                  <span>{product.name}</span>
                                </Col>
                              </Row>
                            </Card>
                          </a>
                        </Col>
                      ))}
                    </Row>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </div>
      </div>

      <Modal
        className="modal-form"
        show={showInquiryForm}
        onHide={() => {
          setShowInquiryForm(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Inquiry Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="fw-bold">About You</h4>
          <form>
            <div className="fw-bold mb-3">
              <label for="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                onChange={(event) => {
                  setInquiryForm((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }));
                }}
              />
            </div>
            <div className="mb-3 fw-bold">
              <label for="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                onChange={(event) => {
                  setInquiryForm((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }));
                }}
              />
            </div>
            <div className="mb-3 fw-bold">
              <label for="email" className="form-label">
                Phone
              </label>
              <input
                type="phone"
                className="form-control mb-4"
                id="phone"
                placeholder="Enter your Phone Number"
                onChange={(event) => {
                  setInquiryForm((prev) => ({
                    ...prev,
                    phone: event.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label for="company" className="form-label fw-bold">
                Company (optional)
              </label>
              <input
                type="text"
                className="form-control mb-4"
                id="company"
                placeholder="Enter your Company Name"
                onChange={(event) => {
                  setInquiryForm((prev) => ({
                    ...prev,
                    company: event.target.value,
                  }));
                }}
              />
            </div>
            <div className="mb-3">
              <h4 className="fw-bold">
                How can we help you with '{product.name}'?
              </h4>
              <textarea
                className="form-control"
                id="message"
                placeholder="Enter your message"
                onChange={(event) => {
                  setInquiryForm((prev) => ({
                    ...prev,
                    message: event.target.value,
                  }));
                }}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            onClick={() => {
              setShowInquiryForm(false);
              resetForm();
            }}
          >
            <div className="d-flex align-items-center text-light">
              <i class="bi bi-x-circle-fill fs-6"></i>
              <span className="ms-1">Cancel</span>
            </div>
          </Button>
          <Button variant="" className="text-light" onClick={handleSendInquiry}>
            <div className="d-flex align-items-center">
              <i class="bi bi-send-fill fs-6"></i>
              <span className="ms-1">Send</span>
            </div>
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="image-modal"
        show={showImageModal}
        onHide={() => {
          setShowImageModal(false);
        }}
      >
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: product.name,
              src: product.image,
              width: 600,
              height: 600,
            },
            largeImage: {
              src: product.image,
              width: 1200,
              height: 1200,
            },
          }}
          enlargedImagePosition="over"
        />
      </Modal>
    </>
  );
};

export default ProductDetails;
