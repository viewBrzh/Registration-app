import "../App.css";
import Main from "../layouts/main";

function About(props) {
  return (
    <Main>
      <section className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 order-2 order-md-1">
              <h2 className="section-title">About Educenter</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat{" "}
              </p>
              <p>
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum. Sed ut perspiciatis unde omnis iste
                natus error sit voluptatem
              </p>
              <a href="about.html" className="btn btn-primary-outline">
                Learn more
              </a>
            </div>
            <div className="col-md-6 order-1 order-md-2 mb-4 mb-md-0">
              <img
                className="img-fluid w-100"
                src="images/about/about-us.jpg"
                alt="about image"
              />
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
}

export default About;
