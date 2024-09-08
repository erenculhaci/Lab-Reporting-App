import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import Navbar from '../components/Navbar';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [newUser, setNewUser] = useState({ username: '', password: '', email: '', role: '' });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await api.createUser(newUser.username, newUser.password, newUser.email, newUser.role);
      setNewUser({ username: '', password: '', email: '', role: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (editUser) {
        await api.updateUser(editUser.id, editUser.username, editUser.password, editUser.email, editUser.role);
        setEditUser(null);
        fetchUsers();
      }
    } catch (error) {
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
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <h1>Users</h1>

      <div
        className="form-container"
        style={{
          width: '400px',
          margin: '0 auto',
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2>{editUser ? 'Update User' : 'Create New User'}</h2>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Username"
            value={editUser ? editUser.username : newUser.username}
            onChange={(e) => editUser ? setEditUser({ ...editUser, username: e.target.value }) : setNewUser({ ...newUser, username: e.target.value })}
            style={{
              width: 'calc(100% - 20px)', 
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box', 
            }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={editUser ? editUser.password : newUser.password}
            onChange={(e) => editUser ? setEditUser({ ...editUser, password: e.target.value }) : setNewUser({ ...newUser, password: e.target.value })}
            style={{
              width: 'calc(100% - 20px)', 
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={editUser ? editUser.email : newUser.email}
            onChange={(e) => editUser ? setEditUser({ ...editUser, email: e.target.value }) : setNewUser({ ...newUser, email: e.target.value })}
            style={{
              width: 'calc(100% - 20px)',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <select
            value={editUser ? editUser.role : newUser.role}
            onChange={(e) => editUser ? setEditUser({ ...editUser, role: e.target.value }) : setNewUser({ ...newUser, role: e.target.value })}
            style={{
              width: 'calc(100% - 20px)',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box', 
              backgroundColor: '#fff',
              appearance: 'none', 
              WebkitAppearance: 'none', 
              MozAppearance: 'none', 
            }}
          >
            <option value="">Select Role</option>
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_USER">User</option>
          </select>
        </div>
        <div className="button-container" style={{ marginTop: '10px' }}>
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

    </div>
  );
};

export default UserPage;
