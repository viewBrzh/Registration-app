import Main from "../layouts/main";
import { Link } from "react-router-dom";
function Feedback(props) {
  return (
    <Main>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-2 text-dark mb-4 animated slideInDown">
            Feedback
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page" style={{ fontWeight: 'bold'}}>
                About
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      </Main>
  );
}

export default Feedback;