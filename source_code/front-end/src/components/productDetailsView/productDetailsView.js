import React from "react";
import "bootstrap";
import { Row, Image, Col, Button, Modal } from "react-bootstrap";
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
import { addInquiry } from "../../services/inquiryAPIs";

const ProductDetailsView = ({ productId }) => {
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
      <div className="ternary-bg">
        <div className="d-flex p-3">
          <Button variant="" className="" onClick={handleGoBack}>
            <div className="d-flex align-items-center text-light">
              <i class="bi bi-arrow-bar-left fs-3"></i>
              <span>Back</span>
            </div>
          </Button>
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <h2 className="font-product-heading">{product.name}</h2>
          </div>
        </div>
        <hr />
        <div className="d-flex p-3">
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
          <Col className="col-7">
            <p>{product.description}</p>
            <Row className="mb-3">
              <Col>
                <Button
                  className="inquire-button"
                  onClick={() => {
                    setShowInquiryForm(true);
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center">
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
                  <Col className="col-1 utility-button-holder align-items-center me-2">
                    <Button
                      className="utility-buttons"
                      onClick={() => {
                        downloadImage(product.image);
                      }}
                    >
                      <div className="align-items-center">
                        <i class="bi bi-file-earmark-image fs-6 me-1"></i>
                        <span>Image</span>
                      </div>
                    </Button>
                  </Col>
                  <Col className="col-1 utility-button-holder align-items-center me-2">
                    <Button
                      className="utility-buttons"
                      onClick={() => {
                        downloadProductInfoPDF(product);
                      }}
                    >
                      <div className="align-items-center">
                        <i class="bi bi-file-earmark-pdf fs-6 me-1"></i>
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
                  <Col className="col-1 utility-button-holder align-items-center me-2">
                    <Button
                      className="utility-buttons"
                      onClick={() => {
                        copyPageLinkToClipboard(productId);
                        setShowCopied(true);
                      }}
                    >
                      {!showCopied ? (
                        <div className="align-items-center">
                          <i className="bi bi-clipboard-fill fs-6 me-1"></i>
                          <span>Copy</span>
                        </div>
                      ) : (
                        <div className="align-items-center">
                          <i className="bi bi-clipboard-check-fill fs-6 me-1"></i>
                          <span>Copied</span>
                        </div>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row></Row>
          </Col>
        </div>
      </div>

      <Modal
        className="inquiry-form"
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
            <div className="">
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
    </>
  );
};

export default ProductDetailsView;