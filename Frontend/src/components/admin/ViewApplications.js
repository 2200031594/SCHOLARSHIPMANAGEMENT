import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewApplications.css";
import Sidebar from "./Sidebar"; // Import Sidebar

const ViewApplications = () => {
  const [scholarships, setScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Fetch scholarships
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

  // Fetch applications for a selected scholarship
  const fetchApplications = async (scholarshipId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/applications/scholarship/${scholarshipId}`);
      setApplications(response.data);
      setSelectedScholarship(scholarshipId);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  // Handle approve or reject action
  const handleAction = async (applicationId, action) => {
    try {
      await axios.put(`http://localhost:8080/api/applications/${applicationId}/${action}`);
      alert(`Application ${action}d successfully!`);
      // Refresh applications list after action
      fetchApplications(selectedScholarship);
    } catch (error) {
      console.error(`Error ${action}ing application:`, error);
      alert(`Failed to ${action} application.`);
    }
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    document.getElementById("application-dialog").showModal(); // Open the dialog window
  };

  return (
    <div className="view-applications">
      <Sidebar />
      <h1>View Applications</h1>
      <div className="scholarship-list">
        <h2>Scholarships</h2>
        {scholarships.map((scholarship) => (
          <div key={scholarship.id} className="scholarship-item">
            <h3>{scholarship.name}</h3>
            <button onClick={() => fetchApplications(scholarship.id)}>View Applications</button>
          </div>
        ))}
      </div>

      {applications.length > 0 && (
        <div className="application-list">
          <h2>Applications for Scholarship ID: {selectedScholarship}</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>{application.name}</td>
                  <td>{application.status || "Pending"}</td>
                  <td>
                    <button onClick={() => handleViewApplication(application)}>
                      View
                    </button>
                    <button
                      onClick={() => handleAction(application.id, "approve")}
                      style={{ color: "green" }}
                      disabled={application.status && application.status !== "Pending"}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(application.id, "reject")}
                      style={{ color: "red" }}
                      disabled={application.status && application.status !== "Pending"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Dialog Modal for Application Details */}
      {selectedApplication && (
        <dialog id="application-dialog" className="application-dialog">
          <h3>Application Details</h3>
          <form>
            <div className="form-group">
              <label>ID</label>
              <input type="text" value={selectedApplication.id} readOnly />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={selectedApplication.name} readOnly />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={selectedApplication.email} readOnly />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <input type="text" value={selectedApplication.gender} readOnly />
            </div>
            <div className="form-group">
              <label>College Name</label>
              <input type="text" value={selectedApplication.collegeName} readOnly />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input type="text" value={selectedApplication.contactNumber} readOnly />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" value={selectedApplication.dateOfBirth} readOnly />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" value={selectedApplication.address} readOnly />
            </div>
            <div className="form-group">
              <label>CGPA</label>
              <input type="text" value={selectedApplication.cgpa} readOnly />
            </div>
            <div className="form-group">
              <label>Status</label>
              <input type="text" value={selectedApplication.status || "Pending"} readOnly />
            </div>
          </form>
          <div className="application-actions">
            <button
              onClick={() => handleAction(selectedApplication.id, "approve")}
              style={{ color: "green" }}
              disabled={selectedApplication.status && selectedApplication.status !== "Pending"}
            >
              Approve
            </button>
            <button
              onClick={() => handleAction(selectedApplication.id, "reject")}
              style={{ color: "red" }}
              disabled={selectedApplication.status && selectedApplication.status !== "Pending"}
            >
              Reject
            </button>
            <button onClick={() => document.getElementById("application-dialog").close()}>
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ViewApplications;
