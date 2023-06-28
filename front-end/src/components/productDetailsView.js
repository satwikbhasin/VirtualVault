import React from "react";
import "bootstrap";
import { Container, Row, Image, Col, Button } from "react-bootstrap";
import productMapInstance from "../services/productCacher";
import "../styling/text-styling.css";
import { useState, useEffect } from "react";

import {
  ArrowLeftIcon,
  LinkIcon,
  CheckCircleFillIcon,
} from "@primer/octicons-react";

const ProductDetailsView = ({ productId }) => {
  const [product, setProduct] = useState(new Map());
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await productMapInstance.fetchAllProducts();
        const fetchedProduct = await productMapInstance.getProductByIdFromMap(
          productId
        );
        setProduct(fetchedProduct);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleGoBack = () => {
    if (window.location.pathname === "/admin/inventory") {
      window.location.href = "/admin/inventory";
    } else {
      window.location.href = "/user/products";
    }
  };

  const copyPageLinkToClipboard = () => {
    navigator.clipboard.writeText("http://localhost:3000/user/product/"+productId).then(() => {
      setShow(true);
    });
  };

  return (
    <>
      <Container>
        <div className="d-flex align-items-center justify-content-center pt-3">
          <Button variant="" className="mr-auto" onClick={handleGoBack}>
            <div className="d-flex align-items-center">
              <ArrowLeftIcon size={35} className="" />
              <span>Back</span>
            </div>
          </Button>
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <h2 className="font-product-heading text-center">{product.name}</h2>
          </div>
        </div>
        <hr />
        <Row className="pt-1 pb-3">
          <Col className="col-5">
            <Image
              style={{
                height: "500px",
                width: "500px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              src={product.image}
              alt=""
            ></Image>
          </Col>
          <Col className="col-7 mt-2">
            <h3 className="font-product-price">${product.price}</h3>
            <p className="mb-5">{product.description}</p>
            <Button
              variant=""
              className="border-dark"
              onClick={copyPageLinkToClipboard}
            >
              {!show ? (
                <div className="align-items-center">
                  <LinkIcon size={20} className="mx-1" />
                  <span>Copy</span>
                </div>
              ) : (
                <div className="align-items-center">
                  <CheckCircleFillIcon size={20} className="mx-1" />
                  <span>Copied</span>
                </div>
              )}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetailsView;
