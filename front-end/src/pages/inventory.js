import React, { useState, useEffect, useRef } from "react";
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
  const formRef = useRef(null);
  var [productMap, setProductMap] = useState(new Map());
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImageFile, setProductImageFile] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedId, setUpdatedId] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const handleRefresh = (e) => {
    e.preventDefault();
    window.location.reload();
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();

    addProduct();

    formRef.current.reset();
  };

  const addProduct = () => {
    try {
      Axios.post("http://localhost:3001/products/insert/", {
        productName: productName,
        productPrice: "$" + productPrice,
        productImage: "no-link",
        productDescription: productDescription,
      })
        .then((response) => {
          uploadImage(response.data._id);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = (mongoProductId) => {
    try {
      const imageData = new FormData();
      imageData.append("image", productImageFile);
      Axios.post(
        "http://localhost:3001/products/uploadImage/" + mongoProductId,
        imageData
      )
        .then((response) => {
          updateProductImage(mongoProductId, response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = () => {
    try {
      Axios.put("http://localhost:3001/products/update/", {
        id: updatedId,
        updatedName: updatedName,
        updatedPrice: updatedPrice,
        updatedDescription: updatedDescription,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProductImage = (mongoProductId, imageLink) => {
    try {
      Axios.put("http://localhost:3001/products/updateImage/", {
        id: mongoProductId,
        image: imageLink,
      }).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Tabs defaultActiveKey="allProducts" className="m-4 text-primary" fill>
        <Tab
          eventKey="allProducts"
          title="All Products"
          className="text-center"
        >
          <Button
            onClick={handleRefresh}
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
        <Tab eventKey="addProduct" title="Add a Product">
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label className="fw-bold">Name:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => setProductName(event.target.value)}
                  className="mb-4"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-bold">Description:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) =>
                    setProductDescription(event.target.value)
                  }
                  className="mb-4"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-bold">Price:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => setProductPrice(event.target.value)}
                  className="mb-4"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="fw-bold">Image:</Form.Label>
                <Form.Control
                  type="file"
                  className="mb-4 input"
                  onChange={(event) => {
                    setProductImageFile(event.target.files[0]);
                  }}
                ></Form.Control>
              </Form.Group>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="dark" type="submit">
                  Add Product
                </Button>
              </div>
            </Form>
          </Container>
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
