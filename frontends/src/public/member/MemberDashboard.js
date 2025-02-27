import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './MemberDashboard.css';

const MemberDashboard = () => {
  // Mock data for membership progress
  const progressData = [
    { month: 'Jan', progress: 20 },
    { month: 'Feb', progress: 40 },
    { month: 'Mar', progress: 60 },
    { month: 'Apr', progress: 80 },
    { month: 'May', progress: 100 },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>🏋️ Gym Dashboard</h2>
        <ul>
          <li><Link to="/member-dashboard">🏠 Dashboard</Link></li>
          <li><Link to="/member-dashboard/class-schedule">📅 Class Schedule</Link></li>
          <li><Link to="/member-dashboard/book-class">🎯 Book a Class</Link></li>
          <li><Link to="/member-dashboard/Logout">⚙ Profile Settings</Link></li>
        </ul>
      </nav>

      {/* Chart Section */}
      <div className="dashboard-content">
        <h2>📊 Membership Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#ff4d4d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MemberDashboard;
