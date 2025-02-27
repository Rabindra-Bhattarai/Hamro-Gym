import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MemberClassSchedule.css';

const MemberClassSchedule = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const savedClasses = JSON.parse(localStorage.getItem('classes')) || [];
    setClasses(savedClasses);
  }, []);

  return (
    <div className="member-dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>🏋️ Gym Dashboard</h2>
        <ul>
          <li><Link to="/member-dashboard">🏠 Dashboard</Link></li>
          <li><Link to="/member-dashboard/class-schedule">📅 Class Schedule</Link></li>
          <li><Link to="/member-dashboard/book-class">🎯 Book a Class</Link></li>
          <li><Link to="/member-dashboard/profile-update">⚙ Profile Settings</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="member-class-schedule">
        <h2>Class Schedule</h2>
        {classes.length === 0 ? (
          <p>No classes scheduled yet.</p>
        ) : (
          <ul className="class-list">
            {classes.map((cls) => (
              <li key={cls.id} className="class-item">
                <div>
                  <strong>{cls.className}</strong> - {cls.date} at {cls.time} ({cls.duration} minutes)
                </div>
                <div>Max Capacity: {cls.maxCapacity}</div>
                <div>Status: {cls.booked ? 'Booked' : 'Available'}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MemberClassSchedule;
