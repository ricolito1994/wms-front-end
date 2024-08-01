import { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { HRContext } from "context/HRContext";
import UserService from "services/UserService";
const Crew = () => {
    const {accessToken} = useContext(HRContext)
    const userService = new UserService(accessToken)

    useEffect(() => {


        return () => {

        }
    }, [])

    return (
        <div>
        </div>
    );
}

export default Crew;