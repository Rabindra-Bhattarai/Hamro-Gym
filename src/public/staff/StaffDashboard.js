import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './StaffDashboard.css';

const membershipData = [
  { month: "Jan", members: 10 },
  { month: "Feb", members: 15 },
  { month: "Mar", members: 20 },
  { month: "Apr", members: 30 },
  { month: "May", members: 25 },
];

const membershipStatus = [
  { name: "Active", value: 60 },
  { name: "Expired", value: 40 },
];

const COLORS = ["#b30000", "#ff3333"];

const StaffDashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>HamroGym Staff</h2>
        <nav>
          <ul>
            <li><Link to="/staff-dashboard/view-members">View Members</Link></li>
            <li><Link to="/staff-dashboard/add-member">Add Member</Link></li>
            <li>
              <Link to="/login" onClick={() => localStorage.removeItem("userToken")}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content">
        <h1>Welcome to Staff Dashboard</h1>

        <div className="chart-container">
          <h2>Membership Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={membershipData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="members" fill="#b30000" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2>Membership Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={membershipStatus} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                {membershipStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
