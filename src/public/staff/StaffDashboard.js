import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './StaffDashboard.css';

const StaffDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Clear login session
    navigate('/login'); // Redirect to login page
  };

  // Sample data for the chart
  const memberData = [
    { name: 'Jan', members: 40 },
    { name: 'Feb', members: 30 },
    { name: 'Mar', members: 20 },
    { name: 'Apr', members: 27 },
    { name: 'May', members: 18 },
    { name: 'Jun', members: 23 },
    { name: 'Jul', members: 34 },
  ];

  return (
    <div className="dashboard-container">
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
      <div className="dashboard-content">
        <h1>Welcome, Staff!</h1>
        <div className="chart-container">
          <h2>📊 Members Overview</h2>
          <BarChart
            width={600}
            height={300}
            data={memberData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="members" fill="#d32f2f" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
