import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./Sidebar";
import './AddScholarship.css';

const AddScholarship = () => {
  const [formData, setFormData] = useState({
    name: '',
    eligibility: '',
    aboutProgram: '',
    benefits: '',
    deadline: '',
    companyImage: null,
    type: '', // New field for type
  });

  const [types, setTypes] = useState([]); // State to store types

  // Fetch types from the backend
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/scholarship-types');
        setTypes(response.data); // Assuming response.data is an array of types
      } catch (error) {
        console.error('Error fetching scholarship types:', error);
      }
    };

    fetchTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('eligibility', formData.eligibility);
    formDataToSend.append('aboutProgram', formData.aboutProgram);
    formDataToSend.append('benefits', formData.benefits);
    formDataToSend.append('deadline', formData.deadline);
    formDataToSend.append('companyImage', formData.companyImage);
    formDataToSend.append('type', formData.type); // Add type to the payload

    try {
      const response = await axios.post('http://localhost:8080/api/admin/add-scholarship', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Scholarship added successfully!');
      setFormData({
        name: '',
        eligibility: '',
        aboutProgram: '',
        benefits: '',
        deadline: '',
        companyImage: null,
        type: '', // Reset type
      });
    } catch (error) {
      alert('Error adding scholarship: ' + error.response?.data || error.message);
    }
  };

  return (
    <div className="add-scholarship-container">
      <Sidebar />
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Eligibility:</label>
        <input
          type="text"
          name="eligibility"
          value={formData.eligibility}
          onChange={handleChange}
          required
        />

        <label>About the Program:</label>
        <textarea
          name="aboutProgram"
          value={formData.aboutProgram}
          onChange={handleChange}
          required
        ></textarea>

        <label>Benefits:</label>
        <textarea
          name="benefits"
          value={formData.benefits}
          onChange={handleChange}
          required
        ></textarea>

        <label>Deadline:</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />

        <label>Type:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Type
          </option>
          {types.map((type) => (
            <option key={type.id} value={type.typeName}>
              {type.typeName}
            </option>
          ))}
        </select>

        <label>Company Image:</label>
        <input
          type="file"
          name="companyImage"
          onChange={handleFileChange}
          accept="image/*"
          required
        />

        <button type="submit">Add Scholarship</button>
      </form>
    </div>
  );
};

export default AddScholarship;
