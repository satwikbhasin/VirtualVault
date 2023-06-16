import React, { useState, useEffect, useRef } from "react";
import { Alert } from "react-bootstrap";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../services/inventoryAPIs";

import {
  Container,
  Image,
  Table,
  Modal,
  Button,
  Form,
  Tab,
  Tabs,
  Col,
  Row,
} from "react-bootstrap";
import productMapInstance from "../services/productCacher";
import HeadingNavbar from "../components/headingNavbar";
import AdminNavbar from "../components/adminNavbar";

const Inventory = () => {
  const formRef = useRef(null);

  var [productMap, setProductMap] = useState(new Map());

  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    imageFile: null,
  });
  const [updatedProduct, setUpdatedProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    imageFile: null,
  });

  const [totalProductCount, setTotalProductCount] = useState(0);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addProductAlert, setAddProductAlert] = useState(false);
  const [updateProductAlert, setUpdateProductAlert] = useState(false);

  const refresh = () => {
    window.location.reload();
  };

  const reset = () => {
    setProduct({
      id: "",
      name: "",
      price: "",
      description: "",
      imageFile: null,
    });
    setUpdatedProduct({
      id: "",
      name: "",
      price: "",
      description: "",
      imageFile: null,
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const totalProducts = await productMapInstance.initialize();
        setProductMap(await productMapInstance.getAllProductsFromMap());
        setTotalProductCount(totalProducts.count);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [productMap]);

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

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (
      (updatedProduct.name.trim() === product.name ||
        updatedProduct.name === "") &&
      (updatedProduct.price.trim() === product.price ||
        updatedProduct.price === "") &&
      (updatedProduct.description.trim() === product.description ||
        updatedProduct.description === "") &&
      updatedProduct.imageFile === null
    ) {
      setUpdateProductAlert(true);
    } else {
      setShowUpdateModal(false);
      console.log(updatedProduct);
      await updateProduct(updatedProduct).then(() => {
        alert("Product updated successfully");
        reset();
        formRef.current.reset();
      });
    }
  };

  return (
    <>
      <HeadingNavbar />
      <AdminNavbar />
      <Container>
        <Tabs defaultActiveKey="allProducts" className="m-4 text-primary" fill>
          <Tab
            eventKey="allProducts"
            title="All Products"
            className="text-center"
          >
            <Button
              onClick={refresh}
              className="bg-success border-success btn-small"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 30 30"
              >
                <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
              </svg>
            </Button>
            <h6 className="m-3">
              Total Products in Inventory: {totalProductCount}
            </h6>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(productMap.values()).map((product) => (
                  <tr key={product._id}>
                    <td style={{ width: "200px" }}>{product.name}</td>
                    <td style={{ width: "200px" }}>
                      <Image
                        style={{
                          height: "120px",
                          width: "80px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                        src={product.image}
                        alt={product.name}
                      />
                    </td>
                    <td style={{ width: "400px" }}>{product.description}</td>
                    <td style={{ width: "100px" }}>${product.price}</td>
                    <td style={{ width: "100px" }}>
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => {
                          setProduct({
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            description: product.description,
                            imageFile: null,
                          });
                          setUpdatedProduct({
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            description: product.description,
                            imageFile: null,
                          });
                          setShowUpdateModal(true);
                        }}
                      >
                        Update
                      </Button>
                    </td>
                    <td style={{ width: "100px" }}>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          setProduct({ id: product._id });
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="addProduct" title="Add a Product">
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
                    <Button variant="dark" type="submit">
                      Add Product
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Tab>
        </Tabs>

        <Modal
          show={showUpdateModal}
          onHide={() => {
            setShowUpdateModal(false);
          }}
        >
          <Form onSubmit={handleUpdateProduct}>
            <Modal.Header closeButton>
              <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>
                  <p className="fw-bold">New Name:</p>
                </Form.Label>
                <Form.Control
                  className="mb-3"
                  onChange={(event) => {
                    setUpdatedProduct((prevProduct) => ({
                      ...prevProduct,
                      name: event.target.value,
                    }));
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <p className="fw-bold">New Description</p>
                </Form.Label>
                <Form.Control
                  className="mb-3"
                  onChange={(event) => {
                    setUpdatedProduct((prevProduct) => ({
                      ...prevProduct,
                      description: event.target.value,
                    }));
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <p className="fw-bold">New Price</p>
                </Form.Label>
                <Form.Control
                  className="mb-3"
                  type="number"
                  onChange={(event) => {
                    setUpdatedProduct((prevProduct) => ({
                      ...prevProduct,
                      price: event.target.value,
                    }));
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-bold">
                  <p>New Image</p>
                </Form.Label>
                <Form.Control
                  type="file"
                  className="mb-4 input"
                  accept="image/*"
                  onChange={(event) => {
                    setUpdatedProduct((prevProduct) => ({
                      ...prevProduct,
                      imageFile: event.target.files[0],
                    }));
                  }}
                ></Form.Control>
              </Form.Group>
              {updateProductAlert && (
                <Alert variant="danger" className="mt-4 p-1">
                  Please change at least one field
                </Alert>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="dark"
                onClick={() => {
                  setShowUpdateModal(false);
                  setUpdateProductAlert(false);
                }}
              >
                Close
              </Button>
              <Button variant="success" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal
          show={showDeleteModal}
          onHide={() => {
            setShowDeleteModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="dark"
              onClick={() => {
                setShowDeleteModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteProduct(product.id);
              }}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Inventory;
