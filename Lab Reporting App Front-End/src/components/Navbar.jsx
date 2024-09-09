import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Laboratory System</Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/lab-technicians" className="navbar-link">Lab Technicians</Link>
          </li>
          <li className="navbar-item">
            <Link to="/patients" className="navbar-link">Patients</Link>
          </li>
          <li className="navbar-item">
            <Link to="/reports" className="navbar-link">Reports</Link>
          </li>
          <li className="navbar-item">
            <Link to="/users" className="navbar-link">Users</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">Logout</Link>
          </li>
          <li className="navbar-item">
            <button onClick={toggleDarkMode} className="navbar-darkmode-btn">
              {darkMode ? '🌞' : '🌙'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
