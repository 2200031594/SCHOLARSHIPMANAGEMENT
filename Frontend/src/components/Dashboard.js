import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [scholarshipTypes, setScholarshipTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentScholarship, setCurrentScholarship] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    collegeName: "",
    contactNumber: "",
    dateOfBirth: "",
    address: "",
    cgpa:""
  });

  const userId = localStorage.getItem("userId"); // Assuming user ID is stored in local storage after login

  // Fetch scholarships and scholarship types on component mount
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get(
          "https://scholarshipmanagement.up.railway.app/api/admin/scholarships"
        );
        setScholarships(response.data || []);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
        alert("Failed to fetch scholarships. Please try again later.");
      }
    };

    const fetchScholarshipTypes = async () => {
      try {
        const response = await axios.get(
          "https://scholarshipmanagement.up.railway.app/api/admin/scholarship-types"
        );
        setScholarshipTypes(response.data || []);
      } catch (error) {
        console.error("Error fetching scholarship types:", error);
      }
    };

    fetchScholarships();
    fetchScholarshipTypes();
  }, []);

  // Filter scholarships based on selected type
  const filteredScholarships = scholarships.filter((scholarship) => {
    return selectedType === "ALL" || scholarship.type === selectedType;
  });

  // Handle Apply button click
  const handleApplyClick = (scholarship) => {
    setCurrentScholarship(scholarship);
    setIsModalOpen(true);
  };

  // Handle Details button click
  const handleDetailsClick = (scholarship) => {
    setCurrentScholarship(scholarship);
    setIsDetailsModalOpen(true);
  };

  // Handle form submission for applying
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://scholarshipmanagement.up.railway.app/api/applications", {
        ...formData,
        scholarshipId: currentScholarship.id,
        userId,
      });

      console.log("Response from Backend:", response);

      if (response.status === 200 || response.status === 201) {
        alert("Application submitted successfully!");
        setIsModalOpen(false);
        setFormData({
          name: "",
          email: "",
          gender: "",
          collegeName: "",
          contactNumber: "",
          dateOfBirth: "",
          address: "",
          cgpa:""
        });
      } else {
        alert("Unexpected response from the server!");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Failed to submit the application. Please try again.");
    }
  };

  return (
    <div className="dashboard">
      <header className="top-bar">
        <div className="logo">Scholarship Finder</div>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      <div className="dashboard-container">
        <aside className="sidebar">
          <ul>
            <li onClick={() => navigate("/dashboard")}>Dashboard</li>
            <li onClick={() => navigate("/my-applications")}>
              My Applications
            </li>
            <li onClick={() => navigate("/notifications")}>Notifications</li>
            <li onClick={() => navigate("/profile")}>Profile</li>
          </ul>
        </aside>

        <main className="main-content">
          <div className="filter-container">
            <label htmlFor="scholarshipType">Scholarship Type: </label>
            <select
              id="scholarshipType"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="ALL">ALL</option>
              {scholarshipTypes.length > 0 ? (
                scholarshipTypes.map((type) => (
                  <option key={type.id} value={type.typeName}>
                    {type.typeName}
                  </option>
                ))
              ) : (
                <option>No types available</option>
              )}
            </select>
          </div>

          <h1>Available Scholarships</h1>
          <div className="scholarship-list">
            {filteredScholarships.length > 0 ? (
              filteredScholarships.map((scholarship) => (
                <div key={scholarship.id} className="scholarship-card">
                  <img
                    src={`https://scholarshipmanagement.up.railway.app/api/admin/uploads/${scholarship.companyImage}`}
                    alt={scholarship.name}
                    className="scholarship-image"
                  />
                  <div className="scholarship-details">
                    <h3>{scholarship.name}</h3>
                    <p>
                      <strong>Provider:</strong> {scholarship.provider}
                    </p>
                    <p>
                      <strong>Deadline:</strong> {scholarship.deadline}
                    </p>
                  </div>
                  <div className="buttons">
                    <button
                      className="apply-button"
                      onClick={() => handleApplyClick(scholarship)}
                    >
                      Apply
                    </button>
                    <button
                      className="details-button"
                      onClick={() => handleDetailsClick(scholarship)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No scholarships available at the moment.</p>
            )}
          </div>
        </main>
      </div>

      {/* Modal for Application Form */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Apply for {currentScholarship.name}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

<label>Email:</label>
<input
  type="email"
  value={formData.email}
  onChange={(e) =>
    setFormData({ ...formData, email: e.target.value })
  }
  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\\. [a-zA-Z]{2,}$"
  required
/>


<label>Gender:</label>
<div>
  <input
    type="radio"
    name="gender"
    value="Male"
    checked={formData.gender === "Male"}
    onChange={(e) =>
      setFormData({ ...formData, gender: e.target.value })
    }
  />
  <label>Male</label>
  <input
    type="radio"
    name="gender"
    value="Female"
    checked={formData.gender === "Female"}
    onChange={(e) =>
      setFormData({ ...formData, gender: e.target.value })
    }
  />
  <label>Female</label>
  <input
    type="radio"
    name="gender"
    value="Other"
    checked={formData.gender === "Other"}
    onChange={(e) =>
      setFormData({ ...formData, gender: e.target.value })
    }
  />
  <label>Other</label>
</div>


              <label>College Name:</label>
              <input
                type="text"
                value={formData.collegeName}
                onChange={(e) =>
                  setFormData({ ...formData, collegeName: e.target.value })
                }
              />
              <label>CGPA (out of 10):</label>
<input
  type="number"
  step="0.01"
  min="0"
  max="10"
  value={formData.cgpa || ""}
  onChange={(e) =>
    setFormData({ ...formData, cgpa: e.target.value })
  }
/>


<label>Contact Number:</label>
<input
  type="text"
  value={formData.contactNumber}
  onChange={(e) =>
    setFormData({ ...formData, contactNumber: e.target.value })
  }
  pattern="\d{10}"
  required
/>


              <label>Date of Birth:</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
              />

<label>Address:</label>
<textarea
  value={formData.address}
  onChange={(e) =>
    setFormData({ ...formData, address: e.target.value })
  }
  pattern="/^(?=.*[a-zA-Z])[\w\s,.-]+$/"
  required
/>


              <button type="submit">Submit Application</button>
              <button
            type="button"
            className="close-button"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Details */}
      {isDetailsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Details for {currentScholarship.name}</h2>
            <p>
              <strong>Provider:</strong> {currentScholarship.provider}
            </p>
            <p>
              <strong>Description:</strong> {currentScholarship.description}
            </p>
            <p>
              <strong>Deadline:</strong> {currentScholarship.deadline}
            </p>
            <button
              className="close-button"
              onClick={() => setIsDetailsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
