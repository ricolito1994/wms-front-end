import React, { 
    useContext, 
    useEffect, 
    useState ,
    useCallback
} from "react";
import { Modal, Spin } from 'antd';
import WAutoComplete from "../WAutoComplete";
import LandmarkService from "services/LandmarkService";
import { AppContext } from "context";
interface WMapsDirectionsListComponentProps {
    children: any 
}

const WMapsDirectionsListComponent: React.FC <WMapsDirectionsListComponentProps>  = (
    {
        children
        // props here
    } 
): React.ReactElement => {

    let [mainStyle, setMainStyle] = useState<any>({});

    useEffect(() => {
        setMainStyle({
            background: "white"   ,
            width:      "20%"     ,
            left:       "5%"      ,
            top:        "25%"     ,
            position:   "absolute",
            zIndex: 9999,
            padding: "1%",
            border: "1px solid #ccc"
        })
    }, [])

    return (<>
        <div style={mainStyle}>
           Directions
           {children}
        </div>
    </>)
}

export default WMapsDirectionsListComponent;