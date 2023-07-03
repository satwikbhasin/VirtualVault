import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../../styling/text-styling.css";
import "../../styling/navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { handleLogout } from "./helper";

const adminNavbar = () => {
  return (
    <>
      <Navbar className="navbar-dark navbar-first-admin">
        <NavLink className="navbar-brand ms-3" to="/admin/">
          <h1 className="navbar-first-heading">HEALTHKARE</h1>
        </NavLink>
      </Navbar>
      <Navbar
        className="navbar-second-admin d-flex justify-content-between"
        fluid
      >
        <Nav>
          <NavItem className="ms-3">
            <NavLink className="text-light no-underline" to="/admin/inventory">
              <div className="d-flex align-items-center justify-content-center">
                <i class="bi bi-boxes fs-4 me-1"></i>
                <span className="mt-2">
                  <h5>Inventory</h5>
                </span>
              </div>
            </NavLink>
          </NavItem>
          <NavItem className="ms-3">
            <NavLink className="text-light no-underline" to="/admin/contact">
              <div className="d-flex align-items-center justify-content-center">
                <i class="bi bi-person-gear fs-4 me-1"></i>
                <span className="mt-2">
                  <h5>Contact</h5>
                </span>
              </div>
            </NavLink>
          </NavItem>
        </Nav>

        <Nav>
          <NavItem className="me-3">
            <NavLink className="text-light no-underline">
              <div className="d-flex align-items-center justify-content-center">
                <i class="bi bi-door-open fs-4 me-1"></i>
                <span className="mt-2">
                  <h5 onClick={handleLogout}>Logout</h5>
                </span>
              </div>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default adminNavbar;
