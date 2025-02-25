import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Login.css';

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

const Login = () => {
  const [credentials, setCredentials] = useState({ phoneNumber: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", credentials);
      
      // Extract token and userType from API response
      const { token, userType } = response.data;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType);

      // Redirect based on user type
      if (userType === "admin") {
        navigate("/admin-dashboard");
      } else if (userType === "staff") {
        navigate("/staff-dashboard");
      } else {
        setErrorMessage("Invalid user role.");
      }

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="logincontainer">
      <div className="loginwrapper">
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit}>
          <InputField label="Phone Number:" type="text" name="phoneNumber" value={credentials.phoneNumber} onChange={handleChange} required />
          <InputField label="Password:" type="password" name="password" value={credentials.password} onChange={handleChange} required />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button className="btn" type="submit">Login</button>
        </form>
        <p className="text">Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;