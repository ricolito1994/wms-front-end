import { 
    useContext, 
    useEffect, 
    useState 
} from "react";

import { AppContext } from "context";

const WasteCollection = () : React.ReactElement => {

    const appContext = useContext(AppContext)

    const {} = appContext

    return (<>WASTE COLLECTION</>)
}

export default WasteCollection;