import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import FileUploadProfile from "../components/fileUploadProfile";
import axios from "axios";
import apiUrl from "../api/apiConfig";

function Profile(props) {
  const storedUserData = localStorage.getItem("userData");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`/course/get-all`)
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json.courses)) {
          setCourses(json.courses.slice(0, 4));
        } else {
          console.error("Invalid data format: courses is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching courses data:", error);
      });
  }, []);

  let userData = null;
  try {
    userData = JSON.parse(storedUserData);
  } catch (error) {
    console.error("Failed to parse user data from localStorage");
  }

  const [userDatas, setUserDatas] = useState(
    userData || {
      username: "",
      email: "",
      phone: "",
      image: "",
    }
  );

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const updateUser = async () => {
    try {
      // Update user data
      axios.put(`${apiUrl}/users/update/${userDatas.user_id}`, userDatas);

      // Fetch updated user data
      const getUserResponse = await axios.get(
        `${apiUrl}/users/${userDatas.user_id}`
      );
      const updatedUserData = getUserResponse.data[0]; // Assuming response is an array with a single object
      setUserDatas(updatedUserData);
      userData = userDatas;

      // Update local storage with updated user data
      localStorage.setItem("userData", JSON.stringify(userDatas));
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };

  const handleSaveChanges = () => {
    updateUser(userDatas.user_id, userDatas); // Pass userData instead of userDatas
    handleCloseModal();
  };
  return (
    <Main>
      {/* Hero Section */}
      <div className="container custom-body">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            {/* Bg */}
            <div className="custom-pt-20 rounded-top"></div>
            <div className="custom-card custom-rounded-bottom smooth-shadow-sm">
              <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                <div className="d-flex align-items-center">
                  <div
                    className="custom-avatar-xxl custom-avatar-indicators avatar-online me-2 position-relative d-flex justify-content-center align-items-center custom-mt-n10"
                    style={{
                      width: "200px",
                      height: "200px",
                      overflow: "hidden",
                    }}
                    onClick={handleShowModal}
                  >
                    <img
                      src={`${apiUrl}/profiles/${userDatas.image}`}
                      className="rounded-circle border border-2"
                      alt="Image"
                      style={{ objectFit: "cover", width: "100%" }}
                    />
                  </div>
                  <div className="lh-1">
                    <h2 className="mb-0">{userDatas && userDatas.username}</h2>
                    <p className="mb-0 d-block">
                      {userDatas && userDatas.role} -{" "}
                      <span>{userDatas && userDatas.department}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <Link
                    to="#"
                    className="btn btn-outline-primary d-none d-md-block"
                    onClick={handleShowModal}
                  >
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
                      <Link
                        to="#"
                        onClick={handleShowModal}
                        className="col-md-6 text-end"
                      >
                        Edit
                      </Link>
                    </div>
                    <p>
                      <i className="bi-custom bi-envelope-fill" />
                      {userDatas.email}
                    </p>
                    <p>
                      <i className="bi-custom bi-telephone-fill" />
                      {userDatas.phone}
                    </p>
                    <hr />
                    <div className="row">
                      <h4 className="col-md-6">History </h4>
                      <Link to="#" className="col-md-6 text-end">
                        See all
                      </Link>
                    </div>
                    <div className="history">
                      <div className="container-fluid">
                        <div className="row">
                          {/*Course */}

                          <div className="details d-flex">
                            <table>
                              <thead>
                                <tr>
                                  <td>Course name</td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td style={{ textAlign: "left" }}>
                                    {courses.map((courseItem, index) => (
                                      <span key={index}>
                                        {courseItem.course_detail_name}
                                        <br />
                                      </span>
                                    ))}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Course End */}
                        </div>
                      </div>
                    </div>
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
      <Modal
        show={showModal}
        backdrop="static"
        onHide={handleCloseModal}
        style={{ zIndex: 9999 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={userDatas.username}
                onChange={(e) =>
                  setUserDatas({ ...userDatas, username: e.target.value })
                }
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={userDatas.email}
                onChange={(e) =>
                  setUserDatas({ ...userDatas, email: e.target.value })
                }
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="phone"
                placeholder="Enter phone number"
                value={userDatas.phone}
                onChange={(e) =>
                  setUserDatas({ ...userDatas, phone: e.target.value })
                }
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicImage">
              <Form.Label>Upload Image</Form.Label>
              <FileUploadProfile
                onFileUpload={(imageName) =>
                  setUserDatas({ ...userDatas, image: imageName })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Main>
  );
}

export default Profile;
