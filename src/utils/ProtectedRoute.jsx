import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export  function ProtectedRoute({ children }) {
    const location = useLocation();
    const isAuthenticated = !!Cookies.get('token');

    if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        return <Navigate to="/account/login" state={{ from: location }} replace />;
    }

    return children;
}

export  function PublicRoute({ children }) {
    const isAuthenticated = !!Cookies.get('token');

    if (isAuthenticated) {
        // Redirect to dashboard if already logged in
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
