import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Container,
  Image,
  Table,
  Modal,
  Button,
  Form,
  Tab,
  Tabs,
} from "react-bootstrap";
import productMapInstance from "../services/productsToMap";

const Inventory = () => {
  var [productMap, setProductMap] = useState(new Map());
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedId, setUpdatedId] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await productMapInstance.initialize();
        setProductMap(await productMapInstance.getAllProductsFromMap());
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [productMap]);

  const addProduct = () => {
    Axios.post("http://localhost:3001/products/insert/", {
      productName: productName,
      productPrice: productPrice,
      productImage: productImage,
      productDescription: productDescription,
    });
    alert("Item Updated! See on 'See Products' Tab.");
  };

  const updateProduct = () => {
    Axios.put("http://localhost:3001/products/update/", {
      id: updatedId,
      updatedName: updatedName,
      updatedPrice: updatedPrice,
      updatedDescription: updatedDescription,
    });
    alert("Item Added! See on 'See Products' Tab.");
  };

  return (
    <Container>
      <Tabs defaultActiveKey="seeProducts" className="m-4 text-primary" fill>
        <Tab
          eventKey="seeProducts"
          title="See Products"
          className="text-center"
        >
          <Table className="m-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
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
                  <td style={{ width: "400px" }}> {product.description}</td>
                  <td style={{ width: "200px" }}>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="addProduct" title="Add a Product">
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <Form>
              <Form.Group>
                <Form.Label>Product Name:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => setProductName(event.target.value)}
                  className="mb-2"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Product Price:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => setProductPrice(event.target.value)}
                  className="mb-2"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Product Image:</Form.Label>
                <Form.Control
                  type="file"
                  className="mb-4"
                  onChange={(event) => setProductImage(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Product Description:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) =>
                    setProductDescription(event.target.value)
                  }
                  className="mb-2"
                />
              </Form.Group>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="dark" onClick={addProduct}>
                  Add Product
                </Button>
              </div>
            </Form>
          </Container>
        </Tab>
        <Tab
          eventKey="updateProduct"
          title="Update a Product"
          className="text-center"
        >
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Update</th>
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
                  <td style={{ width: "100px" }}>{product.price}</td>
                  <td style={{ width: "100px" }}>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => {
                        handleShow();
                        setUpdatedId(product._id);
                      }}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
                <p className="fw-bold">New Name:</p>
              </Form.Label>
              <Form.Control
                className="mb-3"
                onChange={(event) => setUpdatedName(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <p className="fw-bold">New Price:</p>
              </Form.Label>
              <Form.Control
                onChange={(event) => setUpdatedPrice(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <p className="fw-bold">New Description:</p>
              </Form.Label>
              <Form.Control
                onChange={(event) => setUpdatedDescription(event.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              updateProduct();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Inventory;
