import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./UpdateScholarship.css";

const UpdateScholarship = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the scholarship ID from the URL
  const [scholarship, setScholarship] = useState({
    name: "",
    eligibility: "",
    aboutProgram: "",
    benefits: "",
    deadline: "",
    companyImage: null, // Updated to support file uploads
  });
  const [error, setError] = useState("");

  // Fetch the scholarship details for editing
  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const response = await axios.get(
          `https://scholarshipmanagement.up.railway.app/api/admin/scholarship/${id}`
        );
        setScholarship(response.data); // Ensure the API response structure matches the state fields
      } catch (error) {
        console.error("Error fetching scholarship:", error);
        setError("Failed to fetch scholarship details.");
      }
    };
    fetchScholarship();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScholarship({
      ...scholarship,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setScholarship({
      ...scholarship,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", scholarship.name);
    formData.append("eligibility", scholarship.eligibility);
    formData.append("aboutProgram", scholarship.aboutProgram);
    formData.append("benefits", scholarship.benefits);
    formData.append("deadline", scholarship.deadline);

    // Only append `companyImage` if a new file is selected
    if (scholarship.companyImage) {
      formData.append("companyImage", scholarship.companyImage);
    }

    try {
      await axios.put(
        `https://scholarshipmanagement.up.railway.app/api/admin/update-scholarship/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Scholarship updated successfully!");
      navigate("/admin-dashboard"); // Redirect back to admin dashboard
    } catch (error) {
      console.error("Error updating scholarship:", error);
      alert("Failed to update scholarship.");
    }
  };

  return (
    <div className="update-scholarship">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => navigate("/add-scholarship")}>Add Scholarship</li>
          <li onClick={() => navigate("/manage-users")}>Manage Users</li>
          <li onClick={() => navigate("/view-applications")}>
            View Applications
          </li>
          <li onClick={() => navigate("/reports")}>Reports</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="form-title">Update Scholarship</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="update-form">
          <label>Scholarship Name:</label>
          <input
            type="text"
            name="name"
            value={scholarship.name}
            onChange={handleChange}
            required
          />
          <label>Eligibility:</label>
          <textarea
            name="eligibility"
            value={scholarship.eligibility}
            onChange={handleChange}
            required
          />
          <label>About Program:</label>
          <textarea
            name="aboutProgram"
            value={scholarship.aboutProgram}
            onChange={handleChange}
            required
          />
          <label>Benefits:</label>
          <textarea
            name="benefits"
            value={scholarship.benefits}
            onChange={handleChange}
            required
          />
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={scholarship.deadline}
            onChange={handleChange}
            required
          />
          <label>Company Image:</label>
          <input
            type="file"
            name="companyImage"
            onChange={handleFileChange}
            accept="image/*"
          />
          <button type="submit">Update Scholarship</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateScholarship;
