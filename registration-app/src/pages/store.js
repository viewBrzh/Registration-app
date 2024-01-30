import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Store(props) {
  return (
    <Main>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-2 text-dark mb-4 animated slideInDown">
            Tea Store
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page">
                Store
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {/* Store Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="section-title text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "500px" }}
          >
            <p className="fs-5 fw-medium fst-italic text-primary">
              Online Store
            </p>
            <h1 className="display-6">
              Want to stay healthy? Choose tea taste
            </h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="store-item position-relative text-center">
                <img
                  className="img-fluid"
                  src="img/store-product-1.jpg"
                  alt=""
                />
                <div className="p-4">
                  <div className="text-center mb-3">
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                  </div>
                  <h4 className="mb-3">Nature close tea</h4>
                  <p>
                    Aliqu diam amet diam et eos. Clita erat ipsum lorem erat
                    ipsum lorem sit sed
                  </p>
                  <h4 className="text-primary">$19.00</h4>
                </div>
                <div className="store-overlay">
                  <a
                    href=""
                    className="btn btn-primary rounded-pill py-2 px-4 m-2"
                  >
                    More Detail <i className="fa fa-arrow-right ms-2"></i>
                  </a>
                  <a
                    href=""
                    className="btn btn-dark rounded-pill py-2 px-4 m-2"
                  >
                    Add to Cart <i className="fa fa-cart-plus ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="store-item position-relative text-center">
                <img
                  className="img-fluid"
                  src="img/store-product-2.jpg"
                  alt=""
                />
                <div className="p-4">
                  <div className="text-center mb-3">
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                  </div>
                  <h4 className="mb-3">Green tea tulsi</h4>
                  <p>
                    Aliqu diam amet diam et eos. Clita erat ipsum lorem erat
                    ipsum lorem sit sed
                  </p>
                  <h4 className="text-primary">$19.00</h4>
                </div>
                <div className="store-overlay">
                  <a
                    href=""
                    className="btn btn-primary rounded-pill py-2 px-4 m-2"
                  >
                    More Detail <i className="fa fa-arrow-right ms-2"></i>
                  </a>
                  <a
                    href=""
                    className="btn btn-dark rounded-pill py-2 px-4 m-2"
                  >
                    Add to Cart <i className="fa fa-cart-plus ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="store-item position-relative text-center">
                <img
                  className="img-fluid"
                  src="img/store-product-3.jpg"
                  alt=""
                />
                <div className="p-4">
                  <div className="text-center mb-3">
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                  </div>
                  <h4 className="mb-3">Instant tea premix</h4>
                  <p>
                    Aliqu diam amet diam et eos. Clita erat ipsum lorem erat
                    ipsum lorem sit sed
                  </p>
                  <h4 className="text-primary">$19.00</h4>
                </div>
                <div className="store-overlay">
                  <a
                    href=""
                    className="btn btn-primary rounded-pill py-2 px-4 m-2"
                  >
                    More Detail <i className="fa fa-arrow-right ms-2"></i>
                  </a>
                  <a
                    href=""
                    className="btn btn-dark rounded-pill py-2 px-4 m-2"
                  >
                    Add to Cart <i className="fa fa-cart-plus ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-12 text-center wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <a href="" className="btn btn-primary rounded-pill py-3 px-5">
                View More Products
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Store End */}
    </Main>
  );
}

export default Store;
