// src/components/ApplicationForm.js
import React, { useState } from 'react';

const ApplicationForm = ({ scholarshipId }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    academicDetails: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send application data to backend
    // fetch(`/api/scholarships/${scholarshipId}/apply`, { method: 'POST', body: JSON.stringify(userData) });

    alert('Application submitted successfully!');
  };

  return (
    <div className="application-form">
      <h2>Application Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={userData.name} onChange={handleInputChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={userData.email} onChange={handleInputChange} required />

        <label>Academic Details:</label>
        <textarea name="academicDetails" value={userData.academicDetails} onChange={handleInputChange} required />

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
