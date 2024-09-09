import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import '../styles/styles.css';
import Navbar from '../components/Navbar';
import { useAuth } from '../AuthContext';

const ReportPage = () => {
  const { username: authenticatedUsername } = useAuth();
  const [authenticatedUserRole, setAuthenticatedUserRole] = useState('');

  const [reports, setReports] = useState([]);
  const [fileNumber, setFileNumber] = useState('');
  const [diagnosisTitle, setDiagnosisTitle] = useState('');
  const [diagnosisDetails, setDiagnosisDetails] = useState('');
  const [labTechnicians, setLabTechnicians] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedLabTechnicianId, setSelectedLabTechnicianId] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [reportImage, setReportImage] = useState(null);
  const [editReport, setEditReport] = useState(null);
  const [searchPatientName, setSearchPatientName] = useState('');
  const [searchPatientTC, setSearchPatientTC] = useState('');
  const [searchLabTechnicianName, setSearchLabTechnicianName] = useState('');
  const [searchLabTechnicianSurname, setSearchLabTechnicianSurname] = useState('');

  useEffect(() => {
    fetchReports();
    fetchLabTechnicians();
    fetchPatients();
    fetchAuthenticatedUserRole(authenticatedUsername);
  }, []);

  const fetchAuthenticatedUserRole = async (username) => {
    try {
      const { data: user } = await api.getUser(username);
      setAuthenticatedUserRole(user.role); 
    } catch (error) {
      console.error('Error fetching authenticated user role:', error);
    }
  };

  const fetchReports = async () => {
    try {
      const { data } = await api.getAllReports();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const fetchLabTechnicians = async () => {
    try {
      const { data } = await api.getAllLabTechnicians();
      setLabTechnicians(data);
    } catch (error) {
      console.error('Error fetching lab technicians:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const { data } = await api.getAllPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();
    const reportData = {
      fileNumber,
      diagnosisTitle,
      diagnosisDetails,
      labTechnicianId: selectedLabTechnicianId,
      patientId: selectedPatientId,
    };

    try {
      await api.createReport(reportData, reportImage);
      alert('Report created successfully');
      fetchReports();
      resetForm();
    } catch (error) {
      alert('Failed to create report');
      console.error('Error creating report:', error);
    }
  };
  
  const handleUpdateReport = async (e) => {
    e.preventDefault();
  
    if (!editReport) return;
  
    const reportData = {
      fileNumber: fileNumber || editReport.fileNumber,
      diagnosisTitle: diagnosisTitle || editReport.diagnosisTitle,
      diagnosisDetails: diagnosisDetails || editReport.diagnosisDetails,
      labTechnicianId: selectedLabTechnicianId || editReport.labTechnicianId,
      patientId: selectedPatientId || editReport.patientId
    };
  
    try {
      const response = await api.updateReport(editReport.id, reportData, reportImage);
      if (response.status === 200) {
        alert('Report updated successfully');
        setEditReport(null);
        fetchReports();
      } else {
        alert ('Failed to update report');
        throw new Error('Failed to update report');
      }
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  const handleDeleteReport = async (id) => {
    try {
      await api.deleteReport(id);
      alert('Report deleted successfully');
      fetchReports();
    } catch (error) {
      alert('Failed to delete report');
      console.error('Error deleting report:', error);
    }
  };

  const handleEditReport = (report) => {
    setEditReport(report);
    setFileNumber(report.fileNumber);
    setDiagnosisTitle(report.diagnosisTitle);
    setDiagnosisDetails(report.diagnosisDetails);
    setSelectedLabTechnicianId(report.labTechnicianId);
    setSelectedPatientId(report.patientId);
  };

  const handleSearchByPatientName = async () => {
    try {
      const [firstName, lastName] = searchPatientName.split(' ');
      const { data } = await api.searchReportByPatientName(firstName, lastName);
      setReports(data);
    } catch (error) {
      console.error('Error searching reports by patient name:', error);
    }
  };

  const handleSearchByPatientTC = async () => {
    try {
      const { data } = await api.searchReportByPatientTC(searchPatientTC);
      setReports(data);
    } catch (error) {
      console.error('Error searching reports by patient TC:', error);
    }
  };

  const handleSearchByLabTechnician = async () => {
    try {
      const { data } = await api.searchReportByLabTechnician(searchLabTechnicianName, searchLabTechnicianSurname);
      setReports(data);
    } catch (error) {
      console.error('Error searching reports by lab technician:', error);
    }
  };

  const resetForm = () => {
    setFileNumber('');
    setDiagnosisTitle('');
    setDiagnosisDetails('');
    setSelectedLabTechnicianId('');
    setSelectedPatientId('');
    setReportImage(null);
  };

  return (
    <div className="page-container">
      <Navbar />

      <div className="search-cards">

        <div className="search-card">
          <h2>Search Reports by Patient Name</h2>
          <input
            type="text"
            placeholder="Patient Name Surname"
            value={searchPatientName}
            onChange={(e) => setSearchPatientName(e.target.value)}
          />
          <button className="button" onClick={handleSearchByPatientName}>Search</button>
        </div>

        <div className="search-card">
          <h2>Search Reports by Patient TC</h2>
          <input
            type="text"
            placeholder="Patient TC"
            value={searchPatientTC}
            onChange={(e) => setSearchPatientTC(e.target.value)}
          />
          <button className="button" onClick={handleSearchByPatientTC}>Search</button>
        </div>

        <div className="search-card">
          <h2>Search Reports by Lab Technician</h2>
          <input
            type="text"
            placeholder="Lab Technician Name"
            value={searchLabTechnicianName}
            onChange={(e) => setSearchLabTechnicianName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Lab Technician Surname"
            value={searchLabTechnicianSurname}
            onChange={(e) => setSearchLabTechnicianSurname(e.target.value)}
          />
          <button className="button" onClick={handleSearchByLabTechnician}>Search</button>
        </div>

      </div>

      <form onSubmit={editReport ? handleUpdateReport : handleCreateReport} className="form-container">
        <h2>{editReport ? 'Update Report' : 'Create Report'}</h2>
        <label>
          File Number:
          <input type="number" value={fileNumber} onChange={(e) => setFileNumber(e.target.value)} required />
        </label>
        <label>
          Diagnosis Title:
          <input type="text" value={diagnosisTitle} onChange={(e) => setDiagnosisTitle(e.target.value)} required />
        </label>
        <label>
          Diagnosis Details:
          <textarea value={diagnosisDetails} onChange={(e) => setDiagnosisDetails(e.target.value)} required />
        </label>
        <label>
          Lab Technician:
          <select value={selectedLabTechnicianId} onChange={(e) => setSelectedLabTechnicianId(e.target.value)} required>
            <option value="">Select a Lab Technician</option>
            {labTechnicians.map(tech => (
              <option key={tech.id} value={tech.id}>
                {tech.firstName} {tech.lastName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Patient:
          <select value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)} required>
            <option value="">Select a Patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.firstName} {patient.lastName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Report Image:
          <input type="file" onChange={(e) => setReportImage(e.target.files[0])} />
        </label>
        <button type="submit" className="button">{editReport ? 'Update Report' : 'Create Report'}</button>
        {editReport && <button type="button" className="button cancel" onClick={() => setEditReport(null)}>Cancel</button>}
      </form>


      {authenticatedUserRole !== 'ROLE_USER' && (
        <>
        <div className="button-container">
          <button className="button" onClick={fetchReports}>Fetch All Reports</button>
        </div>
        </>
      )}

      
      <h2>Reports List</h2>
      <div className="list-cards-container">
        {reports.map(report => (
          <div key={report.id} className="list-card">
            <h3>{report.diagnosisTitle}</h3>
            <p><strong>Report Id: </strong>{report.id}</p>
            <p><strong>File Number:</strong> {report.fileNumber}</p>
            <p><strong>Diagnosis Details:</strong> {report.diagnosisDetails}</p>
            <p><strong>Report Date:</strong> {new Date(report.reportDate).toLocaleString()}</p>
            <p><strong>Lab Technician:</strong> {report.labTechnicianName} {report.labTechnicianSurname}</p>
            <p><strong>Lab Technician Hospital Id:</strong> {report.labTechnicianId}</p>
            <p><strong>Patient:</strong> {report.patientName} {report.patientSurname}</p>
            <p><strong>Patient TC:</strong> {report.patientId}</p>
            <div className="report-image">
              {report.reportImageBase64 ? (
                <img src={`data:image/jpeg;base64,${report.reportImageBase64}`} alt="Report" />
              ) : 'No Image'}
            </div>
            {authenticatedUserRole !== 'ROLE_USER' && (
              <>
              <button className="button" onClick={() => handleEditReport(report)}>Edit</button>
              <button className="button cancel" onClick={() => handleDeleteReport(report.id)}>Delete</button>
            </>
          )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportPage;
