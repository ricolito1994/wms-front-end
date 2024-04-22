import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { AppContext } from "context";
const UnitPerformance = () => {
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
            <div>UNIT PERFORMANCE</div>
        </div>
    )
}

export default UnitPerformance;