import { 
    createContext, 
    useEffect, 
    useState, 
    useContext 
} from 'react';
import { AppContext } from 'context';

export const HRContext = createContext<any>(null);
const HRContextProvider = ({children} : any) => {
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
        <HRContext.Provider
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
        </HRContext.Provider>
    );
}
export default HRContextProvider;