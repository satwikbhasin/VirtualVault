import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import AdminNavbar from ".././components/adminNavbar/adminNavbar.js";
import AddProduct from "./inventoryAddProduct";
import AllProducts from "./inventoryAllProducts.js";
import "../styling/addProduct.css";
import "../styling/theme.css";
import "../styling/buttons.css";
import ProductsView from "../components/productsView";
import { FormGroup, Switch, FormControlLabel } from "@mui/material";

const Inventory = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="primary-bg">
      <AdminNavbar />
      <div className="justify-content-center align-content-center d-flex p-2 page-header">
        <Form className="edit-switch">
          <FormGroup>
            <FormControlLabel
              control={<Switch className="edit-switch" />}
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
            className="ternary-bg"
          >
            <Col>
              {!showAddProduct && (
                <Button
                  className="add-product-button"
                  onClick={() => {
                    setShowAddProduct(true);
                  }}
                >
                  <i class="bi bi-plus-circle-fill fs-3"></i>
                </Button>
              )}
            </Col>
          </div>
          {showAddProduct ? (
            <>
              <Button
                variant=""
                className="cancel-button"
                onClick={() => {
                  setShowAddProduct(false);
                }}
              >
                <div className="">
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
    </div>
  );
};

export default Inventory;
