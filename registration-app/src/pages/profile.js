import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Profile(props) {
  return (
    <Main>
      {/* Page Header */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        {/* Add content for the page header here */}
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Your Profile</h1>
          <p>This is where you can manage your information and registered courses.</p>
          <Link to="#" className="btn btn-primary">Edit Profile</Link>
        </div>

        {/* Profile Picture */}
        <div className="profile-image-container">
          <img src={process.env.PUBLIC_URL + "/img/profile/p1.jpg"} alt="Profile" />
        </div>
      </div>

      {/* User Information */}
      <div className="user-info">
        <h2>Profile Details</h2>
        <p>Name: John Doe</p>
        <p>Email: johndoe@example.com</p>
        <p>Address: 123 Street, City</p>
        <p>Phone: +123456789</p>
        <p>Social Media: <Link to="#">Facebook</Link></p>
      </div>

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

      {/* News Section */}
      <div className="news-section text-center">
        <h2>Latest News</h2>
        <p>Stay updated with the latest announcements and events.</p>
        <Link to="#" className="btn btn-secondary">View News</Link>
      </div>
    </Main>
  );
}

export default Profile;
