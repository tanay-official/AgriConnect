// src/components/Users.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteModal from './DeleteModal'; // Import the modal component
import './Dashboard.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5005/api/admin/users')
      .then(res => setUsers(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err));
  }, []);

  const openDeleteModal = (id, name) => {
    setUserToDelete({ id, name });
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5005/api/admin/users/${userToDelete.id}`);
      setUsers(users.filter(user => user._id !== userToDelete.id));
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="dashboard-content">
      <h2 className="section-header">👥 Users ({users.length})</h2>
      <div className="data-grid">
        {users.map(user => (
          <div key={user._id} className="data-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <span className={`role-badge ${user.role?.toLowerCase() || 'farmer'}`}>
              {user.role || 'Farmer'}
            </span>
            <button className="delete-btn" onClick={() => openDeleteModal(user._id, user.name)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={deleteUser}
        itemName={userToDelete?.name}
      />
    </div>
  );
};

export default Users;
