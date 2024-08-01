import React, { 
    createContext, 
    useEffect, 
    useState, 
} from 'react';

export const DatatableContext = createContext<any>(null);

const DatatableContextProvider = ({children} : any) : React.ReactElement => {

    const [isRefreshDataTable, setIsRefreshDataTable] = useState<boolean>(false)

    return (
        <DatatableContext.Provider
            value={{
                isRefreshDataTable,
                setIsRefreshDataTable
            }}
        >
            {children}
        </DatatableContext.Provider>
    );
}
export default DatatableContextProvider;