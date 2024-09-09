import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LabTechnicianPage from './pages/LabTechnicianPage';
import PatientPage from './pages/PatientPage';
import ReportPage from './pages/ReportPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './AuthContext';

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/lab-technicians" element={<ProtectedRoute element={<LabTechnicianPage />} />} />
          <Route path="/patients" element={<ProtectedRoute element={<PatientPage />} />} />
          <Route path="/reports" element={<ProtectedRoute element={<ReportPage />} />} />
          <Route path="/users" element={<ProtectedRoute element={<UserPage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
