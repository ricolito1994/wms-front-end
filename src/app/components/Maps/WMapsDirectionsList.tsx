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
    directions: []
}

const WMapsDirectionsList: React.FC <WMapsDirectionsListComponentProps>  = (
    {
        directions
        // props here
    } 
): React.ReactElement => {

    let [mainStyle, setMainStyle] = useState<any>({
        background: "white",
        height: "50%",
        width:  "20%",
        left:    "5%",
        top:     "25%",
        position: "absolute",
        zIndex: 9999,
    });


    return (<>
        
    </>)
}

export default WMapsDirectionsList;