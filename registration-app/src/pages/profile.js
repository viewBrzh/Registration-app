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
        {/* Profile Picture */}
        <div className="profile-image-container">
          <img
            src={process.env.PUBLIC_URL + "/img/profile/p1.jpg"}
            alt="Profile"
            style={{ width: '300px', height: '300px', borderRadius: '50%', marginLeft: '20px' }}
          />
        </div>
      </div>

      {/* User Information */}
      <div className="user-info" style={{ marginLeft: '100px', marginBottom: '40px', padding: '20px', borderBottom: '2px solid #ccc' }}>
        <h2 style={{ marginBottom: '20px' }}>Profile</h2>
        <p><span style={{ fontWeight: 'bold' }}>Name:</span> John Doe</p>
        <p><span style={{ fontWeight: 'bold' }}>Email:</span> johndoe@example.com</p>
        <p><span style={{ fontWeight: 'bold' }}>Address:</span> 123 Street, City</p>
        <p><span style={{ fontWeight: 'bold' }}>Phone:</span> +123456789</p>
        <p><span style={{ fontWeight: 'bold' }}>Social Media:</span> <Link to="#">Facebook</Link></p>
      </div>

      {/* Courses Section */}
      <div className="courses-section" style={{ marginLeft: '100px', marginBottom: '40px', paddingTop: '20px', width: '80%', borderBottom: '2px solid #ccc' }}>
        <h2 style={{ marginBottom: '20px' }}>Courses Registered</h2>
        <ul>
          <li>Course 1</li>
          <li>Course 2</li>
          <li>Course 3</li>
          {/* Add more courses as needed */}
        </ul>
      </div>

      {/* News Section */}
      <div className="news-section text-center" style={{ display: 'flex', justifyContent: 'space-between', padding: '40px', alignItems: 'center', marginLeft: '20px' }}>
        <div style={{ flexBasis: '30%' }}>
          <h2>Column 1</h2>
          {/* Add content for column 1 */}
        </div>
        <div style={{ flexBasis: '30%' }}>
          <h2>Course Registered on column</h2>
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
