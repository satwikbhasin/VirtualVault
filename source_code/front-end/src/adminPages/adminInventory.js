import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import AdminNavbar from ".././components/adminNavbar/adminNavbar.js";
import AddProduct from "./inventoryAddProduct";
import AddCategory from "./inventoryAddCategory";
import AllProducts from "./inventoryAllProducts.js";
import "../styling/addProduct.css";
import "../styling/theme.css";
import "../styling/buttons.css";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import ProductsView from "../components/products";
import { FormGroup, Switch, FormControlLabel } from "@mui/material";

const Inventory = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
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
            className="primary-bg mb-3 mt-3"
          >
            {!showAddProduct && !showAddCategory && (
              <Button
                className="add-product-category-button"
                onClick={() => {
                  setShowAddProduct(true);
                }}
              >
                <div className="d-flex align-content-center">
                  <InventoryIcon />
                  <span className="ms-1">Add Product</span>
                </div>
              </Button>
            )}

            {!showAddCategory && !showAddProduct && (
              <Button
                className="add-product-category-button"
                onClick={() => {
                  setShowAddCategory(true);
                }}
              >
                <div className="d-flex align-content-center">
                  <CategoryIcon />
                  <span className="ms-1">Add Category</span>
                </div>
              </Button>
            )}
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
          ) : showAddCategory ? (
            <>
              <Button
                variant=""
                className="cancel-button"
                onClick={() => {
                  setShowAddCategory(false);
                }}
              >
                <div className="">
                  <i class="bi bi-x-circle fs-6 me-1"></i>{" "}
                  <span className="ml-1">Cancel</span>
                </div>
              </Button>
              <AddCategory />
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
