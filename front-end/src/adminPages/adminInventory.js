import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import HeadingNavbar from "../components/headingNavbar";
import AdminNavbar from "../components/adminNavbar";
import AddProduct from "./adminAddProduct";
import AllProducts from "./adminAllProducts";
import { XIcon } from "@primer/octicons-react";

const Inventory = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleAddProductCancel = () => {
    setShowAddProduct(false);
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
      <HeadingNavbar />
      <AdminNavbar />
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
        className="m-3"
      >
        <Col>
          {!showAddProduct && (
            <>
              <Button variant="" onClick={refresh}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M3.38 8A9.502 9.502 0 0 1 12 2.5a9.502 9.502 0 0 1 9.215 7.182.75.75 0 1 0 1.456-.364C21.473 4.539 17.15 1 12 1a10.995 10.995 0 0 0-9.5 5.452V4.75a.75.75 0 0 0-1.5 0V8.5a1 1 0 0 0 1 1h3.75a.75.75 0 0 0 0-1.5H3.38Zm-.595 6.318a.75.75 0 0 0-1.455.364C2.527 19.461 6.85 23 12 23c4.052 0 7.592-2.191 9.5-5.451v1.701a.75.75 0 0 0 1.5 0V15.5a1 1 0 0 0-1-1h-3.75a.75.75 0 0 0 0 1.5h2.37A9.502 9.502 0 0 1 12 21.5c-4.446 0-8.181-3.055-9.215-7.182Z"></path>
                </svg>
              </Button>
              <Button variant="" onClick={handleAddProduct}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                >
                  <path d="M11.75 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0V12.5H5.25a.75.75 0 0 1 0-1.5H11V5.25a.75.75 0 0 1 .75-.75Z"></path>
                </svg>
              </Button>
            </>
          )}
        </Col>
      </Row>
      {showAddProduct ? (
        <>
          <Button variant="" className="mx-5 text-danger" onClick={handleAddProductCancel}>
            <XIcon size={24} className="mx-2" />
            Cancel
          </Button>
          <AddProduct />
        </>
      ) : (
        <AllProducts />
      )}
    </>
  );
};

export default Inventory;
