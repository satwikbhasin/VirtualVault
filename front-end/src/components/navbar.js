import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styling/text-styling.css";

function navbar() {
  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-1">
        <NavLink className="navbar-brand" to="/">
          <h2>Healthkare</h2>
        </NavLink>
      </Navbar>
      <Navbar className="navbar-dark bg-secondary px-3 sm py-0">
        <NavItem className="nav-tabs">
          <NavLink
            className="text-light"
            activeClassName="active"
            exact
            to="/products"
            style={{ textDecoration: "none" }}
          >
            <h6>Products</h6>
          </NavLink>
        </NavItem>
        <NavItem className="nav-tabs m-3">
          <NavLink
            className="text-light"
            activeClassName="active"
            exact
            to="/contact"
            style={{ textDecoration: "none" }}
          >
            <h6>Contact</h6>
          </NavLink>
        </NavItem>
      </Navbar>
    </>
  );
}

export default navbar;
