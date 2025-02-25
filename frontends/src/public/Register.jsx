import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Register.css';

const InputField = ({ label, type, name, value, onChange, required }) => (
  <div className="formgroup">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="input"
    />
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // Send registration data to the API
      const response = await axios.post("http://localhost:3000/api/auth/register", formData);
      // Assuming the response contains a success message or user data
      console.log(response.data); // You can handle the response as needed

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      // Handle errors from the API
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="registercontainer">
      <div className="registerwrapper">
        <h1 className="title">Register</h1>
        <form onSubmit={handleSubmit}>
          <InputField label="Full Name:" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          <InputField label="Phone Number:" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          <InputField label="Email:" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <InputField label="Password:" type="password" name="password" value={formData.password} onChange={handleChange} required />
          <InputField label="Confirm Password:" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button className="btn" type="submit">Register</button>
        </form>
        <p className="text">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;