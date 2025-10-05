import React, { 
    useContext, 
    useEffect, 
    useState ,
    useCallback
} from "react";
/*import { Modal, Spin } from 'antd';
import WAutoComplete from "../WAutoComplete";
import LandmarkService from "services/LandmarkService";*/
import { UnitService } from "@/services/UnitService";
import { AppContext } from "@/context";
import SaveRouteDialogComponent from "../DialogBox/SaveRouteDialogComponent";

import { 
    App,
    Button, 
    Modal, 
    Spin 
} from "antd";
interface WMapsDirectionsListComponentProps {
    directions    : any,
    waypoints     : any,
    //children      : any,
    omitStrings?  : any [],
    setDirections : any,
    setWaypoints  : any,
    truckID?      : number|null,
}

const WMapsDirectionsListComponent: React.FC <WMapsDirectionsListComponentProps>  = (
    {
        omitStrings = ["Bago City", "Negros Occidental", "Philippines"],
        waypoints,
        setDirections,
        setWaypoints,
        directions,
        truckID,
        // children
        // props here
    } 
): React.ReactElement => {
    let {accessToken} = useContext(AppContext);
    let unitService = new UnitService(accessToken)
    let [mainStyle, setMainStyle] = useState<any>({});
    const [isOpenSaveRouteDialogComponent, setIsOpenSaveRouteDialogComponentog] = useState<boolean>(false)
    const [saveRouteTemplateParams, setSaveRouteTemplateParams] = useState<any>({});

    useEffect(() => {
        setMainStyle({
            background: "white"   ,
            width:      "27%"     ,
            left:       "5%"      ,
            top:        "15%"     ,
            position:   "absolute",
            // zIndex:     9999,
            padding:    "1%",
            border:     "1px solid #ccc",
            fontSize:   "12px"
        })
    }, [])

    useEffect(() => {

    }, [directions])

    const omitString = (words: String) => {
        const regex = new RegExp(`(,\\s*)?\\b(${omitStrings.join("|")})\\b(\\s*,)?`, "gi");

        const filteredWords = words
            .replace(regex, "") // Remove matched words + commas
            .replace(/\s+/g, " ") // Fix extra spaces
            .replace(/,\s*$/, "") // Remove trailing commas if needed
            .trim();

        return filteredWords
    }

    const saveTruckRoute = () => {
        setIsOpenSaveRouteDialogComponentog(true)
        setSaveRouteTemplateParams({
            directions: directions,
            waypoints: waypoints
        })
    }

    const clearData = () =>{
        setDirections(null)
        setWaypoints([])
    }

    return (<>
        <div style={mainStyle}>
           Directions
           <ol>
            {directions.routes[0].legs.map((direction:any, index:any) => {
                return (
                    <li key={index}>
                        {omitString(direction.start_address)} - {omitString(direction.end_address)}
                    </li>
                )
            })}
            </ol>
            <Button type="primary" onClick={saveTruckRoute} >
                Save
            </Button> &nbsp;
            <Button onClick={clearData} type="primary" danger>
                Cancel
            </Button>&nbsp;
        </div>
        <SaveRouteDialogComponent 
            isOpen={isOpenSaveRouteDialogComponent}
            setIsOpen={setIsOpenSaveRouteDialogComponentog}
            saveParams={saveRouteTemplateParams}
            clearData={clearData}
        />
    </>)
}

export default WMapsDirectionsListComponent;