import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { AppContext } from "context";
//import { WasteManagementService } from "services/WasteManagementService";
import { Outlet } from 'react-router-dom';
import { GenericTabContext } from 'context/GenericTabContext';
import TopTabMenu from 'app/components/TopTabMenu';
const WasteManagement = () => {
    const { 
        setIsAuthenticated, 
        accessToken, 
        setAccessToken,
        isUserDataLoaded, 
        userData 
    } = useContext(AppContext);
    const { 
            changeTab,
            currentTabIndex,
            setCurrentTabIndex,
    } = useContext(GenericTabContext);
    const tabOptions = [
        {
            title: 'Truck Arrivals',
            link : '/waste-management/truck-arrivals',
            name : 'truck-arrivals',
            switchTab: changeTab
        },
        {
            title: 'Waste Collection',
            link : '/waste-management/waste-collection',
            name : 'waste-collection',
            switchTab: changeTab
        },
        {
            title: 'Scrapped Materials',
            link : '/waste-management/scrapped-materials',
            name : 'scrapped-materials',
            switchTab: changeTab
        },
    ]
    //const wms = new WasteManagementService(accessToken)
    useEffect(() => {
        /*  
            //sample implementation of http requestv2
            const a = async (signal:any) => {
            try{
                //let data = await wms.setAbortControllerSignal(signal)
                //    .storeWMS({"wew" : 1123});
                let data = await wms.storeWMS({"wew" : 1123}, {signal: signal});
                console.log(data)
            } catch (e) {
                console.log(e)
            }
        }
        let abort = new AbortController;
        a(abort.signal)
        return () => {
            abort.abort();
        }*/
    }, [])
    return (
        <>
            <TopTabMenu 
                tabOptions={tabOptions}
                currentIndex={currentTabIndex}
                setCurrentIndex={setCurrentTabIndex}
            />
            <div className="content-main-container">
                <div className="content-main-items content-main-wide">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default WasteManagement;