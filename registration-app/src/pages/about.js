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
                    src="img/viewwu.jpg"
                    alt=""
                  />
                  <img
                    className="img-fluid bg-white w-50 wow fadeIn"
                    data-wow-delay="0.2s"
                    src="img/smile2.jpg"
                    alt=""
                  />
                </div>
                <div className="col-6">
                  <img
                    className="img-fluid bg-white w-50 mb-3 wow fadeIn"
                    data-wow-delay="0.3s"
                    src="img/teach.jpg"
                    alt=""
                  />
                  <img
                    className="img-fluid bg-white w-100 wow fadeIn"
                    data-wow-delay="0.4s"
                    src="img/smile.jpg"
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
                    src="img/teaching.jpg"
                    alt=""
                  />
                </div>
                <div className="col-sm-8">
                  <h5>Center for Learning and Teaching Excellence</h5>
                  <p className="mb-0">
                    Encourage teachers to follow the guidelines in order to
                    maintain quality control. The standard framework serves as a
                    focus for leadership excellence in teaching (Teaching
                    Excellence), and it may also involve students and the
                    eco-system for teaching and learning. International
                    standards exist, and meeting the Higher Education
                    Qualifications Framework 2022's learning objectives requires
                    ensuring that education meets AUN-QA standards for quality.
                  </p>
                </div>
              </div>
              <div className="border-top mb-4"></div>
              <div className="row g-3">
                <div className="col-sm-8">
                  <h5>Objective</h5>
                  <p className="mb-0">
                    The Center for Teaching and Learning Excellence's
                    operational objectives positioned inside each work's
                    framework Through the work of teaching development Enhancing
                    instructors' effectiveness as teachers is the aim. Work on
                    developing and preparing curricula Supporting the creation
                    of undergraduate curricula is the aim. as well as graduate
                    school, and aid in academic administration
                  </p>
                </div>
                <div className="col-sm-4">
                  <img
                    className="img-fluid bg-white w-100"
                    src="img/ranking.jpg"
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
