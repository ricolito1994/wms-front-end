import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { AppContext } from "context";
const WasteManagement = () => {
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
        <>
            <div>Waste Management</div>
        </>
    )
}

export default WasteManagement;