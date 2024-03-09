import React, { useState } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the app element for accessibility

function Updatecourse(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDeleteClick = () => {
    setModalIsOpen(true);
  };

  const handleConfirmDelete = () => {
    // Add your delete logic here
    console.log("Course deleted");
    setModalIsOpen(false);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

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
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <Link style={{ display: "flex", alignItems: "center", padding: 20 }}>
                <a className="font-btn" onClick={handleDeleteClick} style={{ margin: 0 }}>delete</a>
              </Link>
              <a style={{ padding: 10 }}></a>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: "center" }}>
                Confirm
              </button>
            </div>
          </form>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Confirm Delete"
            className="modal"
            overlayClassName="overlay"
          >
            <h2>Are you sure you want to delete this course?</h2>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <button onClick={handleConfirmDelete} className="btn btn-primary">Yes</button>
              <button onClick={handleCloseModal} className="btn btn-secondary" style={{ marginLeft: 10 }}>Cancel</button>
            </div>
          </Modal>
        </div>
      </div>
    </Main>
  );
}

export default Updatecourse;
