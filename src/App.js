import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './protectedRoute';

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
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

        <Route path="/admin-dashboard/view-staff" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ViewStaff />
          </ProtectedRoute>
        } />

        {/* Staff Routes */}
        <Route path="/staff-dashboard" element={
          <ProtectedRoute allowedRoles={['staff', 'admin']}>
            <StaffDashboard />
          </ProtectedRoute>
        } />
        <Route path="/staff-dashboard/view-members" element={
          <ProtectedRoute allowedRoles={['staff', 'admin']}>
            <ViewMembers />
          </ProtectedRoute>
        } />
        <Route path="/staff-dashboard/add-member" element={
          <ProtectedRoute allowedRoles={['staff', 'admin']}>
            <AddMember />
          </ProtectedRoute>
        } />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
