import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { LandmarksContext } from "context/LandmarksContext";
const Barangay = () => {
    const {accessToken} = useContext(LandmarksContext)
    useEffect(() => {
        
    }, [])
    return (
        <div>
            <div>Barangay</div>
        </div>
    )
}

export default Barangay;