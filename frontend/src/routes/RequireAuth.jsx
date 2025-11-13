import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';


export default function RequireAuth() {
const { user, loading } = useAuth();
const location = useLocation();


if (loading) return <div className="container">Loading…</div>;
if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
return <Outlet />;
}
