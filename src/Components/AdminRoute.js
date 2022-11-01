import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const AdminRoute = ({ children}) => {
    const { currentUser } = useAuth();
        
    if (currentUser) {
        if(currentUser.uid === "GSgKCh0hC3VuaqIwF4ODTtwxFbx2") {
            return children
        }
    }
    
    return (
        <Navigate to="/" />
    )
}

export default AdminRoute