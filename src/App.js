import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './protectedRoute'; // Import from root of src

// Lazy loading components
const LandingPage = lazy(() => import('./public/LandingPage'));
const Login = lazy(() => import('./public/Login'));
const Register = lazy(() => import('./public/Register'));
const AdminDashboard = lazy(() => import('./public/Admin/AdminDashboard'));
const ViewStaff = lazy(() => import('./public/Admin/ViewStaff'));
const StaffDashboard = lazy(() => import('./public/staff/StaffDashboard'));
const ManageMembers = lazy(() => import('./public/staff/ManageMembers'));
const ScheduleClass = lazy(() => import('./public/staff/ScheduleClass'));
const ViewClasses = lazy(() => import('./public/staff/ViewClasses'));
const MemberDashboard = lazy(() => import('./public/member/MemberDashboard'));
const BookClass = lazy(() => import('./public/member/BookClass'));

const App = () => (
  <Router>
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/view-staff" element={<ViewStaff />} />
        </Route>

        {/* Staff Routes */}
        <Route element={<ProtectedRoute allowedRoles={['staff']} />}>
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/staff-dashboard/manage-members" element={<ManageMembers />} />
          <Route path="/staff-dashboard/schedule-class" element={<ScheduleClass />} />
          <Route path="/staff-dashboard/view-classes" element={<ViewClasses />} />
        </Route>

        {/* Member Routes */}
        <Route element={<ProtectedRoute allowedRoles={['member']} />}>
          <Route path="/member-dashboard" element={<MemberDashboard />} />
          <Route path="/member-dashboard/book-class" element={<BookClass />} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);

export default App;