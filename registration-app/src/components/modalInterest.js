import React, { useState, useEffect } from "react";
import apiUrl from "../api/apiConfig";

const ModalInterest = () => {
    const storedUserData = localStorage.getItem("userData");
    const [InterestedSkill, setInterestedSkill] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [showInterest, setShowInterest] = useState(false);

    useEffect(() => {
        if (storedUserData != null) {
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
                        setInterestedSkill(data[0].skills.split(', '));
                    }
                })
                .catch((error) => console.error("Error fetching data:", error));
        } else {
            setShowInterest(false);
        }
    }, []);

    const handleTagSelection = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
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
            const skillsString = selectedTags.join(', ');
            const response = await fetch(`${apiUrl}/interest/update/${userDatas.user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ skills: skillsString }),
            });
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

    const skillDescriptions = {
        "MENTALIZATION-BASED THERAPY": "Understanding thoughts and feelings interactions.",
        "Satir systemic therapy": "Family therapy focusing on communication.",
        "Coaching": "Guiding personal and professional growth.",
        "Mindfulness-based therapy": "Therapy using mindfulness techniques.",
        "Communication with parents": "Enhancing parent-child communication skills.",
        "Oracle card into the mind": "Using oracle cards for insights.",
        "Problem-solving therapy": "Therapy for solving personal problems.",
        "Enneagram": "Personality typing system for growth.",
        "Relaxation technique": "Methods to reduce stress and anxiety.",
        "PSYCHOEDUCATION": "Educating about psychological issues.",
        "Basic Counseling": "Fundamental counseling skills and techniques."
    };

    return (
        <>
            {InterestedSkill.length === 0 && showInterest && 
            <div className="modal d-flex" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog" style={{ maxWidth: "1000px", width: "100%" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Choose Skills</h5>
                        <button type="button" className="close" onClick={handleCloseInterest}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="cable-choose" style={{ margin: '20px'}}>
                            <div className="row">
                                {Object.keys(skillDescriptions).map((tag, index) => (
                                    <div className="col-lg-4 mb-3" key={tag}>
                                        <button
                                            className={`skill-cable-button btn ${selectedTags.includes(tag) ? "active" : ""}`}
                                            style={{ width: "100%", marginBottom: '10px' }}
                                            onClick={() => handleTagSelection(tag)}
                                        >
                                            <div className="info">{tag}</div>
                                            <div className="skill-cable">{skillDescriptions[tag]}</div>
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
        </div>}
        </>
    );
}

export default ModalInterest;
