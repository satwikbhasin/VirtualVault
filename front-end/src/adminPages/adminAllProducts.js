import React, { useState, useEffect, useRef } from "react";
import { Alert } from "react-bootstrap";
import { deleteProduct, updateProduct } from "../services/inventoryAPIs";
import { Container, Image, Table, Modal, Button, Form } from "react-bootstrap";
import productMapInstance from "../services/productCacher";
import { TrashIcon, PencilIcon } from "@primer/octicons-react";

const AllProducts = () => {
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
  const [updateProductAlert, setUpdateProductAlert] = useState(false);

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
      <Container
        style={{
          textAlign: "center",
        }}
      >
        <h6 className="mt-4 mb-4">
          Total Products in Inventory: {totalProductCount}
        </h6>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Edit</th>
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
                    variant=""
                    className="text-success"
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
                    <PencilIcon size={24} />
                  </Button>
                </td>
                <td style={{ width: "100px" }}>
                  <Button
                    variant=""
                    className="text-danger"
                    onClick={() => {
                      setProduct({ id: product._id });
                      setShowDeleteModal(true);
                    }}
                  >
                    <TrashIcon size={24} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

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
                <p className="fw-bold">Name</p>
              </Form.Label>
              <Form.Control
                className="mb-3"
                onChange={(event) => {
                  setUpdatedProduct((prevProduct) => ({
                    ...prevProduct,
                    name: event.target.value,
                  }));
                }}
                placeholder={product.name}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <p className="fw-bold">Description</p>
              </Form.Label>
              <Form.Control
                className="mb-3"
                onChange={(event) => {
                  setUpdatedProduct((prevProduct) => ({
                    ...prevProduct,
                    description: event.target.value,
                  }));
                }}
                placeholder={product.description}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <p className="fw-bold">Price</p>
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
                placeholder={`$${product.price}`}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-bold">
                <p>Image</p>
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
    </>
  );
};

export default AllProducts;
