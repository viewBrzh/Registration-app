import Main from "../layouts/main";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function About(props) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
              <li
                className="breadcrumb-item text-dark"
                aria-current="page"
                style={{ fontWeight: "bold" }}
              >
                About
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      <div className="aboutcenter-container" data-aos="fade-up">
        <h1>Smile & Smart Center</h1>
      </div>

      <div className="aboutcontainer">
        <div className="aboutcard" data-aos="fade-up">
          <div className="aboutcard-img">
            <img src="/img/Smiling Face (HD).png" alt="Image" />
          </div>
          <div className="aboutcard-content">
            <h2 className="aboutcard-title">Smile & Smart Center</h2>
            <p className="aboutcard-text">
              is a system designed to nurture and enhance Walailak University
              students' ability to possess the qualities of "smart, good, and
              happy" by encouraging an environment and developing positive
              student potential through involvement in becoming "smart, good,
              and happy" throughout their time in college.
            </p>
          </div>
        </div>
        <div
          className="aboutcard"
          style={{
            border: "1px solid #e0e0e0",
            overflow: "hidden",
          }}
          data-aos="fade-up"
        >
          <div className="aboutcard-img">
            <img src="/img/Maps 3D Icon Model For UI (HD).png" alt="Image" />
          </div>
          <div className="aboutcard-content">
            <h2 className="aboutcard-title">Location</h2>
            <p className="aboutcard-text">
              The space is tidy. It's contemporary, visually appealing, and
              light and cozy. There's space for guidance. An internet lounge is
              available. There are areas for reading, sitting, conversing, and
              playing games, as well as comfy couches for lounging and relaxing.
            </p>
          </div>
        </div>
        <div
          className="aboutcard"
          style={{
            border: "1px solid #e0e0e0",
            overflow: "hidden",
          }}
          data-aos="fade-up"
        >
          <div className="aboutcard-img">
            <img src="/img/Consultation (HD).png" alt="Image" />
          </div>
          <div className="aboutcard-content">
            <h2 className="aboutcard-title">Consulting personnel</h2>
            <p className="aboutcard-text">
              consists of counseling specialists, psychologists, psychiatrists,
              and psychiatric nurses, as well as a support system drawn from
              outside the university.
            </p>
          </div>
        </div>
        <div
          className="aboutcard"
          style={{
            border: "1px solid #e0e0e0",
            overflow: "hidden",
          }}
          data-aos="fade-up"
        >
          <div className="aboutcard-img">
            <img src="/img/Heart Care (HD).png" alt="Image" />
          </div>
          <div className="aboutcard-content">
            <h2 className="aboutcard-title">
              Taking care of pregnant students so they can continue their
              studies
            </h2>
            <p className="aboutcard-text">
              Smile & Smart Center offers counseling services to students who
              become pregnant while enrolled in school so they can finish their
              education without having to drop out.
            </p>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default About;
