import AuthService from 'services/AuthService';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context";
import { useDispatch } from 'react-redux';
import { clearToken } from 'slice/AuthSlice';

const Topnav = () => {
    const auth = new AuthService();
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AppContext);
    const dispatch = useDispatch();
    const logout = async (e:any) => {
        await auth.logout()
        e.preventDefault();
        dispatch(clearToken())
        localStorage.removeItem('accessToken')
        setIsAuthenticated(false)
        navigate('/login')
    }
    return (
        <div className='topnav'>
            <div className='topnav-container'>
                <div className='topnav-container-app-name'>
                    {process.env.REACT_APP_NAME}
                </div>
                <div className='topnav-container-user-account'>
                    <div>
                        <a href='#' onClick={logout}>logout</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Topnav;