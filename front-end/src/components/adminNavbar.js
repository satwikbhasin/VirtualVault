import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styling/text-styling.css";
import "../styling/navbar.css";
import { PackageIcon, PasskeyFillIcon } from "@primer/octicons-react";

const adminNavbar = () => {
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/admin/login";
  };
  return (
    <>
      <Navbar className="navbar-dark navbar-first-admin">
        <NavLink className="navbar-brand mx-3" to="/admin/">
          <h1 className="navbar-first-heading">HEALTHKARE</h1>
        </NavLink>
      </Navbar>
      <Navbar className="navbar-second-admin d-flex justify-content-between" fluid>
        <Nav>
          <NavItem className="mx-2">
            <NavLink className="text-light no-underline" to="/admin/inventory">
              <div className="d-flex">
                <PackageIcon size={24} className="mx-2" />
                <h5>Inventory</h5>
              </div>
            </NavLink>
          </NavItem>
          <NavItem className="mx-2">
            <NavLink className="text-light no-underline" to="/admin/contact">
              <div className="d-flex">
                <PasskeyFillIcon size={24} className="mx-2" />
                <h5>Contact</h5>
              </div>
            </NavLink>
          </NavItem>
        </Nav>

        <Nav>
          <NavItem className="mx-3">
            <NavLink className="text-light no-underline">
              <div className="d-flex ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="mx-1"
                  style={{ fill: "white" }}
                >
                  <path d="M3 3.25c0-.966.784-1.75 1.75-1.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.25.25 0 0 0-.25.25v17.5c0 .138.112.25.25.25h5.5a.75.75 0 0 1 0 1.5h-5.5A1.75 1.75 0 0 1 3 20.75Zm16.006 9.5H10.75a.75.75 0 0 1 0-1.5h8.256l-3.3-3.484a.75.75 0 0 1 1.088-1.032l4.5 4.75a.75.75 0 0 1 0 1.032l-4.5 4.75a.75.75 0 0 1-1.088-1.032Z"></path>
                </svg>
                <h5 onClick={handleLogout}>Logout</h5>
              </div>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default adminNavbar;
