import React, { 
    useContext, 
} from "react";
//import PlacesDialog from "app/components/DialogBox/PlacesDialog";
import { LandmarksContext } from "context/LandmarksContext";
//import LandmarkService from "services/LandmarkService";
//import { Modal, notification, Spin } from 'antd';
//import SearchLocationsComponent from "app/components/Maps/SearchLocationsComponent";
import WMapsComponent from "app/components/Maps/WMapsComponent";

const DashboardLandmarkMaps: React.FC<any> = (): React.ReactElement => {
    const API_KEY: any = process.env.REACT_APP_GOOGLE_API_KEY
    const LAT: any = process.env.REACT_APP_DEFAULT_LT
    const LNG: any = process.env.REACT_APP_DEFAULT_LG
    const {accessToken} = useContext(LandmarksContext)

    return (
        <>
            <WMapsComponent
                APIKey={API_KEY}
                accessToken={accessToken}
                centerMap={{
                    lat: parseFloat(LAT),
                    lng: parseFloat(LNG)
                }}
            />
        </>
    )
}
export default DashboardLandmarkMaps;