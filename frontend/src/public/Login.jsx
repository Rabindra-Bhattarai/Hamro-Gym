import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.phoneNumber === 'admin' && credentials.password === 'admin') {
      navigate('/admin-dashboard'); // Admin dashboard
      return;
    }

    navigate('/staff-dashboard'); // Staff dashboard
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
