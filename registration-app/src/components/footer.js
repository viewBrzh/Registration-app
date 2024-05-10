import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer>
      <div
        className="container-fluid bg-dark footer mt-5 py-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-primary mb-4">Our Office</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt text-primary me-3"></i>
                Thaiburi building
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt text-primary me-3"></i>tel :
                0-7567-3122-3
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope text-primary me-3"></i>
                smilesmartcenter@gmail.com
              </p>
              <div className="d-flex pt-3">
                <a
                  className="btn btn-square btn-primary rounded-circle me-2"
                  href=""
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-square btn-primary rounded-circle me-2"
                  href=""
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-square btn-primary rounded-circle me-2"
                  href=""
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  className="btn btn-square btn-primary rounded-circle me-2"
                  href=""
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-primary mb-4">Quick Links</h4>
              <Link to={`/`} className="btn btn-link">
                <i className="fa fa-angle-right text-primary me-3"></i> Home
              </Link>
              <Link to={`/about`} className="btn btn-link">
                <i className="fa fa-angle-right text-primary me-3"></i> About
              </Link>
              <Link to={`/profile`} className="btn btn-link">
                <i className="fa fa-angle-right text-primary me-3"></i> Profile
              </Link>
              <Link to={`/course`} className="btn btn-link">
                <i className="fa fa-angle-right text-primary me-3"></i> Course
              </Link>
              <Link to={`/contact`} className="btn btn-link">
                <i className="fa fa-angle-right text-primary me-3"></i> Contact
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-primary mb-4">Business Hours</h4>
              <p className="mb-1">Monday - Friday</p>
              <h6 className="text-light">09:00 am - 05:00 pm</h6>
              <p className="mb-1">Saturday - Sunday</p>
              <h6 className="text-light">Closed</h6>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-primary mb-4">Newsletter</h4>
              <p>Send us email.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
