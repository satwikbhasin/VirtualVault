import 'bootstrap/dist/css/bootstrap.css';

function navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
  <a class="navbar-brand" href="/">Healthkare</a>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/">Contact</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/pages/products.js">Products</a>
      </li>
    </ul>
  </div>
</nav>
  );
}

export default navbar;