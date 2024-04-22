import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { AppContext } from "context";
const UnitDashboard = () => {
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
            <div>UNIT DASHBOARD</div>
        </div>
    )
}

export default UnitDashboard;