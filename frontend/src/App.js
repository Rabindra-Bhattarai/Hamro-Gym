import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Lazy loading components
const Login = lazy(() => import('./public/Login'));
const Register = lazy(() => import('./public/Register'));
const AdminDashboard = lazy(() => import('./public/Admin/AdminDashboard'));
const ViewStaff = lazy(() => import('./public/Admin/ViewStaff')); // Admin can view staff
const StaffDashboard = lazy(() => import('./public/staff/StaffDashboard'));
const ViewMembers = lazy(() => import('./public/staff/ViewMembers')); // Staff and Admin can view members
const AddMember = lazy(() => import('./public/staff/AddMember'));

const App = () => (
  <Router>
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/view-staff" element={<ViewStaff />} />

        
        {/* Staff Routes */}
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/staff-dashboard/view-members" element={<ViewMembers />} />
        <Route path="/staff-dashboard/add-member" element={<AddMember />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
