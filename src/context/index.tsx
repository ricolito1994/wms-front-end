import { createContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
//import { userAsync } from 'slice/UserSlice'
import { UserModel, UserDefaults } from 'models/user.model'
import UserService from 'services/UserService'
//import { AppDispatch } from 'store';
export const AppContext = createContext<any>(null);
const AppContextProvider = ({children} : any) => {
    const token = (useSelector((state: RootState) => state.auth));
    // const dispatchAsync = useDispatch<AppDispatch>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isUserDataLoaded, setIsUserDataLoaded] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserModel>(UserDefaults);
    const [accessToken, setAccessToken] = useState<any>(null);
    useEffect (() => {
        if (accessToken) {
            (new UserService(accessToken)).myself()
            .then((data: UserModel) => {
                setUserData(data);
                setIsUserDataLoaded(true);
            })
            .catch((err: any) => {
                if(err.response.data.status == 'Token is Expired') {
                    setAccessToken(null);
                    setIsAuthenticated(false);
                }
            });
        } else {
            setAccessToken(token.value);
        }
    }, [accessToken]);
    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                accessToken,
                setAccessToken,
                isUserDataLoaded,
                userData
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
export default AppContextProvider;