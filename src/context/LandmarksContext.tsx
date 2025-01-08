import { 
    createContext, 
    useEffect, 
    useState, 
    useContext 
} from 'react';
import { AppContext } from 'context';

export const LandmarksContext = createContext<any>(null);
const LandmarksContextProvider = ({children} : any) => {
    const [currentTabIndex, setCurrentTabIndex] = useState<Number>(0);
    const { 
        setIsAuthenticated, 
        accessToken, 
        setAccessToken,
        isUserDataLoaded, 
        userData 
    } = useContext(AppContext);
    const changeTab = (tabIndex: Number) => {
        setCurrentTabIndex(tabIndex);
    }
    useEffect(() => {
        
    }, []);
    return (
        <LandmarksContext.Provider
            value={{
                changeTab,
                currentTabIndex,
                setCurrentTabIndex,
                //AppContext
                setIsAuthenticated, 
                accessToken, 
                setAccessToken,
                isUserDataLoaded, 
                userData 
            }}
        >
            {children}
        </LandmarksContext.Provider>
    );
}
export default LandmarksContextProvider;