import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import FileUploadProfile from "../components/fileUploadProfile";
import axios from "axios";
import apiUrl from "../api/apiConfig";

function Profile() {
  const storedUserData = localStorage.getItem("userData");
  const [courses, setCourses] = useState([]);
  const [skillsData, setSkillsData] = useState({});

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


  useEffect(() => {
    fetch(`${apiUrl}/enroll/getUserHistory/${userDatas.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.courses); // Update state with courses data
  
        const skillsCount = {};
        data.courses?.forEach((course) => {
          if (course.status === 1) { // Only count skills for courses with status 1
            const skills = course.skills.split(", ");
            skills.forEach((skill) => {
              skillsCount[skill] = (skillsCount[skill] || 0) + 1;
            });
          }
        });
        setSkillsData(skillsCount);
      });
  }, [userDatas.user_id]);

  useEffect(() => {
    console.log(skillsData);
  }, [skillsData]);

  const isEmpty = (items) => {
    if (!items) {
      return true;
    } else {
      return false;
    }
  }

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(courses.length / 5);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };


  return (
    <Main>
      {/* Hero Section */}
      <div className="container custom-body">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            {/* Bg */}

            <div className="custom-pt-20 rounded-top">
              <div
                className="container text-center py-5"
                style={{ position: "relative", top: "-100px" }}
              >
                {/* <h1 className="display-2 text-dark mb-4 animated slideInDown">
                  Profile {userDatas && userDatas.username}
                </h1>
                <nav aria-label="breadcrumb animated slideInDown">
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                      <Link
                        to={`/`}
                        className="breadcrumb-item"
                        style={{ color: "#f5f8f2" }}
                      >
                        Home /
                      </Link>
                    </li>
                    <li className="text-dark" aria-current="page">
                      Profile
                    </li>
                  </ol>
                </nav> */}
              </div>
            </div>

            <div
              className="custom-card custom-rounded-bottom smooth-shadow-sm"
              style={{ backgroundColor: "#FFFFFF" }}
            >
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

            <div className="container-fluid">
              <div className="row">
                {/* Info Card */}
                <div className="col-md-4">
                  <div
                    className="custom-info-card"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <div className="row">
                      <h4 className="col-md-6 head-h4">Contact </h4>
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
                      <h4 className="col-md-6 head-h4">History</h4>
                      <Link to="#" className="col-md-6 text-end">
                        See all
                      </Link>
                    </div>
                    {!isEmpty(courses) ? (
                      <div className="history">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col" style={{ width: '55%' }}>Name</th>
                              <th scope="col" style={{ width: '30%' }}>Date</th>
                              <th scope="col" style={{ width: '15%' }}>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courses.slice((currentPage - 1) * 5, currentPage * 5).map((course) => (
                              <tr key={course.id}>
                                <td>{course.course_detail_name}</td>
                                <td>{new Date(course.start_date).toLocaleDateString('en-GB')}</td>
                                <td>
                                  <span className={`status ${course.status === 0 ? 'waiting' : course.status === 1 ? 'finish' : 'failed'}`}>
                                    {course.status === 0 ? 'waiting' : course.status === 1 ? 'finish' : 'failed'}
                                  </span>

                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="d-flex justify-content-center">
                          <button
                            className={`btn previous-btn ${currentPage === 1 ? 'disabled' : ''}`}
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                          >
                            &laquo; Previous
                          </button>
                          <span className='btn pagination-span'> {currentPage} of {totalPages} </span>
                          <button
                            className={`next-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                          >
                            Next &raquo;
                          </button>
                        </div>
                      </div>
                    ) : (<div>No course history yet.</div>)}
                  </div>
                </div>

                {/* Skill Card */}
                <div className="col-md-8">
                  <div
                    className="custom-skill-card"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <h4 className="head-h4">Skills</h4>
                    {/* Skill Card Content Here */}
                    <div className="skill-group">
                      <div className="skill">
                        <div className="image-container">
                          <img
                            src="./img/profile/Certificate (1).bak.bak.png"
                            className="card-img-top1"
                            alt="Explanation"
                          />
                          <span className="number-overlay">{skillsData['MENTALIZATION-BASED THERAPY'] || <i className="bi bi-lock-fill"></i>}</span>
                        </div>
                        <p>Mentalization-based therapy</p>
                      </div>
                      <div className="skill">
                        <div className="image-container">
                          <img
                            src="./img/profile/Certificate Of Deposit.png"
                            className="card-img-top1"
                            alt="Explanation"
                          />
                          <span className="number-overlay">{skillsData['Satir systemic therapy'] || <i className="bi bi-lock-fill"></i>}</span>
                        </div>
                        <p>Satir systemic therapy</p>
                      </div>
                      <div className="skill">
                        <div className="image-container">
                          <img
                            src="./img/profile/Certificate.bak.bak.png"
                            className="card-img-top1"
                            alt="Explanation"
                          />
                          <span className="number-overlay">{skillsData['Coaching'] || <i className="bi bi-lock-fill" />}</span>
                        </div>
                        <p>Coaching</p>
                      </div>
                      <div className="skill">
                        <div className="image-container">
                          <img
                            src="./img/profile/Certificate.png"
                            className="card-img-top1"
                            alt="Explanation"
                          />
                          <span className="number-overlay">{skillsData['Mindfullness-based therapy'] || <i className="bi bi-lock-fill" />}</span>
                        </div>
                        <p>Mindfullness-based therapy</p>
                      </div>
                      <div className="skill">
                        <div className="image-container">
                          <img
                            src="./img/profile/Education Scholarship.png"
                            className="card-img-top1"
                            alt="Explanation"
                          />
                          <span className="number-overlay">{skillsData['Communication with parents'] || <i className="bi bi-lock-fill" />}</span>
                        </div>
                        <p>Communication with parents</p>
                      </div>
                      <div className="skill">
                        <div className="image-container">
                          <img
                            src="./img/profile/Graduation Certificate Scroll.png"
                            className="card-img-top1"
                            alt="Explanation"
                          />
                          <span className="number-overlay">{skillsData['Oracle card into the mind'] || <i className="bi bi-lock-fill" />}</span>
                        </div>
                        <p>Oracle card into the mind</p>
                      </div>
                      <div className="skill">
                        <div className="image-container">
                          <img
                            src="./img/profile/Graduation.bak.bak.png"
                            className="card-img-top1"
                            alt="Explanation"
                          />
                          <span className="number-overlay">{skillsData['Problem-solvingtherapy'] || <i className="bi bi-lock-fill" />}</span>
                        </div>
                        <p>Problem-solvingtherapy</p>
                      </div>
                      <div className="skill">
                        <div className="image-container">
                          <img
                            src="./img/profile/Medical Certificate.png"
                            className="card-img-top1"
                            alt="Explanation"
                          />
                          <span className="number-overlay">{skillsData['Enneagram'] || <i className="bi bi-lock-fill" />}</span>
                        </div>
                        <p>Enneagram</p>
                      </div>
                      <div className="skill">
                        <div className="image-container">
                          <img
                            src="./img/profile/Self Learning.bak.bak.png"
                            className="card-img-top1"
                            alt="Explanation"
                          />
                          <span className="number-overlay">{skillsData['Relaxation technique'] || <i className="bi bi-lock-fill" />}</span>
                        </div>
                        <p>Relaxation technique</p>
                      </div>
                      <div className="skill">
                        <div className="image-container">
                          <img
                            src="./img/profile/Certificate Paper 3D Icon Model With A Star Badge.png"
                            className="card-img-top1"
                            alt="Explanation"
                          />
                          <span className="number-overlay">{skillsData['PSYCHOEDUCATION'] || <i className="bi bi-lock-fill" />}</span>
                        </div>
                        <p>Psychoeducation</p>
                      </div>
                      <div className="skill">
                        <div className="image-container">
                          <img
                            src="./img/profile/The Road To Graduation.bak.bak.png"
                            className="card-img-top1"
                            alt="Explanation"
                          />
                          <span className="number-overlay">{skillsData['Basic Counseling'] || <i className="bi bi-lock-fill" />}</span>
                        </div>
                        <p>Basic Counseling</p>
                      </div>
                    </div>
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
    </Main >
  );
}

export default Profile;
