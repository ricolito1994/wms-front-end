import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { AppContext } from "context";
import { WasteManagementService } from "services/WasteManagementService";
const WasteManagement = () => {
    const { 
        setIsAuthenticated, 
        accessToken, 
        setAccessToken,
        isUserDataLoaded, 
        userData 
    } = useContext(AppContext);
    const wms = new WasteManagementService(accessToken)
    useEffect(() => {
        const a = async (signal:any) => {
            try{
                let data = await wms.setAbortControllerSignal(signal)
                    .storeWMS({"wew" : 1123});
                console.log(data)
            } catch (e) {
                console.log(e)
            }
        }
        let abort = new AbortController;
        a(abort.signal)
        return () => {
            abort.abort();
        }
    }, [])
    return (
        <>
            <div>Waste Management</div>
        </>
    )
}

export default WasteManagement;