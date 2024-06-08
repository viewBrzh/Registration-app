import React, { useState, useEffect } from "react";
import apiUrl from "../api/apiConfig";

const ModalInterest = () => {
  const storedUserData = localStorage.getItem("userData");
  const [InterestedSkill, setInterestedSkill] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [showInterest, setShowInterest] = useState(false);

  useEffect(() => {
    if (userDatas != null) {
      fetch(`${apiUrl}/interest/get/${userDatas.user_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.length === 0) {
            setShowInterest(true);
            console.log(data);
          } else {
            setInterestedSkill(data[0].skills.split(", "));
            console.log(data);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      setShowInterest(false);
    }
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/skill/`)
      .then((response) => response.json())
      .then((data) => setAllSkills(data))
      .catch((error) => console.error("Error fetching skills data:", error));
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

  const handleCloseInterest = () => setShowInterest(false);
  const handleShowInterest = () => setShowInterest(true);


  return (
    <>
      {InterestedSkill.length === 0 && showInterest && (
        <div
          className="modal d-flex"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog"
            style={{ maxWidth: "1000px", width: "100%", overflowY: "auto" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Please select the skill you are interested in.</h5>
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
                    {allSkills.map((skill, index) => (
                      <div className="col-lg-4 mb-3" key={skill.id}>
                        <button
                          className={`skill-cable-button btn ${selectedTags.includes(skill.name) ? "active" : ""}`}
                          style={{ width: "100%", marginBottom: '10px' }}
                          onClick={() => handleTagSelection(skill.name)}
                        >
                          <div className="info">{skill.name}</div>
                          <div className="skill-cable">{skill.description}</div>
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
    </>
  );
};

export default ModalInterest;
