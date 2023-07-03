import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import AdminNavbar from ".././components/adminNavbar/adminNavbar.js";
import AddProduct from "./inventoryAddProduct";
import AllProducts from "./inventoryAllProducts.js";
import "../styling/addProduct.css";
import ProductsView from "../components/productsView";
import { FormGroup, Switch, FormControlLabel } from "@mui/material";

const Inventory = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>
      <AdminNavbar />
      <div className="mt-3 d-flex justify-content-center">
        <Form>
          <FormGroup>
            <FormControlLabel
              control={<Switch color="success" />}
              onChange={() => setIsEditMode(!isEditMode)}
              labelPlacement="start"
              label={
                <div>
                  <span className="ms-2">Edit</span>
                </div>
              }
            />
          </FormGroup>
        </Form>
      </div>
      {isEditMode ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Col>
              {!showAddProduct && (
                <Button
                  variant=""
                  onClick={() => {
                    setShowAddProduct(true);
                  }}
                  className="utilityButtons mt-2"
                >
                  <i class="bi bi-plus-circle-fill fs-3"></i>
                </Button>
              )}
            </Col>
          </div>
          {showAddProduct ? (
            <>
              <Button
                variant="danger"
                className="mx-4"
                onClick={() => {
                  setShowAddProduct(false);
                }}
              >
                <div className="d-flex align-items-center">
                  <i class="bi bi-x-circle fs-6 me-1"></i>{" "}
                  <span className="ml-1">Cancel</span>
                </div>
              </Button>
              <AddProduct />
            </>
          ) : (
            <AllProducts />
          )}
        </>
      ) : (
        <ProductsView />
      )}
    </>
  );
};

export default Inventory;
