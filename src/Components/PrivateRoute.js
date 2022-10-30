import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const PrivateRoute = ({ children}) => {
    const { currentUser } = useAuth();
        
    if (currentUser) {
      return children
    }
      
    return <Navigate to="/login" />
}

export default PrivateRoute

