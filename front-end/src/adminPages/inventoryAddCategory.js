import React, { useState, useRef, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Container, Button, Form, Col, Row } from "react-bootstrap";
import "../styling/buttons.css";
import { getCategories, addCategory } from "../services/inventoryAPIs";

const AddCategory = () => {
  const formRef = useRef(null);
  const [addCategoryAlert, setAddCategoryAlert] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: "",
  });

  const reset = () => {
    setCategory({
      name: "",
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
      console.log(categories);
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (category.name.trim() === "") {
      setAddCategoryAlert(true);
    } else if (categories.find((item) => item.categoryName === category.name)) {
      alert("Category already exists");
      reset();
      formRef.current.reset();
    } else {
      await addCategory(category).then(() => {
        alert("Category added successfully");
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
      <Form ref={formRef} onSubmit={handleAddCategory}>
        <Row className="mt-4">
          <Form.Group>
            <Form.Label className="fw-bold">
              <h4>Name</h4>
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(event) =>
                setCategory((prevProduct) => ({
                  ...prevProduct,
                  name: event.target.value,
                }))
              }
            />
          </Form.Group>
        </Row>

        <Row className="mb-2">
          {addCategoryAlert && (
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
            <Button className="add-button mt-3" type="submit">
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

export default AddCategory;
