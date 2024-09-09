import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
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
          <li className='navbar-item'>
            <Link to="/login" className="navbar-link">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
