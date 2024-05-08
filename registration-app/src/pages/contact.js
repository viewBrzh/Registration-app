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
              <li className="breadcrumb-item text-dark" aria-current="page" style={{ fontWeight: 'bold'}}>
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
              
              <div className="row g-5">
                <div
                  className="col-md-4 text-center wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="btn-square mx-auto mb-3">
                    <i className="fa fa-envelope fa-2x text-white"></i>
                  </div>
                  <p className="mb-2">smilesmartcenter@gmail.com</p>
                  <p className="mb-0"></p>
                </div>
                <div
                  className="col-md-4 text-center wow fadeInUp"
                  data-wow-delay="0.4s"
                >
                  <div className="btn-square mx-auto mb-3">
                    <i className="fa fa-phone fa-2x text-white"></i>
                  </div>
                  <p className="mb-2">tel : 0-7567-3122-3</p>
                  <p className="mb-0">Intercom : 3122-3</p>
                </div>
                <div
                  className="col-md-4 text-center wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="btn-square mx-auto mb-3">
                    <i className="fa fa-map-marker-alt fa-2x text-white"></i>
                  </div>
                  <p className="mb-2">Thaiburi building</p>
                </div>
              </div>
              <br></br>
              <div className="aboutcard" style={{ width: 'auto', padding: 20}}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d697.292854252533!2d99.89734277853255!3d8.645427781161436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3053a09ebee6c259%3A0x326ae05ccc3228db!2z4Lit4Liy4LiE4Liy4Lij4LmE4LiX4Lii4Lia4Li44Lij4Li1IOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC4p-C4peC4seC4ouC4peC4seC4geC4qeC4k-C5jA!5e0!3m2!1sth!2sth!4v1710052699085!5m2!1sth!2sth" width="600" height="450" style={{border:0, width: '100%', borderRadius: 5}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Contact;
