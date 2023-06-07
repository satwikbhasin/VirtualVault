import "bootstrap/dist/css/bootstrap.css";
import "../styling/navbar.css";
import { NavLink } from "react-router-dom";

function navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
      <NavLink className="navbar-brand" to="/">
        Healthkare
      </NavLink>
      <ul class="navbar-nav">
        <li class="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="active"
            exact
            to="/pages/products.js"
          >
            Products
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default navbar;