import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";

import { AppContext } from "context";

import WMapsComponent from "app/components/Maps/WMapsComponent";

const UnitMonitor = () => {
    const API_KEY: any = process.env.REACT_APP_GOOGLE_API_KEY
    const LAT: any = process.env.REACT_APP_DEFAULT_LT
    const LNG: any = process.env.REACT_APP_DEFAULT_LG
    const {accessToken} = useContext(AppContext)

    useEffect(() => {
        
    }, [])

    return (<>
        <WMapsComponent APIKey={API_KEY}
            accessToken={accessToken}
            centerMap={{
                lat: parseFloat(LAT),
                lng: parseFloat(LNG)
            }}
        >
            <>
               {/*marker components here*/} 
            </>
        </WMapsComponent>
    </>)
}

export default UnitMonitor;