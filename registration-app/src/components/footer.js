import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <footer>
      {/* newsletter */}
      <div className="newsletter">
        <div className="container">
          <div className="row">
            <div className="col-md-9 ml-auto bg-primary py-5 newsletter-block">
              <h3 className="text-white">Subscribe Now</h3>
              <form action="#">
                <div className="input-wrapper">
                  <input
                    type="email"
                    className="form-control border-0"
                    id="newsletter"
                    name="newsletter"
                    placeholder="Enter Your Email..."
                  />
                  <button
                    type="submit"
                    value="send"
                    className="btn btn-primary"
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* footer content */}
      <div className="footer bg-footer section border-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-8 mb-5 mb-lg-0">
              {/* logo */}
              <a className="logo-footer" href="index.html">
                <img
                  className="img-fluid mb-4"
                  src="images/logo.png"
                  alt="logo"
                />
              </a>
              <ul className="list-unstyled">
                <li className="mb-2">
                  23621 15 Mile Rd #C104, Clinton MI, 48035, New York, USA
                </li>
                <li className="mb-2">+1 (2) 345 6789</li>
                <li className="mb-2">contact@yourdomain.com</li>
              </ul>
            </div>
            {/* ... (rest of the code remains unchanged) */}
          </div>
        </div>
      </div>
      {/* copyright */}
      <div className="copyright py-4 bg-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-7 text-sm-left text-center">
              <p className="mb-0">
                Copyright
                <script>
                  var CurrentYear = new Date().getFullYear();
                  document.write(CurrentYear);
                </script>{" "}
                © Theme By <a href="https://themefisher.com">themefisher.com</a>
                . All Rights Reserved.
              </p>
            </div>
            <div className="col-sm-5 text-sm-right text-center">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a
                    className="d-inline-block p-2"
                    href="https://www.facebook.com/themefisher"
                  >
                    <i className="ti-facebook text-primary"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="d-inline-block p-2"
                    href="https://www.twitter.com/themefisher"
                  >
                    <i className="ti-twitter-alt text-primary"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="d-inline-block p-2" href="#">
                    <i className="ti-instagram text-primary"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="d-inline-block p-2"
                    href="https://dribbble.com/themefisher"
                  >
                    <i className="ti-dribbble text-primary"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
