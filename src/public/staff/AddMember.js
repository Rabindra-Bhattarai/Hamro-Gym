import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddMember.css";

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    membership: "",
    startDate: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get existing members from local storage
    const existingMembers = JSON.parse(localStorage.getItem("members")) || [];
    
    // Add new member to the list
    existingMembers.push(formData);

    // Save updated members list to local storage
    localStorage.setItem("members", JSON.stringify(existingMembers));

    // Reset form fields after submission
    setFormData({
      name: "",
      dob: "",
      gender: "",
      contact: "",
      email: "",
      address: "",
      membership: "",
      startDate: "",
      expiryDate: "",
    });
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>HamroGym Staff</h2>
        <ul>
            <li><Link to="/staff-dashboard/view-members">View Members</Link></li>
            <li><Link to="/staff-dashboard/add-member">Add Member</Link></li>
          <li><Link to="/login" onClick={() => localStorage.clear()}>Logout</Link></li>
        </ul>
      </aside>
      <main className="dashboard-content">
        <h2>Add Member</h2>
        <form onSubmit={handleSubmit} className="add-member-form">
          <label>Full Name</label>
          <input type="text" name="name" placeholder="Enter full name" onChange={handleChange} required />

          <label>Date of Birth</label>
          <input type="date" name="dob" onChange={handleChange} required />

          <label>Gender</label>
          <select name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label>Contact</label>
          <input type="text" name="contact" placeholder="Enter contact number" onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" placeholder="Enter email" onChange={handleChange} required />

          <label>Address</label>
          <input type="text" name="address" placeholder="Enter address" onChange={handleChange} required />

          <label>Membership</label>
          <select name="membership" onChange={handleChange} required>
            <option value="">Select Membership</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
          </select>

          <label>Start Date</label>
          <input type="date" name="startDate" onChange={handleChange} required />

          <label>Expiry Date</label>
          <input type="date" name="expiryDate" onChange={handleChange} required />

          <button type="submit">Add Member</button>
        </form>
      </main>
    </div>
  );
};

export default AddMember;
