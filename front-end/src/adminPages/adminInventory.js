import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import AdminNavbar from "../components/adminNavbar";
import AddProduct from "./inventoryAddProduct";
import AllProducts from "./inventoryAllProducts";
import "../styling/addProduct.css";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import ProductsView from "../components/productsView";

const Inventory = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleAddProductCancel = () => {
    setShowAddProduct(false);
  };

  return (
    <>
      <AdminNavbar />
      <div className="mt-3 d-flex justify-content-center">
        <BootstrapSwitchButton
          checked={false}
          onlabel={
            <div>
              <i class="bi bi-pencil fs-6"></i>
              <span className="ms-1">Edit</span>
            </div>
          }
          offlabel={
            <div>
              <i class="bi bi-pencil fs-6"></i>
              <span className="ms-1">Edit</span>
            </div>
          }
          width={90}
          onstyle="dark"
          onChange={() => setIsEditMode(!isEditMode)}
        />
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
                  onClick={handleAddProduct}
                  className="utilityButtons mt-2"
                >
                  <i class="bi bi-plus-circle-fill fs-3"></i>{" "}
                </Button>
              )}
            </Col>
          </div>
          {showAddProduct ? (
            <>
              <Button
                variant="danger"
                className="mx-4"
                onClick={handleAddProductCancel}
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
