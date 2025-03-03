import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ViewStaff.css';

const ViewStaff = () => {
  const [staffList, setStaffList] = useState([]);

  // Fetch staff data from API
  const fetchStaff = async () => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    try {
      const response = await axios.get('http://localhost:3010/api/staff', {
        headers: {
          Authorization: `Bearer ${token}` // Set the Authorization header
        }
      });
      setStaffList(response.data);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  // Delete staff member
  const deleteStaff = async (id) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    try {
      await axios.delete(`http://localhost:3010/api/staff/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Set the Authorization header
        }
      });
      // Refetch staff list after deletion
      fetchStaff();
    } catch (error) {
      console.error('Error deleting staff member:', error);
    }
  };

  // Fetch staff data on component mount
  useEffect(() => {
    fetchStaff();
  }, []);

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
        <table className="staff-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
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