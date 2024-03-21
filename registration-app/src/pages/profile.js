import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Profile(props) {
  return (
    <Main>

      {/* Page Header */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        {/* Add content for the page header here */}
      </div>
      <div className="news-section text-center" style={{ display: 'flex', justifyContent: 'space-between', padding: '40px', alignItems: 'center', marginLeft: '100px' }}></div>
      {/* Hero Section */}
      <div className="hero-section">
        {/* Profile Picture */}
        <div className="profile-image-container">
          <img
            src={process.env.PUBLIC_URL + "/img/profile/p1.jpg"}
            alt="Profile"
            style={{ width: '300px', height: '300px', borderRadius: '50%', marginLeft: '100px' }}
          />
        </div>
      </div>

      {/* User Information */}
      <div className="user-info" style={{ marginLeft: '100px' }}>
        <h2>Profile</h2>
        <p>Name: John Doe</p>
        <p>Email: johndoe@example.com</p>
        <p>Address: 123 Street, City</p>
        <p>Phone: +123456789</p>
        <p>Social Media: <Link to="#">Facebook</Link></p>



        {/* Courses Section */}
        <div className="courses-section">
          <h2>Courses Registered</h2>
          <ul>
            <li>Course 1</li>
            <li>Course 2</li>
            <li>Course 3</li>
            {/* Add more courses as needed */}
          </ul>
        </div>
      </div>

      {/* News Section */}
      <div className="news-section text-center" style={{ display: 'flex', justifyContent: 'space-between', padding: '40px', alignItems: 'center', marginLeft: '20px' }}>
        <div style={{ flexBasis: '30%' }}>
          <h2>Column 1</h2>
          {/* Add content for column 1 */}
        </div>
        <div style={{ flexBasis: '30%' }}>
          <h2>Course Registered</h2>
          <img src="/img/ranking.jpg" alt="Ranking" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <div style={{ flexBasis: '30%' }}>
          <h2>Column 3</h2>
          {/* Add content for column 3 */}
        </div>
      </div>

    </Main>
  );
}

export default Profile;
