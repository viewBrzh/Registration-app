import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const userRole = localStorage.getItem("userRole");
  const userData = localStorage.getItem("userData");
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState("");

  const isAuthenticated = userData && Object.keys(userData).length !== 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
  };

  return (
    <header className="sticky-top">
      <div className="container-fluid bg-white sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-white navbar-light py-2 py-lg-0">
            <Link to={`/`} className="navbar-brand">
              <img
                className="img-fluid logo-wu"
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
                <Link
                  to={`/`}
                  className={`nav-item nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  to={`/dashboard`}
                  className={`nav-item nav-link ${
                    location.pathname === "/dashboard" ? "active" : ""
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to={`/dashboardExecutive`}
                  className={`nav-item nav-link ${
                    location.pathname === "/dashboardExecutive" ? "active" : ""
                  }`}
                >
                  Dashboard Executive
                </Link>
                <Link
                  to={`/dashboardAdmin`}
                  className={`nav-item nav-link ${
                    location.pathname === "/dashboardAdmin" ? "active" : ""
                  }`}
                >
                  Dashboard Admin
                </Link>
                {userRole !== "admin" && (
                  <Link
                    to={`/about`}
                    className={`nav-item nav-link ${
                      location.pathname === "/about" ? "active" : ""
                    }`}
                  >
                    About
                  </Link>
                )}

                <Link
                  to={`/course`}
                  className={`nav-item nav-link ${
                    location.pathname === "/course" ? "active" : ""
                  }`}
                >
                  Course
                </Link>
                {userRole === "admin" && (
                  <Link
                    to={`/manage`}
                    className={`nav-item nav-link ${
                      location.pathname === "/manage" ? "active" : ""
                    }`}
                  >
                    Manage Page
                  </Link>
                )}
                {userRole !== "admin" && (
                  <Link
                    to={`/contact`}
                    className={`nav-item nav-link ${
                      location.pathname === "/contact" ? "active" : ""
                    }`}
                  >
                    Contact
                  </Link>
                )}
                {!isAuthenticated && (
                  <Link
                    to={`/login`}
                    className={`nav-item nav-link ${
                      location.pathname === "/login" ? "active" : ""
                    }`}
                  >
                    Login
                  </Link>
                )}

                {isAuthenticated && (
                  <div className="nav-item  nav-link">
                    <button
                      className="btn"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ fontWeight: "bold" }}
                    >
                      User <i className="fas fa-user"></i>
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <Link
                          to={`/profile`}
                          className={`dropdown-item ${
                            location.pathname === "/profile" ? "active" : ""
                          }`}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Log-out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
