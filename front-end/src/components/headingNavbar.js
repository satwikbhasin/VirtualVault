import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styling/text-styling.css";
import "../styling/navbar.css";

function headingNavbar() {
  return (
    <>
      <Navbar className="navbar-dark navbar-first">
        <NavLink className="navbar-brand text-center" to="/">
          <h1 className="navbar-first-heading">Healthkare</h1>
        </NavLink>
      </Navbar>
    </>
  );
}

export default headingNavbar;
