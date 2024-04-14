import React , {useContext, useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from 'context';
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
import { RootState } from 'store';
const App = () => {
    const { isAuthenticated, accessToken } = useContext(AppContext);
    //const location = useLocation();
    const navigate = useNavigate();
    //const auth = useSelector((state: RootState) => state.token)
    useEffect(() => {
        if (isAuthenticated) {
            //navigate('/')
        } else {
            //navigate('/login')
        }
    },[accessToken,isAuthenticated])


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
/* const mapStateToProps = (state : any) => ({
    token: state.auth.token
});
  
const mapDispatchToProps = {
    setToken
};
export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(App);  */
export default App;