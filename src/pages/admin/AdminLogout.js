import React from 'react';
import  { Navigate } from 'react-router-dom'

function AdminLogout(props) {
    localStorage.clear();

    return <Navigate to ='/admin/login'/>;
}

export default AdminLogout;