import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Updatecourse(props) {
  return (
    <Main>
      {/* Page Content */}
      <div className="page-content">
        <div className="card-container">
          {/* Divider */}
          <p className="divider">Add or edit a course</p>
          {/* Card Body */}
          <form className="form-container">
            {/* Custom Input*/}
            <div className="custom-input">
              <label htmlFor="position" className="input-label">
                Upload image
              </label>
              <div className="input-wrapper">
                <input type="file" id="position" className="input-field" />
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="name" className="input-label">
                Course name
              </label>
              <div className="input-wrapper">
                <input type="text" id="name" className="input-field" />
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="major" className="input-label">
                Course details
              </label>
              <div className="input-wrapper">
                <input type="text" id="major" className="input-field" />
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="major" className="input-label">
                location
              </label>
              <div className="input-wrapper">
                <input type="text" id="major" className="input-field" />
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="telephone" className="input-label">
                Course date start
              </label>
              <div className="input-wrapper">
                <input type="date" id="telephone" className="input-field" />
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="telephone" className="input-label">
                Course date finish
              </label>
              <div className="input-wrapper">
                <input type="date" id="telephone" className="input-field" />
              </div>
            </div>
            {/* Card Footer */}
            <button type="button" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Main>
  );
}

export default Updatecourse;
