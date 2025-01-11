import { createContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
//import { userAsync } from 'slice/UserSlice'
import { UserModel, UserDefaults } from 'models/user.model'
import UserService from 'services/UserService'
//import { setUser } from 'slice/UserSlice';
import { clearUser } from 'slice/UserSlice';
import { clearToken } from 'slice/AuthSlice';
//import { AppDispatch } from 'store';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register( 
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);
export const AppContext = createContext<any>(null);
const AppContextProvider = ({children} : any) => {
    const CURRENT_CITY = "BAGO CITY";
    const CURRENT_CITY_ID = 1;
    const token = (useSelector((state: RootState) => state.auth));
    const userLogInData = (useSelector((state: RootState) => state.user));
    //const dispatchAsync = useDispatch<AppDispatch>();
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isUserDataLoaded, setIsUserDataLoaded] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserModel>(UserDefaults);
    const [accessToken, setAccessToken] = useState<any>(null);
    const { v4: uuidv4 } = require('uuid');

    useEffect (() => {
        const getUserData = async () => {
            try {
                let userData: UserModel = await new UserService(token.value).myself()
                if (!userLogInData.data) {
                    setUserData(userData)
                    setIsAuthenticated(true);
                }
            } catch (err: any) {
                if(err.response.data.status === 'Token is Expired') {
                    setAccessToken(null);
                    setIsAuthenticated(false);
                    dispatch(clearToken())
                    dispatch(clearUser())
                }
            }
        }
        if(token.value) {
            setAccessToken(token.value)
            if (userLogInData.data) setUserData(userLogInData.data);
            getUserData() // to check token is expire
        }
    }, [token, userLogInData]);
    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                accessToken,
                setAccessToken,
                isUserDataLoaded,
                setIsUserDataLoaded,
                userData,
                uuidv4,
                CURRENT_CITY,
                CURRENT_CITY_ID
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
export default AppContextProvider;