import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Profile(props) {
  return (
    <Main>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        {/* Add content for the page header here */}
      </div>
      {/* Page Header End */}
      <div className="aboutcenter-container flex-left" style={{ justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={process.env.PUBLIC_URL + "/img/profile/p1.webp"} alt="" style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
          <div>
            <h1>Profile</h1>
            <p>Name: John Doe</p>
            <p>Email: johndoe@example.com</p>
            <p>Address: 123 Street, City</p>
            <p>Phone: +123456789</p>
            <p>Social Media: <Link to="#">Facebook</Link></p>
            <p>Courses registered:</p>
            <ul>
              <li>exam1</li>
              <li>exam2</li>
            </ul>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Profile;
