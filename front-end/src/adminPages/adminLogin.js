import React, { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Alert,
  NavLink,
  Navbar,
} from "react-bootstrap";
import Axios from "axios";
import {
  MailIcon,
  SignInIcon,
  KeyIcon,
  EyeIcon,
  EyeClosedIcon,
} from "@primer/octicons-react";
import "../styling/adminLogin.css";

const AdminLogin = ({ route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTyped, setPasswordTyped] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await authenticateAdmin(email, password);

    setEmail("");
    setPassword("");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
          window.location.href = route;
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
      <Navbar className="navbar-dark navbar-first-admin">
        <NavLink className="navbar-brand text-center mx-3" to="/admin/">
          <h1 className="navbar-first-heading">HEALTHKARE</h1>
        </NavLink>
      </Navbar>
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
                <div className="d-flex align-items-center">
                  <MailIcon size={24} className="me-2" />
                  <span>Email</span>
                </div>
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={{ width: "230px" }}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>
                <div className="d-flex align-items-center">
                  <KeyIcon size={24} className="me-2" />
                  <span>Password</span>
                </div>
              </Form.Label>
              <div className="password-input">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onInput={() => {
                    setPasswordTyped(true);
                    setPassword("");
                  }}
                  onChange={(event) => setPassword(event.target.value)}
                  style={{ paddingRight: "px" }}
                />
                {passwordTyped && password !== "" && (
                  <Button
                    variant=""
                    onClick={toggleShowPassword}
                    className="password-toggle"
                  >
                    {showPassword ? (
                      <EyeIcon size={18} />
                    ) : (
                      <EyeClosedIcon size={18} />
                    )}
                  </Button>
                )}
              </div>
            </Form.Group>
            {alertVisible && (
              <Alert variant="danger" className="mt-4 p-2">
                Invalid Credentials
              </Alert>
            )}
            <Button
              className="mt-3 btn-dark"
              type="submit"
              disabled={password === "" || email === ""}
            >
              <div className="d-flex">
                <SignInIcon size={24} />
                <span className="ms-2">Login</span>
              </div>
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AdminLogin;
