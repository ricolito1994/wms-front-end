import React, { 
    createContext, 
    useEffect, 
    useState, 
} from 'react';

export const WMapsContext = createContext<any>(null);

const WMapsContextProvider = ({children} : any) : React.ReactElement => {

    const [routeData, setRouteData] = useState<any[]>([])
    const [isResetMap, setIsResetMap] = useState<boolean>(false)

    return (
        <WMapsContext.Provider
            value={{
                routeData,
                setRouteData,
                isResetMap,
                setIsResetMap
            }}
        >
            {children}
        </WMapsContext.Provider>
    );
}
export default WMapsContextProvider;