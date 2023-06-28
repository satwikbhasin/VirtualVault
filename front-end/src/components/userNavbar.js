import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styling/text-styling.css";
import "../styling/navbar.css";
import { PackageIcon, PersonIcon } from "@primer/octicons-react";

const userNavbar = () => {
  return (
    <>
      <Navbar className="navbar-dark navbar-first-user">
        <NavLink className="navbar-brand text-center mx-3" to="/user/">
          <h1 className="navbar-first-heading">HEALTHKARE</h1>
        </NavLink>
      </Navbar>
      <Navbar className="navbar-second-user justify-content-left">
        <NavItem className="mx-2">
          <NavLink
            className="text-light no-underline nav-tabs"
            to="/user/products"
          >
            <div className="d-flex">
              <PackageIcon size={24} className="mx-2" />
              <h5>Products</h5>
            </div>
          </NavLink>
        </NavItem>
        <NavItem className="mx-2">
          <NavLink
            className="text-light no-underline nav-tabs"
            to="/user/contact"
          >
            <div className="d-flex">
              <PersonIcon size={24} className="mx-1" />
              <h5>Contact</h5>
            </div>
          </NavLink>
        </NavItem>
      </Navbar>
    </>
  );
};

export default userNavbar;
