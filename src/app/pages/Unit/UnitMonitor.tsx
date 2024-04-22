import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { AppContext } from "context";
const UnitMonitor = () => {
    const { 
        setIsAuthenticated, 
        accessToken, 
        setAccessToken,
        isUserDataLoaded, 
        userData 
    } = useContext(AppContext);
    useEffect(() => {
        
    }, [])
    return (
        <div>
            <div>UNIT MONITOR</div>
        </div>
    )
}

export default UnitMonitor;