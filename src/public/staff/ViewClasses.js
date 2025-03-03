import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./ViewClasses.css";

const ViewClasses = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch classes from the API on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3010/api/classes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
          },
        });
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchClasses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("staffToken"); // Example logout handling
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar (Same as Staff Dashboard) */}
      <nav className="sidebar">
        <h2>🏋️ Staff Dashboard</h2>
        <ul>
          <li><Link to="/staff-dashboard/manage-members">Manage Members</Link></li>
          <li><Link to="/staff-dashboard/schedule-class">Schedule Class</Link></li>
          <li className="active"><Link to="/staff-dashboard/view-classes">View Classes</Link></li>
          <li><button className="logout-btn" onClick={handleLogout}>🚪 Logout</button></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <h2>Scheduled Classes</h2>
          <div className="user-info">👤 Staff</div>
        </header>

        <div className="view-classes">
          {loading ? (
            <p>Loading classes...</p>
          ) : classes.length === 0 ? (
            <p>No classes scheduled yet.</p>
          ) : (
            <ul>
              {classes.map((cls) => (
                <li key={cls.id}>
                  <div>
                    <strong>{cls.name}</strong> - {new Date(cls.date).toLocaleDateString()} at {cls.time} ({cls.duration} minutes)
                  </div>
                  <div>Max Capacity: {cls.maxCapacity}</div>
                  <div>Current Capacity: {cls.currentCapacity}</div>
                  <div>Status: {cls.currentCapacity >= cls.maxCapacity ? "Full" : "Available"}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewClasses;