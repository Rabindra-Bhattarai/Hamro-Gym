import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const [credentials, setCredentials] = useState({ email: '', password: '' });
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
      const response = await axios.post('http://localhost:3010/api/auth/login', credentials);
      const { token, userType } = response.data;

      // Store token and userType in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);

      // Redirect based on role
      if (userType === 'admin') {
        navigate('/admin-dashboard');
      } else if (userType === 'staff') {
        navigate('/staff-dashboard');
      } else if (userType === 'member') {
        navigate('/member-dashboard');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="logincontainer">
      <div className="loginwrapper">
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit}>
          <InputField label="Email:" type="email" name="email" value={credentials.email} onChange={handleChange} required />
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