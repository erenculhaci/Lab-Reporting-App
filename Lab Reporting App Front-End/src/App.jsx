import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HomePage from './pages/HomePage';
import LabTechnicianPage from './pages/LabTechnicianPage';
import PatientPage from './pages/PatientPage';
import ReportPage from './pages/ReportPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames="fade"
      >
        <Routes location={location}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/lab-technicians" element={<ProtectedRoute element={<LabTechnicianPage />} />} />
          <Route path="/patients" element={<ProtectedRoute element={<PatientPage />} />} />
          <Route path="/reports" element={<ProtectedRoute element={<ReportPage />} />} />
          <Route path="/users" element={<ProtectedRoute element={<UserPage />} />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
