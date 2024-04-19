import React , {useContext, useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
// import { useSelector } from 'react-redux';
import { Route, Routes, /*useLocation, useNavigate,*/ Navigate } from 'react-router-dom';
import { AppContext } from 'context';
// components
import MainLayout from './components/Layouts/MainLayout';
import AuthLayout from './components/Layouts/AuthLayout';
//pages
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Unit from './pages/Unit';
import WasteManagement from './pages/WasteManagement';
import NotFound from './pages/NotFound';
//authentication page
import Login from './pages/Login';
//import { RootState } from 'store';
const App = () => {
    const { isAuthenticated, accessToken } = useContext(AppContext);
    //const location = useLocation();
    //const navigate = useNavigate();
    //const auth = useSelector((state: RootState) => state.token)
    useEffect(() => {
        if (isAuthenticated && accessToken) {
            //navigate('/')
        } else {
            //navigate('/login')
        }
        //console.log(accessToken)
    },[accessToken,isAuthenticated])

    const renderLayout = () : JSX.Element => {
        return (!accessToken ? <AuthLayout /> : <MainLayout />)
    }
 
    const renderElement = (element: any = null) : JSX.Element => {
        return (!accessToken ? <Login /> : element)
    }

    return (
        <div className="App">
            <Helmet>
                <title>Waste Management System 1.0</title>
            </Helmet>
            <Routes>
                <Route
                    element={renderLayout()}
                >
                    <Route path="/login" element={!accessToken ? renderElement(): <Navigate to="/"/>}/> 
                </Route>
                <Route
                    element={renderLayout()}
                >
                    <Route path="/" element={renderElement(<Dashboard />)}/>
                    <Route path="/reports" element={renderElement(<Reports />)} />
                    <Route path="/unit" element={renderElement(<Unit />)}/>
                    <Route path="/waste-management" element={renderElement(<WasteManagement />)}/>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
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