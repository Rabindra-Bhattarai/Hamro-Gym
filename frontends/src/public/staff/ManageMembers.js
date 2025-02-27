import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ManageMembers.css';

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    membershipType: 'basic',
    startDate: '',
    expiryDate: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedMembers = JSON.parse(localStorage.getItem('members')) || [];
    setMembers(savedMembers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.fullName || !newMember.phoneNumber || !newMember.email || !newMember.startDate || !newMember.expiryDate) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedMembers = [...members, { ...newMember, id: Date.now(), status: 'active' }];
    localStorage.setItem('members', JSON.stringify(updatedMembers));
    setMembers(updatedMembers);

    setNewMember({ fullName: '', phoneNumber: '', email: '', membershipType: 'basic', startDate: '', expiryDate: '' });
  };

  const handleMembershipAction = (id, action) => {
    const updatedMembers = members.map((member) =>
      member.id === id
        ? { ...member, status: action === 'continue' ? 'active' : 'inactive', expiryDate: action === 'continue' ? '2024-12-31' : member.expiryDate }
        : member
    );

    localStorage.setItem('members', JSON.stringify(updatedMembers));
    setMembers(updatedMembers);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="manage-members-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>🏋️ Staff Dashboard</h2>
        <ul>
          <li><Link to="/staff-dashboard/manage-members">Manage Members</Link></li>
          <li><Link to="/staff-dashboard/schedule-class">Schedule Class</Link></li>
          <li><Link to="/staff-dashboard/view-classes">View Classes</Link></li>
          <li><button className="logout-btn" onClick={handleLogout}>🚪 Logout</button></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="manage-members-content">
        <h2>Manage Members</h2>

        {/* Add Member Form */}
        <form className="add-member-form" onSubmit={handleAddMember}>
          <input type="text" name="fullName" value={newMember.fullName} onChange={handleInputChange} placeholder="Full Name" required />
          <input type="text" name="phoneNumber" value={newMember.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" required />
          <input type="email" name="email" value={newMember.email} onChange={handleInputChange} placeholder="Email" required />
          <select name="membershipType" value={newMember.membershipType} onChange={handleInputChange} required>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="gold">Gold</option>
          </select>
          <input type="date" name="startDate" value={newMember.startDate} onChange={handleInputChange} required />
          <input type="date" name="expiryDate" value={newMember.expiryDate} onChange={handleInputChange} required />
          <button type="submit">Add Member</button>
        </form>

        {/* Members List */}
        <div className="members-list">
          <h3>Members List</h3>
          {members.length === 0 ? <p>No members found.</p> : (
            <ul>
              {members.map((member) => (
                <li key={member.id}>
                  {member.fullName} - {member.phoneNumber} ({member.membershipType})
                  <br />
                  Status: {member.status}
                  <br />
                  <button className="continue-btn" onClick={() => handleMembershipAction(member.id, 'continue')} disabled={member.status === 'active'}>Continue</button>
                  <button className="remove-btn" onClick={() => handleMembershipAction(member.id, 'remove')} disabled={member.status === 'inactive'}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;
