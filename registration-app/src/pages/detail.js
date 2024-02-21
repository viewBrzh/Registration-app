import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Detail(props) {
  return (
    <Main>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
              <img className="img-fluid" src="img/article.jpg" alt="" />
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <div className="section-title">
                <p className="fs-5 fw-medium fst-italic text-primary">
                  Featured Acticle
                </p>
                <h1 className="display-6">
                  The history of tea leaf in the world
                </h1>
              </div>
              <p className="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <p className="mb-4">
                Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita
                erat ipsum et lorem et sit, sed stet lorem sit clita duo justo
                magna. Tempor erat elitr rebum at clita.
              </p>
              <Link to={`/enroll`}>
                <button
                  type="button"
                  className="btn btn-primary rounded-pill py-3 px-5"
                >
                  Enroll
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Detail;
