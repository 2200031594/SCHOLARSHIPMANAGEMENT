import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);

  // Fetch scholarships from the backend
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/scholarships");
        setScholarships(response.data);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      }
    };
    fetchScholarships();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/delete-scholarship/${id}`);
      setScholarships((prevScholarships) =>
        prevScholarships.filter((scholarship) => scholarship.id !== id)
      );
      alert("Scholarship deleted successfully!");
    } catch (error) {
      console.error("Error deleting scholarship:", error);
      alert("Failed to delete scholarship.");
    }
  };

  // Navigate to the update form
  const handleUpdate = (id) => {
    navigate(`/update-scholarship/${id}`);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
        <li onClick={() => navigate("/admin-dashboard")}>Dashboard</li>
  <li onClick={() => navigate("/add-scholarship")}>Add Scholarship</li>
  <li onClick={() => navigate("/add-scholarship-type")}>Add Scholarship Type</li>
  <li onClick={() => navigate("/manage-users")}>Manage Users</li>
  <li onClick={() => navigate("/view-applications")}>View Applications</li>
  <li onClick={() => navigate("/reports")}>Reports</li>
</ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Scholarships</h1>
        <div className="scholarship-grid">
          {scholarships.map((scholarship) => (
            <div key={scholarship.id} className="scholarship-card">
              <img
                src={`http://localhost:8080/api/admin/uploads/${scholarship.companyImage}`}
                alt={scholarship.name}
                className="scholarship-image"
              />
              <h3>{scholarship.name}</h3>
              <div className="scholarship-actions">
                <button onClick={() => handleUpdate(scholarship.id)}>Update</button>
                <button onClick={() => handleDelete(scholarship.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
