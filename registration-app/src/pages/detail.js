import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Detail(props) {
  return (
    <Main>
      <div className="container">
        <div className="container-center">
          <div
            className="section-title text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "500px" }}
          ></div>
          <div>
            <div className="store-item position-relative text-center">
              <img className="img-fluid" src="img/store-product-1.jpg" alt="" />
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
                  Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum
                  lorem sit sed
                </p>
                <Link to={`/enroll`}>
                  <button type="button" className="btn btn-primary">
                    Enroll
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Detail;
