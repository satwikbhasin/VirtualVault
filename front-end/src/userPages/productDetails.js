import React from "react";
import "bootstrap";
import { useParams } from "react-router-dom";
import { Container, Row, Image, Col, Button } from "react-bootstrap";
import productMapInstance from "../services/productCacher";
import { Link } from "react-router-dom";
import "../styling/text-styling.css";
import { useState, useEffect } from "react";
import HeadingNavbar from "../components/headingNavbar.js";
import UserNavbar from "../components/userNavbar.js";
import {
  ArrowLeftIcon,
  LinkIcon,
  CheckCircleFillIcon,
} from "@primer/octicons-react";

const ProductDetails = () => {
  const [product, setProduct] = useState(new Map());
  const { productId } = useParams();
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

  const copyPageLinkToClipboard = () => {
    const pageLink = window.location.href;
    navigator.clipboard
      .writeText(pageLink)
      .then(() => {
        setShow(true);
      })
  };

  return (
    <>
      <HeadingNavbar />
      <UserNavbar />
      <Container>
        <Row className="mt-3">
          <Link to="/user/products">
            <Button variant="">
              <div className="d-flex align-items-center">
                <ArrowLeftIcon size={35} className="mx-2" />
                <span>Back</span>
              </div>
            </Button>
          </Link>
        </Row>
        <Row className="text-center">
          <h2 className="font-product-heading">{product.name}</h2>
        </Row>
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

export default ProductDetails;
