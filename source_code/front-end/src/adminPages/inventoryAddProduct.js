import React, { useState, useRef, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { addProduct } from "../services/inventoryAPIs";
import { Container, Button, Form, Col, Row } from "react-bootstrap";
import "../styling/buttons.css";
import { getCategories } from "../services/inventoryAPIs";

const AddProduct = () => {
  const formRef = useRef(null);
  const [addProductAlert, setAddProductAlert] = useState(false);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    category: "",
    imageFile: null,
  });

  const reset = () => {
    setProduct({
      id: "",
      name: "",
      description: "",
      category: "",
      imageFile: null,
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (
      product.name.trim() === "" ||
      product.description.trim() === "" ||
      product.category.trim() === "" ||
      product.category.trim() === "Select a Category" ||
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
      className="full-screen-bg"
    >
      <Form ref={formRef} onSubmit={handleAddProduct}>
        <Row className="mt-4">
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
            />
          </Form.Group>
        </Row>
        <Row className="mt-4">
          <Form.Group>
            <Form.Label className="fw-bold">
              <h4>Description</h4>
            </Form.Label>
            <textarea
              class="form-control"
              onChange={(event) =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  description: event.target.value,
                }))
              }
            />
          </Form.Group>
        </Row>
        <Row className="mt-4">
          <Form.Group>
            <Form.Label className="fw-bold">
              <h4>Category</h4>
            </Form.Label>
            <Form.Select
              onChange={(event) => {
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  category: event.target.value,
                }));
              }}
            >
              <option>Select a Category</option>
              {categories.map((category) => (
                <option key={category._id}>{category.categoryName}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mt-4">
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
        </Row>

        <Row className="mb-2">
          {addProductAlert && (
            <Alert variant="danger" className="mt-4 p-1">
              Please fill all the fields
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
            <Button className="add-button" type="submit">
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
