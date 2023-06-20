import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavItem, Col } from "react-bootstrap";
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
    <Navbar className="navbar-admin">
      <NavItem>
        <NavLink className="text-light no-underline" to="/admin/inventory">
          <div className="d-flex nav-tabs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="mx-1"
              style={{ fill: "white" }}
            >
              <path d="M12.876.64V.639l8.25 4.763c.541.313.875.89.875 1.515v9.525a1.75 1.75 0 0 1-.875 1.516l-8.25 4.762a1.748 1.748 0 0 1-1.75 0l-8.25-4.763a1.75 1.75 0 0 1-.875-1.515V6.917c0-.625.334-1.202.875-1.515L11.126.64a1.748 1.748 0 0 1 1.75 0Zm-1 1.298L4.251 6.34l7.75 4.474 7.75-4.474-7.625-4.402a.248.248 0 0 0-.25 0Zm.875 19.123 7.625-4.402a.25.25 0 0 0 .125-.216V7.639l-7.75 4.474ZM3.501 7.64v8.803c0 .09.048.172.125.216l7.625 4.402v-8.947Z"></path>
            </svg>
            <h5>Inventory</h5>
          </div>
        </NavLink>
      </NavItem>
      <NavItem className="p-3">
        <NavLink className="text-light no-underline">
          <div className="d-flex nav-tabs ml-auto">
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
    </Navbar>
  );
};

export default adminNavbar;
