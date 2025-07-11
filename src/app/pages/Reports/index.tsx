import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { AppContext } from "@/context";
const Reports = () => {
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
            <div>Reports</div>
        </>
    )
}

export default Reports;