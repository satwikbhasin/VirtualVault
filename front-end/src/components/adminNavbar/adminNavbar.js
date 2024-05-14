import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../../styling/navbar.css";
import "../../styling/theme.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { handleLogout } from "./helper";

const AdminNavbar = () => {
  return (
    <div>
      <Navbar className="navbar-dark navbar-first-admin primary-bg">
        <NavLink className="navbar-brand ms-3" to="/admin/">
          <h1 className="navbar-first-heading">VirtualVault</h1>
        </NavLink>
      </Navbar>
      <Navbar
        className="navbar-second-admin d-flex justify-content-between secondary-bg"
        fluid
      >
        <Nav>
          <NavItem>
            <NavLink
              className={
                window.location.pathname === "/admin/inventory" ||
                window.location.pathname === "/admin/inventory/"
                  ? "active-link"
                  : "inactive-link"
              }
              to="/admin/inventory"
            >
              <div className="d-flex align-items-center justify-content-center">
                <i class="bi bi-boxes fs-4 me-1"></i>
                <span className="mt-2">
                  <h5>Inventory</h5>
                </span>
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                window.location.pathname === "/admin/contact" ||
                window.location.pathname === "/admin/contact/"
                  ? "active-link"
                  : "inactive-link"
              }
              to="/admin/contact"
            >
              <div className="d-flex align-items-center justify-content-center">
                <i class="bi bi-person-gear fs-4 me-1"></i>
                <span className="mt-2">
                  <h5>Contact</h5>
                </span>
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                window.location.pathname === "/admin/inquiries" ||
                window.location.pathname === "/admin/inquiries/"
                  ? "active-link"
                  : "inactive-link"
              }
              to="/admin/inquiries"
            >
              <div className="d-flex align-items-center justify-content-center">
                <i class="bi bi-list-ul fs-4 me-1"></i>
                <span className="mt-2">
                  <h5>Inquires</h5>
                </span>
              </div>
            </NavLink>
          </NavItem>
        </Nav>

        <Nav>
          <NavItem>
            <NavLink className="logout-link no-underline">
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
    </div>
  );
};

export default AdminNavbar;
