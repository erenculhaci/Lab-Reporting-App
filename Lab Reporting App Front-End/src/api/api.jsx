import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const instance = axios.create({
  baseURL: API_URL,
});

// Function to set authorization header
export const setAuthorizationHeader = (username, password) => {
  const encodedCredentials = btoa(`${username}:${password}`);
  instance.defaults.headers.common['Authorization'] = `Basic ${encodedCredentials}`;
};

export const api = {
  instance,
  createLabTechnician: (data) => instance.post('/createLabTechnician', data),
  getAllLabTechnicians: () => instance.get('/admin/getAllLabTechnicians'),
  searchLabTechnicianByName: (firstName, lastName) => 
    instance.get('/searchLabTechnicianByLabTechnicianNameSurname', { params: { labTechnicianFirstName: firstName, labTechnicianLastName: lastName } }),
  searchLabTechnicianById: (id) => 
    instance.get('/searchLabTechnicianByLabTechnicianId', { params: { id } }),
  updateLabTechnician: (id, data) => instance.put('/admin/updateLabTechnician', data, { params: { id } }),
  deleteLabTechnician: (id) => instance.delete('/admin/deleteLabTechnician', { params: { id } }),

  createPatient: (data) => instance.post('/createPatient', data),
  getAllPatients: () => instance.get('/admin/getAllPatients'),
  searchPatientByName: (firstName, lastName) => 
    instance.get('/searchPatientByPatientNameSurname', { params: { patientFirstName: firstName, patientLastName: lastName } }),
  searchPatientById: (id) => 
    instance.get('/searchPatientByPatientId', { params: { id } }),
  updatePatient: (id, data) => instance.put('/admin/updatePatient', data, { params: { id } }),
  deletePatient: (id) => instance.delete('/admin/deletePatient', { params: { id } }),

  createReport: (data, photo) => {
    const formData = new FormData();
    formData.append('reportDTO', JSON.stringify(data));
    formData.append('photo', photo);
    return instance.post('/createReport', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getAllReports: () => instance.get('/admin/getAllReports'),
  searchReportByPatientName: (firstName, lastName) => 
    instance.get('/searchReportByPatientNameSurname', { params: { patientFirstName: firstName, patientLastName: lastName } }),
  searchReportByPatientTC: (tc) => 
    instance.get('/searchReportByPatientTC', { params: { patientTC: tc } }),
  searchReportByLabTechnician: (name, surname) => 
    instance.get('/searchReportByLabTechnician', { params: { labTechnicianName: name, labTechnicianSurname: surname } }),
  updateReport: (id, data, photo) => {
    const formData = new FormData();
    formData.append('reportDTO', JSON.stringify(data));
    if (photo) {
      formData.append('photo', photo); 
    }
    
    return instance.put('/admin/updateReport', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { id } 
    });
  },
  deleteReport: (id) => instance.delete('/admin/deleteReport', { params: { id } }),

  createUser: (username, password, email, role) => 
    instance.post('/admin/createUser', null, { params: { username, password, email, role } }),
  updateUser: (id, username, password, email, role) => 
    instance.put('/admin/updateUser', null, { params: { id, username, password, email, role } }),
  deleteUser: (id) => instance.delete('/admin/deleteUser', { params: { id } }),
  getAllUsers: () => instance.get('/admin/getAllUsers'),
};
