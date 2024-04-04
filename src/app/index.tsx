import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
//components
import MainLayout from './components/Layouts/MainLayout';
import AuthLayout from './components/Layouts/AuthLayout';
//pages
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Unit from './pages/Unit';
import NotFound from './pages/NotFound';
//authentication page
import Login from './pages/Login';

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <>
            <Helmet>
                <title>Waste Management System 1.0</title>
            </Helmet>
            <Routes>
                <Route
                    element={
                        <AuthLayout />
                    }
                >
                    <Route path="/login" element={<Login />}/>
                </Route>
                <Route
                    element={
                        <MainLayout />
                    }
                >
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/unit" element={<Unit />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    )
}
export default App;