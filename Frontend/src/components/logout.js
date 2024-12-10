import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("https://scholarshipmanagement.up.railway.app/api/users/logout", {
        method: "POST",
      });
      if (response.ok) {
        alert("Logout successful");
        navigate("/login"); // Redirect to login page
      } else {
        alert("Error during logout");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
