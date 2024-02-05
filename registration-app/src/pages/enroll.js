import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Enroll(props) {
  return (
    <Main>
      {/* Page Content */}
      <div className="page-content">
        <div className="card-container">
          {/* Card Header */}
          <div className="card-header">{/* <h2>Enroll</h2> */}</div>
          {/* Divider */}
          <p className="divider">ลงชื่อเพื่อลงทะเบียนเข้าอบรม</p>
          {/* Card Body */}
          <form className="form-container">
            {/* Custom Input*/}
            <div className="custom-input">
              <label htmlFor="position" className="input-label">
                วิทยฐานะทางวิชาการ
              </label>
              <div className="input-wrapper">
                <input type="text" id="position" className="input-field" />
                <i className="fas fa-user icon"></i>
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="name" className="input-label">
                ชื่อ นามสกุล
              </label>
              <div className="input-wrapper">
                <input type="text" id="name" className="input-field" />
                <i className="fas fa-user icon"></i>
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="major" className="input-label">
                สำนักวิชา
              </label>
              <div className="input-wrapper">
                <input type="text" id="major" className="input-field" />
                <i className="fas fa-user icon"></i>
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="telephone" className="input-label">
                เบอร์โทรศัพท์มือถือ
              </label>
              <div className="input-wrapper">
                <input type="number" id="telephone" className="input-field" />
                <i className="fas fa-user icon"></i>
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="email" className="input-label">
                E-mail
              </label>
              <div className="input-wrapper">
                <input type="email" id="email" className="input-field" />
                <i className="fas fa-user icon"></i>
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
