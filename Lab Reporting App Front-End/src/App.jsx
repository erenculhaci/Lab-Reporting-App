import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LabTechnicianPage from './pages/LabTechnicianPage';
import PatientPage from './pages/PatientPage';
import ReportPage from './pages/ReportPage';
import UserPage from './pages/UserPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lab-technicians" element={<LabTechnicianPage />} />
        <Route path="/patients" element={<PatientPage />} />
        <Route path="/reports" element={<ReportPage />} />
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
