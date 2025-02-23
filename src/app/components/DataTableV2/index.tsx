import React, { 
    useState, 
    useEffect, 
    useContext,
    useMemo,
    useCallback
} from "react";

import { 
    notification,
    Table, 
    Button,
    Spin  
} from 'antd';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { DatatableContext } from "context/DataTableContext";


interface AdditionalProps {
    payloadObject : Object
}

interface PropsData {
    columnData: any [],
    getDataService: any,
    getDataMethodName: string,
    payload : any,
    children : React.ReactElement,
    additionalProps?: AdditionalProps /* additonal params to be passed when requesting data to datable */
}


const DataTableV2 = (
   {
        columnData,
        getDataService,
        getDataMethodName,
        payload,
        children,
        additionalProps
   } 
   : PropsData
) 
: React.ReactElement => 
{
    const dataTableContext = useContext(DatatableContext);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [paginationButtons, setPaginationButtons] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loadedResult, setLoadedResult] = useState<number>(0);
    const [totalResult, setTotalResult] = useState<number>(0);
    const [tableData, setTableData] = useState<any[]>([]);
    const {isRefreshDataTable, setIsRefreshDataTable} = dataTableContext

    const loadTableData = async (signal:any|null = null, page:number|null = null) => {
        try {
            if(!isLoading) setIsloading(true);  
            if (signal) getDataService?.setAbortControllerSignal(signal)
            let results = null;

            if (additionalProps?.payloadObject) { 
                results = await (getDataService as any)[getDataMethodName](...Object.values(additionalProps.payloadObject), (!page ? currentPage : page));
            } else {
                results = await (getDataService as any)[getDataMethodName](payload, (!page ? currentPage : page));
            }
            let usersData = results.data.data.map((item:any, index:any) => {
                return { ...item, key: index.toString() };
            });
            setTotalResult(results.data.total)
            setLoadedResult(results.data.to)
            setTableData(usersData)
            setPaginationButtons(results.data.links)
            //setCurrentPage(results.data.current_page)
        } catch (e: any) {
            notification.error({
                message: 'Getdata Failed',
                description: e?.response?.data?.error,
                placement: 'top',
            });
        } finally {
            setIsloading(false);
            setIsRefreshDataTable(false)
        }
    }

    const memoizedPayload = useMemo(() => payload, [payload])

    useEffect( () => {
        if (!isRefreshDataTable) return;
        const controller = new AbortController();
        const signal = controller.signal;
        loadTableData(signal)
        return () => {
            controller.abort();
        }
    }, [currentPage, isRefreshDataTable]);

    useEffect( () => {
        const controller = new AbortController();
        const signal = controller.signal;
        loadTableData(signal, 1)
        return () => {
            controller.abort();
        }
    }, [memoizedPayload]);

    const renderPagniationLabel = (pagination: any, index:any) : React.ReactNode => {
        if (pagination.label.includes("Next")) {
            return (
                <Button key={index} disabled={!pagination.url} type="link" onClick={() =>{
                    setIsRefreshDataTable((prev : any)=> !prev);
                    setCurrentPage( (prevCurrentPage: number|any) => prevCurrentPage + 1);
                }}>
                    <RightOutlined />
                </Button> 
            )
        } else if (pagination.label.includes("Previous")){
            return  (
                <Button key={index} disabled={!pagination.url} type="link" onClick={() =>{
                    setIsRefreshDataTable((prev : any)=> !prev);
                    setCurrentPage( (prevCurrentPage: number|any) => prevCurrentPage - 1);
                }}>
                    <LeftOutlined />
                </Button> 
            )
        } 
        return  (
            <Button key={index} type={!pagination.active ? "default" : 'primary'} 
                onClick={() => {
                    setIsRefreshDataTable((prev : any)=> !prev);
                    setCurrentPage(index)
                }}>
                {pagination.label}
            </Button> 
        );
    }
    return (
        <>
            {/*<Spin spinning={isLoading} style={{height:'110%'}} />*/}
            { isLoading ?
                <div className="overlay-form-loading"> 
                    <div className="loader"></div>
                </div> : '' }
            <div className="data-table-container">
                {children}
                <div className="data-table-main-container">
                    <Table 
                        dataSource={tableData}
                        columns={columnData}
                        pagination={false}
                    />
                </div>
                <div>
                    {loadedResult} out of {totalResult} results
                </div>
                <div className="pagination-buttons-container">
                    {paginationButtons.map((value:any, index:any) => renderPagniationLabel(value, index))}
                </div>
            </div>
        </>

    )
}
export default DataTableV2;