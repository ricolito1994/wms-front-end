import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { LandmarksContext } from "context/LandmarksContext";
const Address = () => {
    const {accessToken} = useContext(LandmarksContext)
    useEffect(() => {
        
    }, [])
    return (
        <div>
            <div>Address</div>
        </div>
    )
}

export default Address;