import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import FileUploadProfile from "../components/fileUploadProfile";
import apiUrl from "../api/apiConfig";
import AOS from "aos";
import "aos/dist/aos.css";

function Profile() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const storedUserData = localStorage.getItem("userData");
  const [courses, setCourses] = useState([]);
  const [skillsData, setSkillsData] = useState({});
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const [showInterest, setShowInterest] = useState(false);
  const [InterestedSkill, setInterestedSkill] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/interest/get/${userDatas.user_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setInterestedSkill(data[0].skills.split(", ")); // Use data[0] instead of course
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

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

  const handleSaveTags = async () => {
    try {
      const skillsString = selectedTags.join(", ");
      const response = await fetch(
        `${apiUrl}/interest/update/${userDatas.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ skills: skillsString }),
        }
      );
      if (response.status === 200) {
        alert("Interests updated successfully!");
        setShowInterest(false);
      } else {
        alert("Failed to update interests.");
      }
    } catch (error) {
      console.error("Error updating interests:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCloseInterest = () => setShowInterest(false);
  const handleShowInterest = () => {
    console.log("show interest ");
    setShowInterest(true);
  };

  const handleSaveChanges = () => {
    handleCloseModal();
  };

  useEffect(() => {
    fetch(`${apiUrl}/enroll/getUserHistory/${userDatas.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.courses); // Update state with courses data

        const skillsCount = {};
        data.courses?.forEach((course) => {
          if (course.status === 1) {
            // Only count skills for courses with status 1
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
  };

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(courses.length / 5);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const formatDate = (start_date) => {
    const toBuddhistEra = (year) => {
      return year + 543;
    };
    const formatBEYear = (date) => {
      const year = toBuddhistEra(date.getFullYear());
      return date.toLocaleDateString("en-GB").replace(date.getFullYear(), year);
    };
    return formatBEYear(new Date(start_date));
  };

  const skillDescriptions = {
    "MENTALIZATION-BASED THERAPY":
      "Understanding thoughts and feelings interactions.",
    "Satir systemic therapy": "Family therapy focusing on communication.",
    Coaching: "Guiding personal and professional growth.",
    "Mindfulness-based therapy": "Therapy using mindfulness techniques.",
    "Communication with parents":
      "Enhancing parent-child communication skills.",
    "Oracle card into the mind": "Using oracle cards for insights.",
    "Problem-solving therapy": "Therapy for solving personal problems.",
    Enneagram: "Personality typing system for growth.",
    "Relaxation technique": "Methods to reduce stress and anxiety.",
    PSYCHOEDUCATION: "Educating about psychological issues.",
    "Basic Counseling": "Fundamental counseling skills and techniques.",
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
              ></div>
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
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
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
            <br />
            {/* User Info*/}
            <div>
              <div className="row">
                {/* Info Card */}
                <div className="col-md-4">
                  <div
                    className="custom-info-card"
                    data-aos="fade-up"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <div className="contact-container">
                      <h4 className="head-h4">Contact</h4>
                      <Link
                        to="#"
                        onClick={handleShowModal}
                        className="edit-link"
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

                    <div className="contact-container">
                      <h4 className="head-h4">Interested Skills</h4>
                      <Link
                        to="#"
                        className="edit-link"
                        onClick={handleShowInterest}
                      >
                        Edit
                      </Link>
                    </div>
                    <div className="cable-choose">
                      {InterestedSkill?.map((skill, index) => (
                        <button key={index}>{skill}</button>
                      ))}
                    </div>

                    <hr />
                    <div className="contact-container">
                      <h4 className="head-h4">History</h4>
                      <Link
                        to="#"
                        className="edit-link"
                        onClick={() => setShowHistory(true)}
                      >
                        See all
                      </Link>
                    </div>
                    {!isEmpty(courses) ? (
                      <div className="history">
                        <div style={{ overflowX: "auto" }}>
                          <table className="table" style={{ width: "380px" }}>
                            <thead>
                              <tr>
                                <th scope="col" style={{ width: "55%" }}>
                                  Name
                                </th>
                                <th scope="col" style={{ width: "25%" }}>
                                  Training date
                                </th>
                                <th scope="col" style={{ width: "15%" }}>
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {courses
                                .slice((currentPage - 1) * 5, currentPage * 5)
                                .map((course) => (
                                  <tr
                                    key={course.train_course_id}
                                    className="link-tr"
                                    onClick={() =>
                                      navigate(
                                        `/detail/${course.train_course_id}`
                                      )
                                    }
                                  >
                                    <td>{course.course_detail_name}</td>
                                    <td>{formatDate(course.start_date)}</td>
                                    <td>
                                      <span
                                        className={`status ${
                                          course.status === 0
                                            ? "pending"
                                            : course.status === 1
                                            ? "pass"
                                            : "failed"
                                        }`}
                                      >
                                        {course.status === 0
                                          ? "Pending"
                                          : course.status === 1
                                          ? "Pass"
                                          : "Failed"}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="d-flex justify-content-center">
                          <button
                            className={`btn previous-btn ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                          >
                            &laquo; Previous
                          </button>
                          <span className="btn pagination-span">
                            {" "}
                            {currentPage} of {totalPages}{" "}
                          </span>
                          <button
                            className={`next-btn ${
                              currentPage === totalPages ? "disabled" : ""
                            }`}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                          >
                            Next &raquo;
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>No course history yet.</div>
                    )}
                  </div>
                </div>

                {/* Skill Card */}
                <div className="col-md-8">
                  <div
                    className="custom-skill-card"
                    style={{ backgroundColor: "#FFFFFF" }}
                    data-aos="fade-up"
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
                          <span className="number-overlay">
                            {skillsData["MENTALIZATION-BASED THERAPY"] || (
                              <i className="bi bi-lock-fill"></i>
                            )}
                          </span>
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
                          <span className="number-overlay">
                            {skillsData["Satir systemic therapy"] || (
                              <i className="bi bi-lock-fill"></i>
                            )}
                          </span>
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
                          <span className="number-overlay">
                            {skillsData["Coaching"] || (
                              <i className="bi bi-lock-fill" />
                            )}
                          </span>
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
                          <span className="number-overlay">
                            {skillsData["Mindfullness-based therapy"] || (
                              <i className="bi bi-lock-fill" />
                            )}
                          </span>
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
                          <span className="number-overlay">
                            {skillsData["Communication with parents"] || (
                              <i className="bi bi-lock-fill" />
                            )}
                          </span>
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
                          <span className="number-overlay">
                            {skillsData["Oracle card into the mind"] || (
                              <i className="bi bi-lock-fill" />
                            )}
                          </span>
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
                          <span className="number-overlay">
                            {skillsData["Problem-solvingtherapy"] || (
                              <i className="bi bi-lock-fill" />
                            )}
                          </span>
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
                          <span className="number-overlay">
                            {skillsData["Enneagram"] || (
                              <i className="bi bi-lock-fill" />
                            )}
                          </span>
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
                          <span className="number-overlay">
                            {skillsData["Relaxation technique"] || (
                              <i className="bi bi-lock-fill" />
                            )}
                          </span>
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
                          <span className="number-overlay">
                            {skillsData["PSYCHOEDUCATION"] || (
                              <i className="bi bi-lock-fill" />
                            )}
                          </span>
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
                          <span className="number-overlay">
                            {skillsData["Basic Counseling"] || (
                              <i className="bi bi-lock-fill" />
                            )}
                          </span>
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

      {showHistory && (
        <div
          className="modal d-flex"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              maxWidth: "600px",
              margin: "0 auto",
              marginTop: "100px",
            }}
          >
            {!isEmpty(courses) ? (
              <div className="history" style={{ overflow: "auto" }}>
                <div>
                  <table className="table">
                    <thead>
                      <tr style={{ position: "sticky" }}>
                        <th scope="col" style={{ width: "55%" }}>
                          Name
                        </th>
                        <th scope="col" style={{ width: "25%" }}>
                          Training date
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr
                          className="link-tr"
                          key={course.train_course_id}
                          onClick={() =>
                            navigate(`/detail/${course.train_course_id}`)
                          }
                        >
                          <td>{course.course_detail_name}</td>
                          <td>
                            {new Date(course.start_date).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td>
                            <span
                              className={`status ${
                                course.status === 0
                                  ? "waiting"
                                  : course.status === 1
                                  ? "finish"
                                  : "failed"
                              }`}
                            >
                              {course.status === 0
                                ? "waiting"
                                : course.status === 1
                                ? "finish"
                                : "failed"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>No course history yet.</div>
            )}
            <br />
            <button
              className="btn btn-cancel"
              onClick={() => setShowHistory(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showInterest && (
        <div
          className="modal d-flex"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog"
            style={{ maxWidth: "1000px", width: "100%" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Choose Skills</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseInterest}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="cable-choose" style={{ margin: "20px" }}>
                  <div className="row">
                    {Object.keys(skillDescriptions).map((tag, index) => (
                      <div className="col-lg-4 mb-3" key={tag}>
                        <button
                          className={`skill-cable-button btn ${
                            selectedTags.includes(tag) ? "active" : ""
                          }`}
                          style={{ width: "100%", marginBottom: "10px" }}
                          onClick={() => handleTagSelection(tag)}
                        >
                          <div className="info">{tag}</div>
                          <div className="skill-cable">
                            {skillDescriptions[tag]}
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn" onClick={handleCloseInterest}>
                  Back
                </button>
                <button className="btn btn-primary" onClick={handleSaveTags}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
