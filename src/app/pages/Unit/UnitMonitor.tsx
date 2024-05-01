import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import GoogleMapReact from 'google-map-react';
import { AppContext } from "context";
const UnitMonitor = () => {
    const API_KEY: any = process.env.REACT_APP_GOOGLE_API_KEY
    const LAT: any = process.env.REACT_APP_DEFAULT_LG
    const LNG: any = process.env.REACT_APP_DEFAULT_LT
    const { 
        setIsAuthenticated, 
        accessToken, 
        setAccessToken,
        isUserDataLoaded, 
        userData 
    } = useContext(AppContext);
    const defaultProps = {
        center: {
          lat: 10.503405,
          lng: 122.966301
        },
        zoom: 11
    };
    const Marker = ({ text }:any) => <div>{text}</div>;
    useEffect(() => {
        console.log('API_KEY', process.env)
    }, [])
    return (
        <>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <Marker
                    lat={10.503405}
                    lng={122.966301}
                    text="My Marker"
                />
            </GoogleMapReact>
        </>
    )
}

export default UnitMonitor;