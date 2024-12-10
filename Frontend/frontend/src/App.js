// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import ScholarshipDetails from './components/ScholarshipDetails';
import ApplicationForm from './components/ApplicationForm';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import AdminDashboard from './components/admin/AdminDashboard';
import AddScholarship from './components/admin/AddScholarship';
import './App.css';
import UpdateScholarship from './components/admin/UpdateScholarship';
import Profile from './components/Profile';
import AddScholarshipType from './components/admin/AddScholarshipType';
import ViewApplications from './components/admin/ViewApplications';
import MyApplications from './components/MyApplications';

function App() {
  const userType = localStorage.getItem('userType'); // Retrieve userType from localStorage

  return (
    <Router>
      {/* Render Header only if user is not an admin */}
      {/* {userType !== 'admin' && <Header />}  */}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scholarship-details" element={<ScholarshipDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/apply/:id" element={<ApplicationForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-scholarship" element={<AddScholarship />} />
        <Route path="/update-scholarship/:id" element={<UpdateScholarship/>}/>
        <Route path="/add-scholarship-type" element={<AddScholarshipType />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/view-applications" element={<ViewApplications/>}/>
        <Route path="/my-applications" element={<MyApplications/>}/>
      </Routes>
    </Router>
  );
}

export default App;
