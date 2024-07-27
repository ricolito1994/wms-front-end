import { useState, useEffect } from "react";
import { Table, Button  } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
interface ColumnData {
    title : String,
}
interface PropsData {
    columnData : ColumnData [],
    tableData : any [],
    pagination : any [],
    paginationFunction: Function,
    currentPage: any,
    loadedResult : any,
    totalResult : any,
    children: any
}
const DataTable = (
    { 
        columnData, 
        tableData, 
        pagination,
        paginationFunction,
        currentPage,
        loadedResult,
        totalResult,
        children 
    }: PropsData
) => 
{
    useEffect( () => {
        return () => {

        }
    }, [tableData]);
    const renderPagniationLabel = (pagination: any, index:any) : React.ReactNode => {
        if (pagination.label.includes("Next")) {
            return (
                <Button key={index} disabled={!pagination.url} type="link" onClick={() =>{
                    currentPage = currentPage + 1;
                    paginationFunction(null, currentPage)
                }}>
                    <RightOutlined />
                </Button>
            )
        } else if (pagination.label.includes("Previous")){
            return  (
                <Button key={index} disabled={!pagination.url} type="link" onClick={() =>{
                    currentPage = currentPage - 1;
                    paginationFunction(null, currentPage)
                }}>
                    <LeftOutlined />
                </Button>
            )
        } 
        return  (
            <Button key={index} type={!pagination.active ? "default" : 'primary'} 
                onClick={() => {paginationFunction(null, index)}}>
                {pagination.label}
            </Button> 
        );
    }
    return (
        <>
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
                    {pagination.map((value:any, index:any) => renderPagniationLabel(value, index))}
                </div>
            </div>
        </>
    )
}
export default DataTable;