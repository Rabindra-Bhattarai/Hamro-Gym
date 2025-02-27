import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BookClass.css'; // Import CSS

const BookClass = () => {
  const [classes, setClasses] = useState([]);

  // Fetch classes from localStorage on component mount
  useEffect(() => {
    const savedClasses = JSON.parse(localStorage.getItem('classes')) || [];
    setClasses(savedClasses);
  }, []);

  const handleBookClass = (id) => {
    const updatedClasses = classes.map((cls) =>
      cls.id === id ? { ...cls, booked: true } : cls
    );

    // Save updated classes to localStorage
    localStorage.setItem('classes', JSON.stringify(updatedClasses));

    // Update state
    setClasses(updatedClasses);

    alert('Class booked successfully!');
  };

  return (
    <div className="dashboard-container">
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
      <div className="dashboard-content">
        <h2>Book a Class</h2>
        {classes.length === 0 ? (
          <p>No classes available for booking.</p>
        ) : (
          <ul>
            {classes.map((cls) => (
              <li key={cls.id}>
                <div>
                  <strong>{cls.className}</strong> - {cls.date} at {cls.time} ({cls.duration} minutes)
                </div>
                <div>Max Capacity: {cls.maxCapacity}</div>
                <div>
                  Status: {cls.booked ? 'Booked' : 'Available'}
                  {!cls.booked && (
                    <button onClick={() => handleBookClass(cls.id)}>Book Class</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookClass;
