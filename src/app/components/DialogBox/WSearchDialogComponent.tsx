import React, { 
    useContext, 
    useEffect, 
    useState ,
    useCallback
} from "react";

import DialogBox from ".";

import WAutoComplete from "../WAutoComplete";

import DataTableV2 from "../DataTableV2";

interface WSearchDialogComponentProps {
    isOpen       ? : boolean  ,
    width        ? : any      ,
    setIsOpen      : Function ,
    serviceClass ? : any      ,
    handleClose    : Function ,
    title        ? : any      ,
    columnData   ? : any      ,
    children       : React.ReactNode ,
}

const WSearchDialogComponent: React.FC<WSearchDialogComponentProps> = ({
    isOpen          = false ,
    setIsOpen               ,
    serviceClass            ,
    width           = 1000  ,
    title           = "Search Dialog",
    columnData ,
    handleClose,
    children   ,
}) :React.ReactElement  => {
    const [searchPayload, setSearchPayload] = useState<any>({});

    useEffect(() => {
        return () => {

        }
    }, searchPayload)

    return (
        <DialogBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalTitle={title}
            form={null}
            handleClose={handleClose}
            width={width}
        >
            <>
                <DataTableV2
                    columnData={columnData}
                    getDataService={serviceClass}
                    getDataMethodName={'index'}
                    payload={searchPayload}
                >
                    <>
                        {children}
                    </>
                </DataTableV2>
            </>
        </DialogBox>
    )
}

export default WSearchDialogComponent;