import React, { useState } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

function Profile() {
  const storedUserData = localStorage.getItem("userData");

  let userData = null;
  try {
    userData = JSON.parse(storedUserData);
  } catch (error) {
    console.error("Failed to parse user data from localStorage");
  }

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <Main>
      {/* Hero Section */}
      <div className="container custom-body">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            {/* Bg */}
            <div
              className="custom-pt-20 rounded-top"
            ></div>
            <div className="custom-card custom-rounded-bottom smooth-shadow-sm">
              <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                <div className="d-flex align-items-center">
                  <div className="custom-avatar-xxl custom-avatar-indicators avatar-online me-2 position-relative d-flex justify-content-end align-items-end custom-mt-n10" onClick={handleShowModal}>
                    <img
                      src={process.env.PUBLIC_URL + "/img/profile/p1.jpg"}
                      className="custom-avatar-xxl rounded-circle border border-2"
                      alt="Image"
                    />

                  </div>
                  <div className="lh-1">
                    <h2 className="mb-0">{userData && userData.user.username}</h2>
                    <p className="mb-0 d-block">{userData && userData.user.role} - <span>{userData && userData.user.department}</span></p>
                  </div>
                </div>
                <div>
                  <Link to="#" className="btn btn-outline-primary d-none d-md-block" onClick={handleShowModal}>
                    Edit Profile
                  </Link>
                </div>
              </div>
              <br />
            </div>
            <br></br>
            <div className="container">
              <div className="row">
                {/* Info Card */}
                <div className="col-md-4">
                  <div className="custom-info-card">
                    <div className="row">
                      <h4 className="col-md-6">Contact </h4>
                      <Link to="#" onClick={handleShowModal} className="col-md-6 text-end">Edit</Link>
                    </div>
                    <p><i className="bi-custom bi-envelope-fill" />{userData.user.email}</p>
                    <p><i className="bi-custom bi-telephone-fill" />{userData.user.email}</p>
                    <hr />
                    <div className="row">
                      <h4 className="col-md-6">History </h4>
                      <Link to="#" className="col-md-6 text-end">See all</Link>
                    </div>
                    <p className="history"></p>
                  </div>
                </div>

                {/* Skill Card */}
                <div className="col-md-8">
                  <div className="custom-skill-card">
                    {/* Skill Card Content Here */}
                    <div className=""></div>
                    <h4>Skills</h4>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} backdrop="static" onHide={handleCloseModal} style={{ zIndex: 9999 }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicImage">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Main>
  );
}

export default Profile;
