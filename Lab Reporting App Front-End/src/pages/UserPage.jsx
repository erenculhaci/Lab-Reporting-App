import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import Navbar from '../components/Navbar';
import { useAuth } from '../AuthContext';  
import '../styles/UserPage.css';  // Import the CSS file

const UserPage = () => {
  const { username: authenticatedUsername } = useAuth();  
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', email: '', role: '' });
  const [editUser, setEditUser] = useState(null);
  const [authenticatedUserRole, setAuthenticatedUserRole] = useState('');

  useEffect(() => {
    if (authenticatedUsername) {
      fetchAuthenticatedUserRole(authenticatedUsername);
    }
    fetchUsers();
  }, [authenticatedUsername]);

  const fetchUsers = async () => {
    if (authenticatedUserRole === 'ROLE_USER') {
      return;
    }
    try {
      const { data } = await api.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchAuthenticatedUserRole = async (username) => {
    try {
      const { data: user } = await api.getUser(username);
      setAuthenticatedUserRole(user.role); 
    } catch (error) {
      console.error('Error fetching authenticated user role:', error);
    }
  };

  const handleCreate = async () => {
    try {
      if (authenticatedUserRole === 'ROLE_USER') {
        await api.createNonAdminUser(newUser.username, newUser.password, newUser.email);
      } else {
        await api.createUser(newUser.username, newUser.password, newUser.email, newUser.role);
      }
      setNewUser({ username: '', password: '', email: '', role: '' });
      alert('User created successfully!');
      fetchUsers();
    } catch (error) {
      alert('Error creating user!');
      console.error('Error creating user:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (editUser) {
        await api.updateUser(editUser.id, editUser.username, editUser.password, editUser.email, editUser.role);
        setEditUser(null);
        alert('User updated successfully!');
        fetchUsers();
      }
    } catch (error) {
      alert('Error updating user!');
      console.error('Error updating user:', error);
    }
  };

  const handleCancelUpdate = () => {
    setEditUser(null);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteUser(id);
      alert('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      alert('Error deleting user!');
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <h1>Users</h1>

      <div className={`form-container ${authenticatedUserRole === 'ROLE_USER' ? 'user-role' : ''}`}>
        <h2>{editUser ? 'Update User' : 'Create New User'}</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={editUser ? editUser.username : newUser.username}
            onChange={(e) => editUser ? setEditUser({ ...editUser, username: e.target.value }) : setNewUser({ ...newUser, username: e.target.value })}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={editUser ? editUser.password : newUser.password}
            onChange={(e) => editUser ? setEditUser({ ...editUser, password: e.target.value }) : setNewUser({ ...newUser, password: e.target.value })}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={editUser ? editUser.email : newUser.email}
            onChange={(e) => editUser ? setEditUser({ ...editUser, email: e.target.value }) : setNewUser({ ...newUser, email: e.target.value })}
            className="form-input"
          />
        </div>
        {authenticatedUserRole !== 'ROLE_USER' && (
          <div className="form-group">
            <select
              value={editUser ? editUser.role : newUser.role}
              onChange={(e) => editUser ? setEditUser({ ...editUser, role: e.target.value }) : setNewUser({ ...newUser, role: e.target.value })}
              className="form-select"
            >
              <option value="">Select Role</option>
              <option value="ROLE_ADMIN">Admin</option>
              <option value="ROLE_USER">User</option>
            </select>
          </div>
        )}
        <div className="button-container">
          {editUser ? (
            <>
              <button className="button" onClick={handleUpdate}>Update</button>
              <button className="button cancel" onClick={handleCancelUpdate}>Cancel</button>
            </>
          ) : (
            <button className="button" onClick={handleCreate}>Create</button>
          )}
        </div>
      </div>

      {authenticatedUserRole !== 'ROLE_USER' && (
        <>
          <h1>User List</h1>
          <div className="list-cards-container">
            {users.map((user) => (
              <div className="list-card" key={user.id}>
                <h3>{user.username}</h3>
                <p>ID: {user.id}</p>
                <button className="button" onClick={() => setEditUser(user)}>Edit</button>
                <button className="button cancel" onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
