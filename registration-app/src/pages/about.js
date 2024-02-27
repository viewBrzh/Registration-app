import Main from "../layouts/main";
import { Link } from "react-router-dom";
function About(props) {
  return (
    <Main>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-2 text-dark mb-4 animated slideInDown">
            About Us
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page">
                About
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-end">
                  <img
                    className="img-fluid bg-white w-100 mb-3 wow fadeIn"
                    data-wow-delay="0.1s"
                    src="img/about-1.jpg"
                    alt=""
                  />
                  <img
                    className="img-fluid bg-white w-50 wow fadeIn"
                    data-wow-delay="0.2s"
                    src="img/about-3.jpg"
                    alt=""
                  />
                </div>
                <div className="col-6">
                  <img
                    className="img-fluid bg-white w-50 mb-3 wow fadeIn"
                    data-wow-delay="0.3s"
                    src="img/about-4.jpg"
                    alt=""
                  />
                  <img
                    className="img-fluid bg-white w-100 wow fadeIn"
                    data-wow-delay="0.4s"
                    src="img/about-2.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <div className="section-title">
                <p className="fs-5 fw-medium fst-italic text-primary">
                  About Us
                </p>
                <h1 className="display-6">
                  The success history of TEA House in 25 years
                </h1>
              </div>
              <div className="row g-3 mb-4">
                <div className="col-sm-4">
                  <img
                    className="img-fluid bg-white w-100"
                    src="img/about-5.jpg"
                    alt=""
                  />
                </div>
                <div className="col-sm-8">
                  <h5>
                    Our tea is one of the most popular drinks in the world
                  </h5>
                  <p className="mb-0">
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                    Aliqu diam amet diam et eos. Clita erat ipsum et lorem et
                    sit
                  </p>
                </div>
              </div>
              <div className="border-top mb-4"></div>
              <div className="row g-3">
                <div className="col-sm-8">
                  <h5>Daily use of a cup of tea is good for your health</h5>
                  <p className="mb-0">
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                    Aliqu diam amet diam et eos. Clita erat ipsum et lorem et
                    sit
                  </p>
                </div>
                <div className="col-sm-4">
                  <img
                    className="img-fluid bg-white w-100"
                    src="/img/about-6.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default About;
