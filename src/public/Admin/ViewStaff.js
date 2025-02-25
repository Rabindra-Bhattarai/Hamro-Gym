import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ViewStaff.css';

const ViewStaff = () => {
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', contact: '9876543210' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', contact: '9876543222' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const deleteStaff = (id) => {
    setStaffList(staffList.filter(staff => staff.id !== id));
  };

  const filteredStaff = staffList.filter(staff =>
    staff.contact.includes(searchTerm)
  );

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li><Link to="/admin-dashboard/view-staff">View Staff</Link></li>
            <li><Link to="/login" onClick={() => localStorage.removeItem("adminToken")}>Logout</Link></li>
          </ul>
        </nav>
      </aside>
      
      <main className="dashboard-content">
        <h2>Staff Details</h2>
        <input
          type="text"
          placeholder="Search by Contact"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <table className="staff-table">
          <thead>
            <tr>
              <th>FullName</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.contact}</td>
                <td>
                  <button onClick={() => deleteStaff(staff.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ViewStaff;