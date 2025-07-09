import { 
    createContext, 
    useEffect, 
    useState, 
    useContext 
} from 'react';
//import { AppContext } from 'context';

export const GenericTabContext = createContext<any>(null);
const GenericTabContextProvider = ({children} : any) => {
    const [currentTabIndex, setCurrentTabIndex] = useState<Number>(0);
    /*const { 
        setIsAuthenticated, 
        accessToken, 
        setAccessToken,
        isUserDataLoaded, 
        userData 
    } = useContext(AppContext);*/
    const changeTab = (tabIndex: Number) => {
        setCurrentTabIndex(tabIndex);
    }
    useEffect(() => {
        
    }, []);
    return (
        <GenericTabContext.Provider
            value={{
                changeTab,
                currentTabIndex,
                setCurrentTabIndex,
                //AppContext
                /*setIsAuthenticated, 
                accessToken, 
                setAccessToken,
                isUserDataLoaded, 
                userData */
            }}
        >
            {children}
        </GenericTabContext.Provider>
    );
}
export default GenericTabContextProvider;