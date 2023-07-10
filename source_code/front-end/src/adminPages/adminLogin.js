import React, { useState } from "react";
import { Button, Form, Col, Alert, NavLink, Navbar } from "react-bootstrap";
import { loginAdmin } from "../services/authenticationAPIs";
import "../styling/adminLogin.css";
import "../styling/buttons.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminLogin = ({ route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTyped, setPasswordTyped] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await authenticateAdmin(email, password, route);

    setEmail("");
    setPassword("");
  };

  const authenticateAdmin = async (email, password, route) => {
    try {
      loginAdmin(email, password).then((response) => {
        if (response.data.message === "success") {
          localStorage.setItem("token", response.data.token);
          window.location.href = route;
          setAlertVisible(false);
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
      <Navbar className="navbar-dark navbar-first-admin fixed-top primary-bg">
        <NavLink className="navbar-brand text-center ms-3" to="/admin/">
          <h1 className="navbar-first-heading">HEALTHKARE</h1>
        </NavLink>
      </Navbar>
      <div className="login-form-bg-holder">
        <div className="login-form-bg">
        <div className="login-form-background-overlay">
          <div className="login-form-box">
            <div>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="email" className="mb-4">
                    <Form.Label className="text-light">
                      <div className="d-flex align-items-center">
                        <i class="bi bi-envelope fs-4 me-1"></i>
                        <span className="text-light">Email</span>
                      </div>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={email.toLowerCase()}
                      onChange={(event) => setEmail(event.target.value)}
                      style={{ width: "230px" }}
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label className="text-light">
                      <div className="d-flex align-items-center">
                        <i class="bi bi-key fs-4 me-1"></i>
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
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                          className="password-toggle"
                        >
                          {showPassword ? (
                            <i class="bi bi-eye-fill fs-6"></i>
                          ) : (
                            <i class="bi bi-eye-slash-fill fs-6"></i>
                          )}
                        </Button>
                      )}
                    </div>
                  </Form.Group>
                  {alertVisible && (
                    <Alert variant="danger" className="mt-4 mb-1 p-2">
                      Invalid Credentials
                    </Alert>
                  )}
                  <Button
                    className="mt-4 login-button"
                    type="submit"
                    disabled={password === "" || email === ""}
                  >
                    <i class="bi bi-door-closed fs-5 me-1"></i>
                    <span className="">Login</span>
                  </Button>
                </Form>
              </Col>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
