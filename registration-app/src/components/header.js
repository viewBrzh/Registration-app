import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import apiUrl from "../api/apiConfig";
import NotiCount from "./noti";

function Header() {
  const userRole = localStorage.getItem("userRole");
  const userData = localStorage.getItem("userData");
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const [notification, setNotification] = useState(0);

  const isAuthenticated = userData && Object.keys(userData).length !== 0;

  useEffect(() => {
    // Get user data from local storage
    const storedUserData = localStorage.getItem("userData");
    setUser(JSON.parse(storedUserData));

    const noti = JSON.parse(localStorage.getItem("noti"));

    if (noti) {
      setNotification(noti.length);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
    localStorage.removeItem("noti");
    window.location.reload();
  };


  const toggleDrop = () => {
    setIsOpen(false);
  }

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
                  to={`/home`}
                  className={`nav-item nav-link ${location.pathname === "/home" ? "active" : ""
                    }`}
                >
                  Home
                </Link>
                {userRole === "teacher" && (
                  <Link
                    to={`/dashboard`}
                    className={`nav-item nav-link ${location.pathname === "/dashboard" ? "active" : ""
                      }`}
                  >
                    Dashboard
                  </Link>
                )}
                {userRole === "executive" && (
                  <Link
                    to={`/dashboardExecutive`}
                    className={`nav-item nav-link ${location.pathname === "/dashboardExecutive" ? "active" : ""
                      }`}
                  >
                    Dashboard
                  </Link>
                )}
                {userRole === "admin" && (
                  <Link
                    to={`/dashboardAdmin`}
                    className={`nav-item nav-link ${location.pathname === "/dashboardAdmin" ? "active" : ""
                      }`}
                  >
                    Dashboard
                  </Link>
                )}
                {userRole !== "admin" && (
                  <Link
                    to={`/about`}
                    className={`nav-item nav-link ${location.pathname === "/about" ? "active" : ""
                      }`}
                  >
                    About
                  </Link>
                )}

                <Link
                  to={`/course`}
                  className={`nav-item nav-link ${location.pathname === "/course" ? "active" : ""
                    }`}
                >
                  Courses
                </Link>
                {userRole === "admin" && (
                  <Link
                    to={`/manage`}
                    className={`nav-item nav-link ${location.pathname === "/manage" ? "active" : ""
                      }`}
                  >
                    Manage Page
                  </Link>
                )}
                {userRole !== "admin" && (
                  <Link
                    to={`/contact`}
                    className={`nav-item nav-link ${location.pathname === "/contact" ? "active" : ""
                      }`}
                  >
                    Contact
                  </Link>
                )}

                {!isAuthenticated && (
                  <Link
                    to={`/login`}
                    className={`nav-item nav-link ${location.pathname === "/login" ? "active" : ""
                      }`}
                  >
                    Login
                  </Link>
                )}

                {isAuthenticated && (
                  <a
                    className="nav-item nav-link justify-content-end"
                    style={{ marginTop: '-10px', marginLeft: 'auto' }}
                  >
                    <a
                      className="btn d-flex"
                      type="button"
                      id="dropdownMenuButton"
                      aria-expanded={"false"}
                      style={{ alignItems: 'center', fontWeight: 'bold' }}
                      onClick={toggleDrop}
                    >
                      {user?.username}
                      <div style={{ display: 'inline-block', width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', marginLeft: 5 }}>
                        <img
                          className='avatar-'
                          src={`${apiUrl}/profiles/${user?.image}`}
                          alt="User Avatar"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          
                        />
                        {notification > 0 && <div className="red-dot">{notification > 9 ? '9+' : notification}</div>}
                      </div>
                    </a>

                    <ul
                      className={`dropdown-menu dropdown-menu-end ${isOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        {<Link
                          to={`/profile`}
                          className={`dropdown-item ${location.pathname === "/profile" ? "active" : ""}`}
                        >
                          Profile
                        </Link>}
                      </li>
                      <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link
                          to="/notification"
                          className={`dropdown-item ${location.pathname === "/notification" ? "active" : ""}`}
                          style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                        >
                          <span>Notification</span>
                          <a style={{ marginLeft: 'auto', marginRight: '0px' }}><NotiCount /></a>
                        </Link>
                      </li>

                      <li onClick={handleLogout}>
                        <Link
                          to={`/`}
                          className={`dropdown-item ${location.pathname === "/" ? "active" : ""}`}
                        >
                          Log-out
                        </Link>
                      </li>
                    </ul>
                  </a>
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
