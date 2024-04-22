import { 
    createContext, 
    useEffect, 
    useState, 
    useContext 
} from 'react';
import { AppContext } from 'context';

export const UnitContext = createContext<any>(null);
const UnitContextProvider = ({children} : any) => {
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
        <UnitContext.Provider
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
        </UnitContext.Provider>
    );
}
export default UnitContextProvider;