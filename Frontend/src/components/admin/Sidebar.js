import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default Sidebar;
