import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/HomePage.css'; 
import { useAuth } from '../AuthContext';

const HomePage = () => {
  const { username } = useAuth();

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

      <h3>You are signed in as: {username}</h3> {/* Display the username */}
      
      <Link to="/login" className="logout-link">Logout</Link>
    </div>
  );
};

export default HomePage;
