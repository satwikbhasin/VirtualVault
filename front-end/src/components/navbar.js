import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import '../styling/navbar.css';

function navbar() {
  return (
    <Navbar
      className="navbar-expand-lg navbar-dark bg-dark p-3"
    >
      <NavLink className="navbar-brand" to="/">
        Healthkare
      </NavLink>
      <NavItem>
        <NavLink
          className="text-light nav-link"
          activeClassName="active"
          exact
          to="/products"
        >
          Products
        </NavLink>
      </NavItem>
    </Navbar>
  );
}

export default navbar;
