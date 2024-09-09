import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import Navbar from '../components/Navbar';
import '../styles/styles.css';
import { useAuth } from '../AuthContext';

const LabTechnicianPage = () => {
  const { username: authenticatedUsername } = useAuth();
  const [authenticatedUserRole, setAuthenticatedUserRole] = useState('');

  const [labTechnicians, setLabTechnicians] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [newLabTechnician, setNewLabTechnician] = useState({ id: '', firstName: '', lastName: '' });
  const [editLabTechnician, setEditLabTechnician] = useState(null);

  useEffect(() => {
    fetchLabTechnicians();
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

  const fetchLabTechnicians = async () => {
    try {
      const { data } = await api.getAllLabTechnicians();
      setLabTechnicians(data);
    } catch (error) {
      console.error('Error fetching lab technicians:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const { data } = await api.searchLabTechnicianByName(firstName, lastName);
      setLabTechnicians(data);
    } catch (error) {
      console.error('Error searching lab technicians:', error);
    }
  };

  const handleSearchById = async () => {
    try {
      const { data } = await api.searchLabTechnicianById(id);
      setLabTechnicians(data);
    } catch (error) {
      console.error('Error searching lab technician by ID:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await api.createLabTechnician(newLabTechnician);
      setNewLabTechnician({ id: '', firstName: '', lastName: '' });
      alert('Lab technician created successfully!');
      fetchLabTechnicians();
    } catch (error) {
      alert('Error creating lab technician.');
      console.error('Error creating lab technician:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (editLabTechnician) {
        const updatedData = { firstName: editLabTechnician.firstName, lastName: editLabTechnician.lastName };
        await api.updateLabTechnician(editLabTechnician.id, updatedData);
        setEditLabTechnician(null);
        alert('Lab technician updated successfully!');
        fetchLabTechnicians();
      }
    } catch (error) {
      alert('Error updating lab technician.');
      console.error('Error updating lab technician:', error);
    }
  };

  const handleCancelUpdate = () => {
    setEditLabTechnician(null);
    window.scrollTo(0, 0); 
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteLabTechnician(id);
      alert('Lab technician deleted successfully!');
      fetchLabTechnicians();
    } catch (error) {
      alert('Error deleting lab technician.');
      console.error('Error deleting lab technician:', error);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <h1>Lab Technicians</h1>
      <div className="card-container">
      <div className="search-card">
        <h2>Search Lab Technicians</h2>
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
          placeholder="ID (7 digits)"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="button" onClick={handleSearchById}>Search by ID</button>
      </div>

      <div className="form-card">
        <h2>{editLabTechnician ? 'Update Lab Technician' : 'Create New Lab Technician'}</h2>
        {editLabTechnician ? (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={editLabTechnician.firstName}
              onChange={(e) => setEditLabTechnician({ ...editLabTechnician, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={editLabTechnician.lastName}
              onChange={(e) => setEditLabTechnician({ ...editLabTechnician, lastName: e.target.value })}
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
              placeholder="ID (7 digits)"
              value={newLabTechnician.id}
              onChange={(e) => setNewLabTechnician({ ...newLabTechnician, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="First Name"
              value={newLabTechnician.firstName}
              onChange={(e) => setNewLabTechnician({ ...newLabTechnician, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newLabTechnician.lastName}
              onChange={(e) => setNewLabTechnician({ ...newLabTechnician, lastName: e.target.value })}
            />
            <button className="button" onClick={handleCreate}>Create</button>
          </>
        )}
      </div>

        {authenticatedUserRole !== 'ROLE_USER' && (
          <>
          <div className='button-container'>
            <button className='button' onClick={fetchLabTechnicians}>Fetch All Technicians</button>
          </div>
          </>)}
    </div>

<h1>Lab Technician List</h1>
      <div className="list-cards-container">
        {labTechnicians.map((technician) => (
          <div className="list-card" key={technician.id}>
            <h3>{technician.firstName} {technician.lastName}</h3>
            <p>ID: {technician.id}</p>
            {authenticatedUserRole !== 'ROLE_USER' && (<>
              <button className="button" onClick={() => setEditLabTechnician(technician)}>Edit</button>
              <button className="button cancel" onClick={() => handleDelete(technician.id)}>Delete</button>
              </>)}         
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabTechnicianPage;