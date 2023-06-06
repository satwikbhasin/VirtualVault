import "bootstrap/dist/css/bootstrap.css";
import "../styling/navbar.css";

function navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
      <a class="navbar-brand" href="/">
        Healthkare
      </a>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/pages/products.js">
              Products
            </a>
          </li>
        </ul>
    </nav>
  );
}

export default navbar;
