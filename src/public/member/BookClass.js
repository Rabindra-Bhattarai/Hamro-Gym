import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './BookClass.css'; // Import CSS

const BookClass = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch classes from the API on component mount
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/classes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
        },
      });
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleBookClass = async (id) => {
    try {
      const memberId = JSON.parse(localStorage.getItem('user')).id; // Get member ID from localStorage
      const response = await axios.post(`http://localhost:3010/api/classes/join/${id}/${memberId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
        },
      });

      // Check if the response indicates success
      if (response.data.success) {
        // Update the class state to reflect that the class has been booked
        setClasses((prevClasses) =>
          prevClasses.map((cls) =>
            cls.id === id
              ? { ...cls, currentCapacity: cls.currentCapacity + 1, booked: true } // Update capacity and booked status
              : cls
          )
        );

        alert(response.data.message); // Show success message
      } else {
        alert('Failed to book class. Please try again.'); // Handle failure case
      }
    } catch (error) {
      console.error('Error booking class:', error.response ? error.response.data : error.message);
      alert('Failed to book class. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user session
    localStorage.removeItem('token'); // Clear token
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>🏋️ Gym Dashboard</h2>
        <ul>
          <li><Link to="/member-dashboard">🏠 Dashboard</Link></li>
          <li><Link to="/member-dashboard/book-class">🎯 Book a Class</Link></li>
          <li>
            <button onClick={handleLogout} className="logout-button">⚙ Logout</button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <h2>Book a Class</h2>
        {loading ? (
          <p>Loading classes...</p>
        ) : classes.length === 0 ? (
          <p>No classes available for booking.</p>
        ) : (
          <ul>
            {classes.map((cls) => (
              <li key={cls.id}>
                <div>
                  <strong>{cls.name}</strong> - {new Date(cls.date).toLocaleDateString()} at {cls.time} ({cls.duration} minutes)
                </div>
                <div>Max Capacity: {cls.maxCapacity}</div>
                <div>Current Capacity: {cls.currentCapacity}</div>
                <div>
                  Status: {cls.currentCapacity >= cls.maxCapacity ? 'Full' : 'Available'}
                  {cls.currentCapacity < cls.maxCapacity && !cls.booked ? (
                    <button onClick={() => handleBookClass(cls.id)}>Book Class</button>
                  ) : (
                    <span>Booked</span> // Change to "Booked" if the class is booked
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