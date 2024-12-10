import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setError("User is not logged in.");
        setLoading(false);
        return;
      }

      const endpoint = `http://localhost:8080/api/users/${userId}`;

      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setFormData({
            name: data.name,
            email: data.email,
            password: "", // Password will be empty initially
          });
        } else {
          const errorMessage = await response.text();
          setError(errorMessage || "Failed to fetch profile details.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("An error occurred while fetching profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    const userId = localStorage.getItem("userId");
    const endpoint = `http://localhost:8080/api/users/${userId}`;

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsEditing(false); // Exit edit mode
        alert("Profile updated successfully.");
      } else {
        const errorMessage = await response.text();
        alert(errorMessage || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("An error occurred while updating profile.");
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
      {profile && (
        <div className="profile-details">
          {isEditing ? (
            <div className="edit-form">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                />
              </label>
              <button className="save-button" onClick={handleUpdate}>
                Save
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <ul>
              <li>
                <strong>Name:</strong> {profile.name}
              </li>
              <li>
                <strong>Email:</strong> {profile.email}
              </li>
              <li>
                <strong>Role:</strong> {profile.role || "User"}
              </li>
            </ul>
          )}
        </div>
      )}
      {!isEditing && (
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Update Profile
        </button>
      )}
    </div>
  );
};

export default Profile;
