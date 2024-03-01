import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Demo(props) {
  return (
    <Main>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-2 text-dark mb-4 animated slideInDown">
            Courses
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page">
                Courses
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      {/* Courses area start */}
      <div className="courses-area section-padding40 fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8">
              <div className="section-tittle text-center mb-55">
                <h2>Our featured courses</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="properties properties2 mb-30">
                <div className="properties__card">
                  <div className="properties__img overlay1">
                    <Link to={`/profile`}>
                      <img src="img/ranking.jpg" alt="" />
                    </Link>
                  </div>
                  <div className="properties__caption">
                    <p>User Experience</p>
                    <h3>
                      <Link to={`/profile`}>
                        Fundamental of UX for Application design
                      </Link>
                    </h3>
                    <p>
                      The automated process all your website tasks. Discover
                      tools and techniques to engage effectively with vulnerable
                      children and young people.
                    </p>
                    <div className="properties__footer d-flex justify-content-between align-items-center">
                      <div className="restaurant-name">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half"></i>
                        </div>
                        <p>
                          <span>(4.5)</span> based on 120
                        </p>
                      </div>
                      <div className="price">
                        <span>$135</span>
                      </div>
                    </div>
                    <a href="#" className="border-btn border-btn2">
                      Find out more
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="properties properties2 mb-30">
                <div className="properties__card">
                  <div className="properties__img overlay1">
                    <Link to={`/profile`}>
                      <img src="img/ranking.jpg" alt="" />
                    </Link>
                  </div>
                  <div className="properties__caption">
                    <p>User Experience</p>
                    <h3>
                      <Link to={`/profile`}>
                        Fundamental of UX for Application design
                      </Link>
                    </h3>
                    <p>
                      The automated process all your website tasks. Discover
                      tools and techniques to engage effectively with vulnerable
                      children and young people.
                    </p>
                    <div className="properties__footer d-flex justify-content-between align-items-center">
                      <div className="restaurant-name">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half"></i>
                        </div>
                        <p>
                          <span>(4.5)</span> based on 120
                        </p>
                      </div>
                      <div className="price">
                        <span>$135</span>
                      </div>
                    </div>
                    <a href="#" className="border-btn border-btn2">
                      Find out more
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="properties properties2 mb-30">
                <div className="properties__card">
                  <div className="properties__img overlay1">
                    <Link to={`/profile`}>
                      <img src="img/ranking.jpg" alt="" />
                    </Link>
                  </div>
                  <div className="properties__caption">
                    <p>User Experience</p>
                    <h3>
                      <Link to={`/profile`}>
                        Fundamental of UX for Application design
                      </Link>
                    </h3>
                    <p>
                      The automated process all your website tasks. Discover
                      tools and techniques to engage effectively with vulnerable
                      children and young people.
                    </p>
                    <div className="properties__footer d-flex justify-content-between align-items-center">
                      <div className="restaurant-name">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half"></i>
                        </div>
                        <p>
                          <span>(4.5)</span> based on 120
                        </p>
                      </div>
                      <div className="price">
                        <span>$135</span>
                      </div>
                    </div>
                    <a href="#" className="border-btn border-btn2">
                      Find out more
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="properties properties2 mb-30">
                <div className="properties__card">
                  <div className="properties__img overlay1">
                    <Link to={`/profile`}>
                      <img src="img/ranking.jpg" alt="" />
                    </Link>
                  </div>
                  <div className="properties__caption">
                    <p>User Experience</p>
                    <h3>
                      <Link to={`/profile`}>
                        Fundamental of UX for Application design
                      </Link>
                    </h3>
                    <p>
                      The automated process all your website tasks. Discover
                      tools and techniques to engage effectively with vulnerable
                      children and young people.
                    </p>
                    <div className="properties__footer d-flex justify-content-between align-items-center">
                      <div className="restaurant-name">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half"></i>
                        </div>
                        <p>
                          <span>(4.5)</span> based on 120
                        </p>
                      </div>
                      <div className="price">
                        <span>$135</span>
                      </div>
                    </div>
                    <a href="#" className="border-btn border-btn2">
                      Find out more
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="properties properties2 mb-30">
                <div className="properties__card">
                  <div className="properties__img overlay1">
                    <Link to={`/profile`}>
                      <img src="img/ranking.jpg" alt="" />
                    </Link>
                  </div>
                  <div className="properties__caption">
                    <p>User Experience</p>
                    <h3>
                      <Link to={`/profile`}>
                        Fundamental of UX for Application design
                      </Link>
                    </h3>
                    <p>
                      The automated process all your website tasks. Discover
                      tools and techniques to engage effectively with vulnerable
                      children and young people.
                    </p>
                    <div className="properties__footer d-flex justify-content-between align-items-center">
                      <div className="restaurant-name">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half"></i>
                        </div>
                        <p>
                          <span>(4.5)</span> based on 120
                        </p>
                      </div>
                      <div className="price">
                        <span>$135</span>
                      </div>
                    </div>
                    <a href="#" className="border-btn border-btn2">
                      Find out more
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="properties properties2 mb-30">
                <div className="properties__card">
                  <div className="properties__img overlay1">
                    <Link to={`/profile`}>
                      <img src="img/ranking.jpg" alt="" />
                    </Link>
                  </div>
                  <div className="properties__caption">
                    <p>User Experience</p>
                    <h3>
                      <Link to={`/profile`}>
                        Fundamental of UX for Application design
                      </Link>
                    </h3>
                    <p>
                      The automated process all your website tasks. Discover
                      tools and techniques to engage effectively with vulnerable
                      children and young people.
                    </p>
                    <div className="properties__footer d-flex justify-content-between align-items-center">
                      <div className="restaurant-name">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half"></i>
                        </div>
                        <p>
                          <span>(4.5)</span> based on 120
                        </p>
                      </div>
                      <div className="price">
                        <span>$135</span>
                      </div>
                    </div>
                    <a href="#" className="border-btn border-btn2">
                      Find out more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8">
              <div className="section-tittle text-center mt-40">
                <a href="#" className="border-btn">
                  Load More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Courses area End */}
    </Main>
  );
}

export default Demo;
