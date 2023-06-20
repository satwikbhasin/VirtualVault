import React, { useState } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import HeadingNavbar from "../components/headingNavbar";
import Axios from "axios";
import { MailIcon, SignInIcon, KeyIcon } from "@primer/octicons-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await authenticateAdmin(email, password);

    setEmail("");
    setPassword("");
  };

  const authenticateAdmin = async (email, password) => {
    try {
      await Axios.post("http://localhost:3001/users/login", {
        email: email,
        password: password,
      }).then((response) => {
        if (response.data.message === "success") {
          setAlertVisible(false);
          localStorage.setItem("token", response.data.token);
          window.location.href = "/admin/home";
        } else {
          console.log(response.data.message);
          setAlertVisible(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HeadingNavbar />
      <div>
        <Row
          style={{
            textAlign: "center",
          }}
          className="mt-5 mb-3"
        >
          <Col>
            <h2>Admin Login</h2>
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="email" className="mb-4">
                <Form.Label>
                  <MailIcon size={24} className="mx-1" />
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>
                  <KeyIcon size={24} className="mx-1" />
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              {alertVisible && (
                <Alert variant="danger" className="mt-4 p-1">
                  Invalid Credentials
                </Alert>
              )}
              <Button className="mt-2 btn-dark" type="submit">
                <SignInIcon size={24} />
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdminLogin;
