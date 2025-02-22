import React, { 
    useContext, 
    useEffect, 
    useState ,
    useCallback
} from "react";
import { 
    GoogleMap, 
    LoadScript, 
    Marker,
    InfoWindow, 
} from "@react-google-maps/api";

import SearchLocationsComponent from "./SearchLocationsComponent";
interface LocationProps {
    lat: number,
    lng: number
}

interface WMapsProps {
    centerMap? : LocationProps
    children? : React.ReactElement
}

const WMapsComponent: React.FC <WMapsProps> = (
    {
        // props goes here
        centerMap,
        children 
    } 
): React.ReactElement => {
    const API_KEY: any = process.env.REACT_APP_GOOGLE_API_KEY
    const LAT: any = process.env.REACT_APP_DEFAULT_LT
    const LNG: any = process.env.REACT_APP_DEFAULT_LG

    const [centerMapLocation, setCenterMapLocation] = useState<LocationProps>({
        lat: centerMap?.lat ?? parseFloat(LAT),
        lng: centerMap?.lng ?? parseFloat(LNG)
    })

    useEffect (() => {

        return () => {
            // cleanup
        }
    }, [])

    return (<>
        <LoadScript googleMapsApiKey={API_KEY}>
            <GoogleMap 
                mapContainerStyle={{height:'100%', width:'100%'}} 
                center={centerMapLocation} 
                zoom={15}
                onRightClick={()=>{}}
            >   
                <SearchLocationsComponent 
                    searchAction = {(place: any) => {
                    }}
                />
                {children}
            </GoogleMap>
        </LoadScript>
    </>)
}

export default WMapsComponent;