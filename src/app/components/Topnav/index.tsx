import AuthService from 'services/AuthService';
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context";
import { useDispatch } from 'react-redux';
import { clearToken } from 'slice/AuthSlice';
import { clearUser } from 'slice/UserSlice';
// import { RootState } from 'store';
const Topnav = () => {
    const { 
        setIsAuthenticated, 
        accessToken, 
        isUserDataLoaded, 
        userData 
    } = useContext(AppContext);
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const logout = async (e:any) => {
        try {
            await (new AuthService(accessToken)).logout()
            e.preventDefault();
            dispatch(clearToken())
            dispatch(clearUser())
            setIsAuthenticated(false)
            navigate('/login')
        } catch (e) {
            //
        }
    }
    useEffect ( () => {
    }, [isUserDataLoaded]); 
    return (
        <div className='topnav'>
            <div className='topnav-container'>
                <div className='topnav-container-app-name'>
                    {process.env.REACT_APP_NAME}
                </div>
                <div className='topnav-container-user-account'>
                    <div>
                        {userData ? userData.fullname : ''}
                    </div>
                    <div>
                        <a href='#' onClick={logout}>logout</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Topnav;