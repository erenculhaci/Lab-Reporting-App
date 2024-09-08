import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/HomePage.css'; 

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <h1>Welcome to the Laboratory Reporting System</h1>
      <nav>
        <ul>
          <li>
            <Link to="/lab-technicians">Lab Technicians</Link>
          </li>
          <li>
            <Link to="/patients">Patients</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
