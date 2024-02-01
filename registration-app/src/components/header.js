import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <div className="container-fluid bg-white sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-white navbar-light py-2 py-lg-0">
            <Link to={`/`} className="navbar-brand">
              <img
                className="img-fluid"
                src="img/Walailak_University_Logo.svg.png"
                alt="Logo"
              />
            </Link>
            <button
              type="button"
              className="navbar-toggler ms-auto me-0"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto">
                <Link to={`/`} className="nav-item nav-link">
                  Home
                </Link>
                <Link to={`/about`} className="nav-item nav-link">
                  About
                </Link>
                <Link to={`/product`} className="nav-item nav-link">
                  Products
                </Link>
                <Link to={`/store`} className="nav-item nav-link">
                  Course
                </Link>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </a>
                  <div className="dropdown-menu bg-light rounded-0 m-0">
                    <a href="feature.html" className="dropdown-item">
                      Features
                    </a>
                    <a href="blog.html" className="dropdown-item">
                      Blog Article
                    </a>
                    <a href="testimonial.html" className="dropdown-item">
                      Testimonial
                    </a>
                    <a href="404.html" className="dropdown-item">
                      404 Page
                    </a>
                  </div>
                </div>
                <Link to={`/contact`} className="nav-item nav-link">
                  Contact
                </Link>
              </div>
              <div className="border-start ps-4 d-none d-lg-block">
                <button type="button" className="btn btn-sm p-0">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
