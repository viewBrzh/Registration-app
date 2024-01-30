import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Product(props) {
  return (
    <Main>
      <div
        className="container-fluid page-header py-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-2 text-dark mb-4 animated slideInDown">
            Products
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page">
                Products
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Products Start */}
      <div className="container-fluid product py-5">
        <div className="container py-5">
          <div
            className="section-title text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "500px" }}
          >
            <p className="fs-5 fw-medium fst-italic text-primary">
              Our Products
            </p>
            <h1 className="display-6">
              Tea has a complex positive effect on the body
            </h1>
          </div>
          <div
            className="owl-carousel product-carousel wow fadeInUp"
            data-wow-delay="0.5s"
          >
            <a href="" className="d-block product-item rounded">
              <img src="img/product-1.jpg" alt="" />
              <div className="bg-white shadow-sm text-center p-4 position-relative mt-n5 mx-4">
                <h4 className="text-primary">Green Tea</h4>
                <span className="text-body">
                  Diam dolor diam ipsum sit diam amet diam et eos. Clita erat
                  ipsum
                </span>
              </div>
            </a>
            <a href="" className="d-block product-item rounded">
              <img src="img/product-2.jpg" alt="" />
              <div className="bg-white shadow-sm text-center p-4 position-relative mt-n5 mx-4">
                <h4 className="text-primary">Black Tea</h4>
                <span className="text-body">
                  Diam dolor diam ipsum sit diam amet diam et eos. Clita erat
                  ipsum
                </span>
              </div>
            </a>
            <a href="" className="d-block product-item rounded">
              <img src="img/product-3.jpg" alt="" />
              <div className="bg-white shadow-sm text-center p-4 position-relative mt-n5 mx-4">
                <h4 className="text-primary">Spiced Tea</h4>
                <span className="text-body">
                  Diam dolor diam ipsum sit diam amet diam et eos. Clita erat
                  ipsum
                </span>
              </div>
            </a>
            <a href="" className="d-block product-item rounded">
              <img src="img/product-4.jpg" alt="" />
              <div className="bg-white shadow-sm text-center p-4 position-relative mt-n5 mx-4">
                <h4 className="text-primary">Organic Tea</h4>
                <span className="text-body">
                  Diam dolor diam ipsum sit diam amet diam et eos. Clita erat
                  ipsum
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Product;
