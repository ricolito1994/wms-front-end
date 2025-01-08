import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { LandmarksContext } from "context/LandmarksContext";
const Purok = () => {
    const {accessToken} = useContext(LandmarksContext)
    useEffect(() => {
        
    }, [])
    return (
        <div>
            <div>Purok</div>
        </div>
    )
}

export default Purok;