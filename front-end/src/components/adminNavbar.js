import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styling/text-styling.css";
import "../styling/navbar.css";

const adminNavbar = () => {
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/admin/login";
  };
  return (
    <Navbar className="navbar-second px-3 sm py-0">
      <NavItem>
        <NavLink className="text-light no-underline" to="/admin/inventory">
          <h5 className="nav-tabs">Inventory</h5>
        </NavLink>
      </NavItem>
      <NavItem className="m-3">
        <NavLink className="text-light no-underline">
          <h5 className="nav-tabs" onClick={handleLogout}>
            Logout
          </h5>
        </NavLink>
      </NavItem>
    </Navbar>
  );
};

export default adminNavbar;
