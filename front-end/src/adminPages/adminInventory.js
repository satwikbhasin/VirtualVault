import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import AdminNavbar from "../components/adminNavbar";
import AddProduct from "./inventoryAddProduct";
import AllProducts from "./inventoryAllProducts";
import { XIcon } from "@primer/octicons-react";
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
          onlabel={<span style={{ padding: "4px" }}>Edit</span>}
          offlabel={<span style={{ padding: "4px" }}>Edit</span>}
          width={80}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                  >
                    <path d="M11.75 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0V12.5H5.25a.75.75 0 0 1 0-1.5H11V5.25a.75.75 0 0 1 .75-.75Z"></path>
                  </svg>
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
                  <XIcon size={24} />
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
