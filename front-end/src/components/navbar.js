import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styling/text-styling.css";
import "../styling/navbar.css";

function navbar() {
  return (
    <>
      <Navbar className="navbar-dark navbar-first px-3 py-3">
        <NavLink className="navbar-brand" to="/">
          <h1 className="navbar-first-heading">Healthkare</h1>
        </NavLink>
      </Navbar>
      <Navbar className="navbar-second px-3 sm py-0">
        <NavItem className="m-2">
          <NavLink className="text-light no-underline" to="/products">
            <h5 className="nav-tabs">Products</h5>
          </NavLink>
        </NavItem>
        <NavItem className="m-2">
          <NavLink className="text-light no-underline" to="/contact">
            <h5 className="nav-tabs">Contact</h5>
          </NavLink>
        </NavItem>
        <NavItem className="m-2">
          <NavLink className="text-light no-underline" to="/inventory">
            <h5 className="nav-tabs">Inventory</h5>
          </NavLink>
        </NavItem>
      </Navbar>
    </>
  );
}

export default navbar;
