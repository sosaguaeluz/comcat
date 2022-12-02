import * as React from 'react';
import { Routes, Route  } from 'react-router-dom'
import { 
    Login
 } from '../screens/index';

const PublicRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path='/' element={<Login />} />
        </Routes>
    )
}

export default PublicRoutes;