import { 
    useContext, 
    useEffect, 
    useState 
} from "react";

import { AppContext } from "@/context";

const TruckArrivals = () : React.ReactElement => {

    const appContext = useContext(AppContext)

    const {} = appContext

    return (<>Truck Arrivals</>)
}

export default TruckArrivals;