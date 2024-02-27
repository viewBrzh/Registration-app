import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="fixed-top header">
      {/* top header */}
      <div className="top-header py-2 bg-white">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-lg-4 text-center text-lg-left">
              <a className="text-color mr-3" href="callto:+443003030266">
                <strong>CALL</strong> +44 300 303 0266
              </a>
              <ul className="list-inline d-inline">
                <li className="list-inline-item mx-0">
                  <a className="d-inline-block p-2 text-color" href="#">
                    <i className="ti-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item mx-0">
                  <a className="d-inline-block p-2 text-color" href="#">
                    <i className="ti-twitter-alt"></i>
                  </a>
                </li>
                <li className="list-inline-item mx-0">
                  <a className="d-inline-block p-2 text-color" href="#">
                    <i className="ti-linkedin"></i>
                  </a>
                </li>
                <li className="list-inline-item mx-0">
                  <a className="d-inline-block p-2 text-color" href="#">
                    <i className="ti-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-8 text-center text-lg-right">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a
                    className="text-uppercase text-color p-sm-2 py-2 px-0 d-inline-block"
                    href="notice.html"
                  >
                    notice
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="text-uppercase text-color p-sm-2 py-2 px-0 d-inline-block"
                    href="research.html"
                  >
                    research
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="text-uppercase text-color p-sm-2 py-2 px-0 d-inline-block"
                    href="scholarship.html"
                  >
                    SCHOLARSHIP
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="text-uppercase text-color p-sm-2 py-2 px-0 d-inline-block"
                    href="#"
                    data-toggle="modal"
                    data-target="#loginModal"
                  >
                    login
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="text-uppercase text-color p-sm-2 py-2 px-0 d-inline-block"
                    href="#"
                    data-toggle="modal"
                    data-target="#signupModal"
                  >
                    register
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* navbar */}
      <div className="navigation w-100">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light p-0">
            <a className="navbar-brand" href="index.html">
              <img src="images/logo.png" alt="logo" />
            </a>
            <button
              className="navbar-toggler rounded-0"
              type="button"
              data-toggle="collapse"
              data-target="#navigation"
              aria-controls="navigation"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navigation">
              <ul className="navbar-nav ml-auto text-center">
                <li className="nav-item active">
                  <a className="nav-link" href="index.html">
                    Home
                  </a>
                </li>
                <li className="nav-item @@about">
                  <a className="nav-link" href="about.html">
                    About
                  </a>
                </li>
                <li className="nav-item @@courses">
                  <a className="nav-link" href="courses.html">
                    COURSES
                  </a>
                </li>
                <li className="nav-item @@events">
                  <a className="nav-link" href="events.html">
                    EVENTS
                  </a>
                </li>
                <li className="nav-item @@blog">
                  <a className="nav-link" href="blog.html">
                    BLOG
                  </a>
                </li>
                <li className="nav-item dropdown view">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Pages
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="teacher.html">
                      Teacher
                    </a>
                    <a className="dropdown-item" href="teacher-single.html">
                      Teacher Single
                    </a>
                    <a className="dropdown-item" href="notice.html">
                      Notice
                    </a>
                    <a className="dropdown-item" href="notice-single.html">
                      Notice Details
                    </a>
                    <a className="dropdown-item" href="research.html">
                      Research
                    </a>
                    <a className="dropdown-item" href="scholarship.html">
                      Scholarship
                    </a>
                    <a className="dropdown-item" href="course-single.html">
                      Course Details
                    </a>
                    <a className="dropdown-item" href="event-single.html">
                      Event Details
                    </a>
                    <a className="dropdown-item" href="blog-single.html">
                      Blog Details
                    </a>
                  </div>
                </li>
                <li className="nav-item @@contact">
                  <a className="nav-link" href="contact.html">
                    CONTACT
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
