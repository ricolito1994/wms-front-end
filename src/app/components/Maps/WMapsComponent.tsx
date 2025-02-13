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

interface WMapsProps {
    PR1 : any,
    children? : React.ReactElement
}

const WMapsComponent = (
    {
        PR1,
        children 
    } : WMapsProps
): React.ReactElement => {
    return (<></>)
}

export default WMapsComponent;