import React, { useState, useRef } from "react";
import { Alert } from "react-bootstrap";
import { addProduct } from "../services/inventoryAPIs";
import { Container, Button, Form, Col, Row } from "react-bootstrap";

const AddProduct = () => {
  const formRef = useRef(null);
  const [addProductAlert, setAddProductAlert] = useState(false);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    imageFile: null,
  });

  const reset = () => {
    setProduct({
      id: "",
      name: "",
      price: "",
      description: "",
      imageFile: null,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (
      product.name.trim() === "" ||
      product.price.trim() === "" ||
      product.description.trim() === "" ||
      product.imageFile === null
    ) {
      setAddProductAlert(true);
    } else {
      await addProduct(product).then(() => {
        alert("Product added successfully");
        reset();
        formRef.current.reset();
      });
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Form ref={formRef} onSubmit={handleAddProduct}>
        <Row>
          <Col className="m-4">
            <Form.Group>
              <Form.Label className="fw-bold">
                <h4>Name</h4>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(event) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    name: event.target.value,
                  }))
                }
                className="mb-4"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-bold">
                <h4>Description</h4>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(event) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    description: event.target.value,
                  }))
                }
                className=""
              />
            </Form.Group>
          </Col>
          <Col className="m-4">
            <Form.Group>
              <Form.Label className="fw-bold">
                <h4>Price</h4>
              </Form.Label>
              <Form.Control
                type="number"
                onChange={(event) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    price: event.target.value,
                  }))
                }
                className="mb-4"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="fw-bold">
                <h4>Image</h4>
              </Form.Label>
              <Form.Control
                type="file"
                className="input"
                accept="image/*"
                onChange={(event) => {
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    imageFile: event.target.files[0],
                  }));
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-2">
          {addProductAlert && (
            <Alert variant="danger" className="mt-4 p-1">
              Please fill out all fields
            </Alert>
          )}
        </Row>
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Button
              variant="success"
              type="submit"
              disabled={
                product.description === "" ||
                product.imageFile === null ||
                product.name === "" ||
                product.price === ""
              }
            >
              <div className="d-flex align-items-center">
                <i class="bi bi-plus-circle-fill fs-6"></i>
                <span className="ms-1">Add</span>
              </div>
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddProduct;
