import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Profile(props) {
  return (
    <Main>
      <div className="container text-center py-5" style={{ backgroundColor: '#E695B5' }}>
        <h1 className="display-2 text-white mb-4 animated slideInDown">
          Profile
        </h1>
        <nav aria-label="breadcrumb animated slideInDown">
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item" style={{ color: 'white' }}>
              <Link to={`/`} className="breadcrumb-item text-white">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item text-white" aria-current="page">
              Profile
            </li>

          </ol>
        </nav>
      </div>
      <img src="registration-app/public/img/about-2.jpg" alt="Profile" className="img-fluid rounded-circle mb-4 animated slideInDown" style={{ width: '200px', height: '200px' }} />

    </Main>
  );
}

export default Profile;
