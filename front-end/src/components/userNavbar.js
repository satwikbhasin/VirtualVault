import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styling/text-styling.css";
import "../styling/navbar.css";

const userNavbar = () => {
  return (
    <Navbar className="navbar-second px-3 sm py-0">
      <NavItem className="">
        <NavLink className="text-light no-underline" to="/user/products">
          <h5 className="nav-tabs">Products</h5>
        </NavLink>
      </NavItem>
      <NavItem className="m-3">
        <NavLink className="text-light no-underline" to="/user/contact">
          <h5 className="nav-tabs">Contact</h5>
        </NavLink>
      </NavItem>
    </Navbar>
  );
};

export default userNavbar;
