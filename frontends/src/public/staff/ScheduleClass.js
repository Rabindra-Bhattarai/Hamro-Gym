import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ScheduleClass.css";

const ScheduleClass = () => {
  const navigate = useNavigate();

  const [classData, setClassData] = useState({
    className: "",
    date: "",
    time: "",
    duration: "",
    maxCapacity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData({ ...classData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const classes = JSON.parse(localStorage.getItem("classes")) || [];
    classes.push({ ...classData, id: Date.now() });
    localStorage.setItem("classes", JSON.stringify(classes));
    setClassData({
      className: "",
      date: "",
      time: "",
      duration: "",
      maxCapacity: "",
    });
    alert("Class scheduled successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("staffToken"); // Example logout handling
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar (Matches Staff Dashboard) */}
      <nav className="sidebar">
        <h2>🏋️ Staff Dashboard</h2>
        <ul>
          <li><Link to="/staff-dashboard/manage-members">Manage Members</Link></li>
          <li className="active"><Link to="/staff-dashboard/schedule-class">Schedule Class</Link></li>
          <li><Link to="/staff-dashboard/view-classes">View Classes</Link></li>
          <li><button className="logout-btn" onClick={handleLogout}>🚪 Logout</button></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <h2>Schedule a New Class</h2>
          <div className="user-info">👤 Staff</div>
        </header>

        <div className="schedule-form-container">
          <form onSubmit={handleSubmit}>
            <div className="formgroup">
              <label>Class Name:</label>
              <input type="text" name="className" value={classData.className} onChange={handleChange} required />
            </div>
            <div className="formgroup">
              <label>Date:</label>
              <input type="date" name="date" value={classData.date} onChange={handleChange} required />
            </div>
            <div className="formgroup">
              <label>Time:</label>
              <input type="time" name="time" value={classData.time} onChange={handleChange} required />
            </div>
            <div className="formgroup">
              <label>Duration (minutes):</label>
              <input type="number" name="duration" value={classData.duration} onChange={handleChange} required />
            </div>
            <div className="formgroup">
              <label>Max Capacity:</label>
              <input type="number" name="maxCapacity" value={classData.maxCapacity} onChange={handleChange} required />
            </div>
            <button type="submit">Schedule Class</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleClass;
