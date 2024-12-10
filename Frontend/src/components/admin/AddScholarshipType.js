import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import Sidebar
import "./AddScholarshipType.css";

const AddScholarshipType = () => {
  const [typeName, setTypeName] = useState("");

  const handleAddType = async () => {
    if (!typeName) {
      alert("Please enter a scholarship type name.");
      return;
    }
    try {
      await axios.post("https://scholarshipmanagement.up.railway.app/api/admin/add-scholarship-type", {
        typeName,
      });
      alert("Scholarship type added successfully!");
      setTypeName("");
    } catch (error) {
      console.error("Error adding scholarship type:", error);
      alert("Failed to add scholarship type.");
    }
  };

  // JSX should be inside the return statement
  return (
    <div className="admin-dashboard add-scholarship-type">
      <Sidebar /> {/* Include Sidebar */}
      <div className="main-content">
        <h1>Add Scholarship Type</h1>
        <div className="form-group">
          <label htmlFor="typeName">Scholarship Type Name:</label>
          <input
            type="text"
            id="typeName"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
          />
        </div>
        <button onClick={handleAddType}>Add Type</button>
      </div>
    </div>
  );
};

export default AddScholarshipType;
