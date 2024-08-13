import { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { HRContext } from "context/HRContext";
import DataTableV2 from "app/components/DataTableV2";
import UserService from "services/UserService";
import {DatatableContext} from 'context/DataTableContext';
const Crew = () => {
    const {accessToken} = useContext(HRContext)
    const {isRefreshDataTable} = useContext(DatatableContext)
    const userService = new UserService(accessToken)

    useEffect(() => {


        return () => {

        }
    }, [])

    return (
        <>
            <DataTableV2
                columnData={[]}
                getDataService={userService}
                getDataMethodName={'getUser'}
                payload={[]}
            >
                <div></div>
            </DataTableV2>
        </>
    );
}

export default Crew;