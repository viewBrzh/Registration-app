import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Enroll(props) {
  return (
    <Main>
      {/* Page Content */}
      <div className="page-content">
        <div className="card-container">
          {/* Card Header */}
          <p className="divider">Your Details</p>
          {/* Card Body */}
          <form className="form-container">
            {/* Custom Input*/}
            <div className="custom-input">
              <label htmlFor="position" className="input-label">
                Academic status
              </label>
              <div className="input-wrapper">
                <input type="text" id="position" className="input-field" />
                <i className="fas fa-user icon"></i>
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="name" className="input-label">
                Name
              </label>
              <div className="input-wrapper">
                <input type="text" id="name" className="input-field" />
                <i className="fas fa-user icon"></i>
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="major" className="input-label">
                Major
              </label>
              <div className="input-wrapper">
                <input type="text" id="major" className="input-field" />
                <i className="fas fa-user icon"></i>
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="telephone" className="input-label">
                Phone
              </label>
              <div className="input-wrapper">
                <input type="number" id="telephone" className="input-field" />
                <i className="fas fa-phone icon"></i>
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="email" className="input-label">
                E-mail
              </label>
              <div className="input-wrapper">
                <input type="email" id="email" className="input-field" />
                <i className="fas fa-envelope icon"></i>
              </div>
            </div>
            {/* Card Footer */}
            <button type="button" className="btn btn-primary">
              Enroll
            </button>
          </form>
        </div>
      </div>
    </Main>
  );
}

export default Enroll;
