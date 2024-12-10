// src/components/HomePage.js
import React from "react";
import Footer from "./Footer";
import "./HomePage.css"; // Add CSS for styling

const HomePage = () => {
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <img
            src="/path-to-your-logo.png"
            alt="Scholarship Finder Logo"
            className="logo-image"
          />
        </div>
        <nav className="nav-links">
          <ul>
            <li onClick={() => handleScroll("about")}>About</li>
            <li onClick={() => handleScroll("contact")}>Contact</li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
        <h1 style={{ fontSize: "2.5rem", color: "black" }}>
            Find and Manage Scholarships with Ease
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              color: "black",
            }}
          >
            Your path to financial aid starts here.
          </p>
        </div>
      </section>

      {/* About Section */}
<section id="about" className="about-section">
  <div className="about-content">
    <h2>About Scholarship Finder</h2>
    <p>
      Scholarship Finder is your one-stop platform designed to simplify the journey of 
      securing scholarships and financial aid. Whether you're a student looking for 
      funding opportunities or a parent seeking resources for your child's education, 
      we make the process seamless and efficient.
    </p>
    <ul className="about-features">
      <li>📚 Discover scholarships tailored to your profile and needs.</li>
      <li>🚀 Track deadlines, application statuses, and upcoming opportunities.</li>
      <li>🌐 Easy-to-use interface for both students and parents.</li>
      <li>🔒 Securely manage and store your scholarship applications in one place.</li>
    </ul>
    <p>
      Join thousands of students who have already unlocked their academic dreams with 
      Scholarship Finder. Your success starts here!
    </p>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>Contact us at email@example.com or +1 (555) 123-4567.</p>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
