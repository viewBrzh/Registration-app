import { Link, useLocation } from "react-router-dom";

function Header() {
  const userRole = localStorage.getItem("userRole");
  const location = useLocation();

  return (
    <header>
      <div className="container-fluid bg-white sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-white navbar-light py-2 py-lg-0">
            <Link to={`/`} className="navbar-brand">
              <img
                className="img-fluid"
                src="/img/Walailak_University_Logo.svg.png"
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
              <div className="navbar-nav ms-auto justify-content-end">
                <Link to={`/`} className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                  Home
                </Link>
                <Link to={`/dashboard`} className={`nav-item nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                  Dashboard
                </Link>
                <Link to={`/about`} className={`nav-item nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
                  About
                </Link>
                <Link to={`/profile`} className={`nav-item nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>
                  Profile
                </Link>
                <Link to={`/course`} className={`nav-item nav-link ${location.pathname === '/course' ? 'active' : ''}`}>
                  Course
                </Link>
                {userRole === 'admin' && (
                  <Link to={`/manage`} className={`nav-item nav-link ${location.pathname === '/manage' ? 'active' : ''}`}>
                    Manage Page
                  </Link>
                )}
                <Link to={`/login`} className={`nav-item nav-link ${location.pathname === '/login' ? 'active' : ''}`}>
                  Login
                </Link>
                <Link to={`/contact`} className={`nav-item nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                  Contact
                </Link>
              </div>
              {/* <div className="border-start ps-4 d-none d-lg-block">
                <button type="button" className="btn btn-sm p-0">
                  <i className="fa fa-search"></i>
                </button>
              </div> */}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
