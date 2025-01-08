import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import GoogleMapReact from 'google-map-react';
import { LandmarksContext } from "context/LandmarksContext";
const DashboardLandmarkMaps = () => {
    const API_KEY: any = process.env.REACT_APP_GOOGLE_API_KEY
    const LAT: any = process.env.REACT_APP_FEFAULT_LT
    const LNG: any = process.env.REACT_APP_DEFAULT_LG
    const {accessToken} = useContext(LandmarksContext)
    const defaultProps = {
        center: {
            lat: 10.53846,
            lng: 122.83512
        },
        zoom: 17,
        options : {
            //zoomControl: false, 
            //gestureHandling: "none", 
            //disableDoubleClickZoom: true, 
            scrollwheel: false, 
            //gestureHandling: "none", 
            disableDoubleClickZoom: true, 
            zoomControl: true, 
        }
    };
    const Marker = ({ text }:any) => <div>{text}</div>;
    useEffect(() => {
            
    }, [])
    return (
        <>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={defaultProps.options}
            >
                <Marker
                    lat={LAT}
                    lng={LNG}
                    text="bago city hall"
                />
            </GoogleMapReact>
        </>
    )
}

export default DashboardLandmarkMaps;