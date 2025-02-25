import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ViewMembers.css';

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("members")) || [];
    setMembers(storedMembers);
  }, []);

  const handleDelete = (id) => {
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
    localStorage.setItem("members", JSON.stringify(updatedMembers));
  };

  const handleEdit = (member) => {
    alert(`Editing member: ${JSON.stringify(member)}`);
  };

  const filteredMembers = members.filter(member =>
    member.contact.includes(searchTerm)
  );

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>HamroGym Staff</h2>
        <ul>
          <li><Link to="/staff-dashboard/view-members">View Members</Link></li>
          <li><Link to="/staff-dashboard/add-member">Add Member</Link></li>
          <li><Link to="/login" onClick={() => localStorage.clear()}>Logout</Link></li>
        </ul>
      </aside>
      
      <main className="dashboard-content">
        <h2>View Members</h2>
        <input
          type="text"
          placeholder="Search by Contact"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Membership</th>
              <th>Start Date</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.dob}</td>
                <td>{member.gender}</td>
                <td>{member.contact}</td>
                <td>{member.email}</td>
                <td>{member.address}</td>
                <td>{member.membership}</td>
                <td>{member.startDate}</td>
                <td>{member.expiryDate}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(member)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(member.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ViewMembers;