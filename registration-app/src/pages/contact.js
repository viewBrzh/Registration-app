import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Contact(props) {
  return (
    <Main>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-2 text-dark mb-4 animated slideInDown">
            Contact Us
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page">
                Contact
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      <div className="container-xxl contact py-5">
        <div className="container">
          <div
            className="section-title text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "500px" }}
          >
            <p className="fs-5 fw-medium fst-italic text-primary">Contact Us</p>
            <h1 className="display-6">Contact us right now</h1>
          </div>
          <div
            className="row justify-content-center wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div className="col-lg-8">
              <p className="text-center mb-5">
                Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita
                erat ipsum et lorem et sit, sed stet lorem sit clita duo justo
                Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita
                erat ipsum et lorem et sit, sed stet lorem sit clita duo justo
              </p>
              <div className="row g-5">
                <div
                  className="col-md-4 text-center wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="btn-square mx-auto mb-3">
                    <i className="fa fa-envelope fa-2x text-white"></i>
                  </div>
                  <p className="mb-2">info@example.com</p>
                  <p className="mb-0">support@example.com</p>
                </div>
                <div
                  className="col-md-4 text-center wow fadeInUp"
                  data-wow-delay="0.4s"
                >
                  <div className="btn-square mx-auto mb-3">
                    <i className="fa fa-phone fa-2x text-white"></i>
                  </div>
                  <p className="mb-2">+012 345 67890</p>
                  <p className="mb-0">+012 345 67890</p>
                </div>
                <div
                  className="col-md-4 text-center wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="btn-square mx-auto mb-3">
                    <i className="fa fa-map-marker-alt fa-2x text-white"></i>
                  </div>
                  <p className="mb-2">123 Street</p>
                  <p className="mb-0">New York, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Contact;
