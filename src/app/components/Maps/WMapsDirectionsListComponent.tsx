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
import { Button } from "antd";
import { start } from "node:repl";
interface WMapsDirectionsListComponentProps {
    directions    : any,
    waypoints     : any,
    children      : any,
    omitStrings?  : any [],
    setDirections : any,
    setWaypoints  : any,
}

const WMapsDirectionsListComponent: React.FC <WMapsDirectionsListComponentProps>  = (
    {
        omitStrings = ["Bago City", "Negros Occidental", "Philippines"],
        waypoints,
        setDirections,
        setWaypoints,
        directions,
        children
        // props here
    } 
): React.ReactElement => {

    let [mainStyle, setMainStyle] = useState<any>({});

    useEffect(() => {
        setMainStyle({
            background: "white"   ,
            width:      "27%"     ,
            left:       "5%"      ,
            top:        "15%"     ,
            position:   "absolute",
            zIndex: 9999,
            padding: "1%",
            border: "1px solid #ccc",
            fontSize: "12px"
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

    const deleteWaypoint = (direction: any) => {
        /*let startLocation = {
            lat : direction.start_location.lat(),
            lng : direction.start_location.lng()
        }
        let endLocation = {
            lat : direction.end_location.lat(),
            lng : direction.end_location.lng()
        }
        setWaypoints((prev:any) => prev.filter((item: any) => 
            ((item.location.lat !== startLocation.lat) || (item.location.lng !== startLocation.lng))
        ));
        setWaypoints((prev:any) => prev.filter((item: any) => 
            ((item.location.lat !== endLocation.lat) || (item.location.lng !== endLocation.lng))
        ));
        setDirections(null);*/
    }

    return (<>
        <div style={mainStyle}>
           Directions
           <ol>
            {directions.routes[0].legs.map((direction:any, index:any) => {
                return (
                    <li key={index}>
                        {omitString(direction.start_address)} - {omitString(direction.end_address)}
                        {/*<Button onClick={()=>deleteWaypoint(direction)} type="primary" danger>
                            delete
                        </Button> &nbsp;*/}
                    </li>
                )
            })}
            </ol>
           {children}
        </div>
    </>)
}

export default WMapsDirectionsListComponent;