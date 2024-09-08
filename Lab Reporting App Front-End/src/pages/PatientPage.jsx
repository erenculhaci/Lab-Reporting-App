import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import Navbar from '../components/Navbar';
import '../styles/styles.css';

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [newPatient, setNewPatient] = useState({ id: '', firstName: '', lastName: '' });
  const [editPatient, setEditPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data } = await api.getAllPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const { data } = await api.searchPatientByName(firstName, lastName);
      setPatients(data);
    } catch (error) {
      console.error('Error searching patients:', error);
    }
  };

  const handleSearchById = async () => {
    try {
      const { data } = await api.searchPatientById(id);
      setPatients(data);
    } catch (error) {
      console.error('Error searching patient by ID:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await api.createPatient(newPatient);
      setNewPatient({ id: '', firstName: '', lastName: '' });
      fetchPatients();
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (editPatient) {
        const updatedData = { firstName: editPatient.firstName, lastName: editPatient.lastName };
        await api.updatePatient(editPatient.id, updatedData);
        setEditPatient(null);
        fetchPatients();
      }
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleCancelUpdate = () => {
    setEditPatient(null);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    try {
      await api.deletePatient(id);
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <h1>Patients</h1>
      <div className="card-container">
        <div className="search-card">
          <h2>Search Patients</h2>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button className="button" onClick={handleSearch}>Search</button>
        </div>

        <div className="search-card">
          <h2>Search by ID</h2>
          <input
            type="text"
            placeholder="ID (11 digits)"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" onClick={handleSearchById}>Search by ID</button>
        </div>

        <div className="form-card">
          <h2>{editPatient ? 'Update Patient' : 'Create New Patient'}</h2>
          {editPatient ? (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={editPatient.firstName}
                onChange={(e) => setEditPatient({ ...editPatient, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={editPatient.lastName}
                onChange={(e) => setEditPatient({ ...editPatient, lastName: e.target.value })}
              />
              <div className="button-container">
                <button className="button" onClick={handleUpdate}>Update</button>
                <button className="button cancel" onClick={handleCancelUpdate}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="ID (11 digits)"
                value={newPatient.id}
                onChange={(e) => setNewPatient({ ...newPatient, id: e.target.value })}
              />
              <input
                type="text"
                placeholder="First Name"
                value={newPatient.firstName}
                onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newPatient.lastName}
                onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })}
              />
              <button className="button" onClick={handleCreate}>Create</button>
            </>
          )}
        </div>

        <div className='button-container'>
          <button className='button' onClick={fetchPatients}>Fetch All Patients</button>
        </div>
      </div>

      <h1>Patient List</h1>
      <div className="list-cards-container">
        {patients.map((patient) => (
          <div className="list-card" key={patient.id}>
            <h3>{patient.firstName} {patient.lastName}</h3>
            <p>ID: {patient.id}</p>
            <button className="button" onClick={() => setEditPatient(patient)}>Edit</button>
            <button className="button cancel" onClick={() => handleDelete(patient.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
