import React, { useState, useEffect, useRef, useMemo } from "react";
import { deleteProduct, updateProduct } from "../services/inventoryAPIs";
import { Form, Modal } from "react-bootstrap";
import productMapInstance from "../services/productCacher";
import { MaterialReactTable } from "material-react-table";
import { IconButton, Box, MenuItem, Button } from "@mui/material";
import "../styling/inventoryAllProducts.css";
import "../styling/general.css";

const AllProducts = () => {
  const formRef = useRef(null);

  var [productMap, setProductMap] = useState(new Map());

  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    imageFile: null,
  });
  const [updatedProduct, setUpdatedProduct] = useState({
    id: "",
    name: "",
    description: "",
    imageFile: null,
  });

  const [totalProductCount, setTotalProductCount] = useState(0);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const reset = () => {
    setProduct({
      id: "",
      name: "",
      description: "",
      imageFile: null,
    });
    setUpdatedProduct({
      id: "",
      name: "",
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
    setShowUpdateModal(false);
    console.log(updatedProduct);
    await updateProduct(updatedProduct).then(() => {
      alert("Product updated successfully");
      reset();
      formRef.current.reset();
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
      },
      {
        accessorKey: "img",
        header: "Image",
        size: 100,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              alt="avatar"
              src={row.original.image}
              loading="lazy"
              style={{
                height: "120px",
                width: "80px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 400,
      },
    ],
    []
  );

  return (
    <>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h5 className="text-light fw-bold p-1">
          Product Count: {totalProductCount}
        </h5>
        <MaterialReactTable
          columns={columns}
          data={Array.from(productMap.values())}
          enableRowActions={true}
          onHoveredRowChange={(row) => {
            console.log(row.original);
          }}
          enablePinning={true}
          enableStickyHeader={true}
          className="custom-material-table"
          displayColumnDefOptions={{
            "mrt-row-actions": {
              header: "Actions",
            },
          }}
          muiTableBodyRowProps={{
            hover: false,
            sx: {
              backgroundColor: "#2d383c",
            },
          }}
          muiTablePaperProps={{
            sx: {
              color: "#2d383c",
              backgroundColor: "#2d383c",
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              color: "#DDE6ED",
              backgroundColor: "#2d383c",
            },
          }}
          muiTableDetailPanelProps={{
            sx: {
              backgroundColor: "#2d383c",
              color: "#DDE6ED",
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              color: "#DDE6ED",
              backgroundColor: "#414c50",
            },
          }}
          muiBottomToolbarProps={{
            sx: {
              backgroundColor: "#414c50",
              color: "#DDE6ED",
            },
          }}
          muiTopToolbarProps={{
            sx: {
              backgroundColor: "#414c50",
              color: "#DDE6ED",
            },
          }}
          muiTablePaginationProps={{
            sx: {
              backgroundColor: "#414c50",
              color: "#DDE6ED",
            },
          }}
          initialState={{
            columnOrder: ["name", "img", "description", "mrt-row-actions"],
          }}
          renderRowActionMenuItems={({ row }) => [
            <MenuItem>
              <IconButton
                onClick={() => {
                  setProduct({
                    id: row.original._id,
                    name: row.original.name,
                    description: row.original.description,
                    imageFile: null,
                  });
                  setUpdatedProduct({
                    id: row.original._id,
                    name: row.original.name,
                    description: row.original.description,
                    imageFile: null,
                  });
                  setShowUpdateModal(true);
                }}
                className="text-success"
              >
                <i class="bi bi-pencil"></i>
              </IconButton>
            </MenuItem>,
            <MenuItem>
              <IconButton
                onClick={() => {
                  setProduct({ id: row.original._id });
                  setShowDeleteModal(true);
                }}
                className="text-danger"
              >
                <i class="bi bi-trash3"></i>
              </IconButton>
            </MenuItem>,
          ]}
        />
      </div>

      <Modal
        className="modal-form"
        show={showUpdateModal}
        onHide={() => {
          setShowUpdateModal(false);
        }}
      >
        <Form onSubmit={handleUpdateProduct}>
          <Modal.Header style={{ textAlign: "center" }}>
            <Modal.Title style={{ margin: "auto" }}>Edit Product</Modal.Title>
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              color="primary"
              onClick={() => {
                setShowUpdateModal(false);
              }}
            >
              <div className="d-flex align-items-center">
                <i class="bi bi-x-circle-fill fs-6"></i>
                <span className="ms-1">Cancel</span>
              </div>
            </Button>
            <Button
              variant=""
              className="text-success"
              type="submit"
              disabled={
                (updatedProduct.name.trim() === product.name ||
                  updatedProduct.name === "") &&
                (updatedProduct.description.trim() === product.description ||
                  updatedProduct.description === "") &&
                updatedProduct.imageFile === null
              }
            >
              <div className="d-flex align-items-center">
                <i class="bi bi-save-fill fs-6"></i>
                <span className="ms-1">Save</span>
              </div>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        className="modal-form"
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
            className=""
            variant=""
            onClick={() => {
              setShowDeleteModal(false);
            }}
          >
            <div className="d-flex align-items-center">
              <i class="bi bi-x-circle-fill fs-4"></i>
              <span className="ms-1">Cancel</span>
            </div>
          </Button>
          <Button
            className="text-danger"
            variant=""
            onClick={() => {
              deleteProduct(product.id);
            }}
          >
            <div className="d-flex align-items-center">
              <i class="bi bi-check-circle-fill fs-4"></i>
              <span className="ms-1">Confirm</span>
            </div>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllProducts;
