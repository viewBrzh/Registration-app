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
          <div className="profile-image-container" style={{ marginRight: '10px', border: '2px solid #ccc', borderRadius: '50%', padding: '5px' }}>
            <img src={process.env.PUBLIC_URL + "/img/profile/p1.webp"} alt="" style={{ maxWidth: '100px', maxHeight: '100px' }} />
          </div>
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
      {/* News Section Start */}
      <div className="news-section text-center" style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5', padding: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>Courses trained:</h2>
        <div className="image-frame" style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '10px', maxWidth: '600px' }}>
          <img src={process.env.PUBLIC_URL + "/img/course/c1.jpg"} alt="" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        {/* Add news content here */}
      </div>
      {/* News Section End */}
    </Main>
  );
}

export default Profile;
