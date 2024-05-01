import { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { Input, Button, Menu } from 'antd';
import { UnitContext } from 'context/UnitContext';
import { UnitService } from 'services/UnitService';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import DataTable from 'app/components/DataTable';
import UnitDialog from '../../components/DialogBox/UnitDialog';
interface UnitModel {

}
const UnitDashboard = () => {
    const {accessToken} = useContext(UnitContext)
    const [isOpenUnitDialog, setIsOpenUnitDialog] = useState<boolean>(false);
    const [isSearchOptionVisible, setSearchOptionVisible] = useState<boolean>(false);
    const [isLoadingUnitData, setIsLoadingUnitData] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<string>("");
    const [tableData, setTableData] = useState<any>([]);
    const [paginationButtons, setPaginationButtons] = useState<any>([]);
    const [searchOption, setSearchOption] = useState<any>({
        sort_name : 'All',
        sort_key: 'all'
    });
    const unitService = new UnitService(accessToken);
    const searchOptions = [
        {
            sort_name : 'All',
            sort_key: 'all'
        },
        {
            sort_name : 'Model',
            sort_key : 'model_name'
        },
        {
            sort_name : 'Chassis Number',
            sort_key : 'chassis_number'
        },
        {
            sort_name : 'Plate Number',
            sort_key : 'plate_number'
        },
    ]
    const columnData = [
        {
            title : "Model",
            dataIndex: 'model_name',
            key: 'model_name',
            sorter: (a:any, b:any) => a.model_name.localeCompare(b.model_name),
        },
        {
            title : "Chassis Number",
            dataIndex: 'chassis_number',
            key: 'chassis_number',
            sorter: (a:any, b:any) => a.chassis_number.localeCompare(b.chassis_number),
        },
        {
            title : "Gross Weight",
            dataIndex: 'gross_weight',
            key: 'gross_weight',
            sorter: (a:any, b:any) => a.gross_weight.localeCompare(b.gross_weight),
        },
        {
            title : "Plate Number",
            dataIndex: 'plate_number',
            key: 'plate_number',
            sorter: (a:any, b:any) => a.plate_number.localeCompare(b.plate_number),
        },
        {
            title : "Actions",
            key: 'action',
            render: (text: any, record: any) => (
                <span>
                  <Button type="primary" onClick={() => openUnit(record.key)}>Edit</Button>&nbsp;
                  <Button type="default" onClick={() => deleteUnit(record.key)}>X Delete</Button>
                </span>
            ),
        },
    ]

    const handleSearchMenuClick = (choice: any) => {
        let chosen = searchOptions.find(x => x.sort_key === choice.key)
        setSearchOption(chosen)
        setSearchOptionVisible(false)
    }

    const openUnit = (r : any) => {
        setIsOpenUnitDialog(true)
    }

    const deleteUnit = (r : any) => {}
    const getUnitData = async (searchOptionParam: any = null, page:any = null) => {
        try{
            setIsLoadingUnitData(true)
            let searchParams = searchOptionParam ? searchOptionParam : searchOption
            searchParams['searchValue'] = searchValue
            let result = await unitService.getUnit(searchParams, page)
            setIsLoadingUnitData(false)
            setTableData(result.result.data)
            setPaginationButtons(result.result.links)
            setCurrentPage(result.result.current_page)
        }catch(e){
            //console.log(e)
        }
    }
    const handleChangeSearch = (e: any) => {
        setSearchValue(e.target.value)
        getUnitData(searchOption);
    }
    useEffect(() => {
        getUnitData(searchOption);
    }, [])
    return (
        <>
            <UnitDialog 
                isOpen={isOpenUnitDialog}
                setIsOpen={setIsOpenUnitDialog}
                unitDataForm={{}}
            />
            <DataTable
                columnData={columnData}
                tableData={tableData}
                pagination={paginationButtons}
                paginationFunction={getUnitData}
                currentPage={currentPage}
            >
                { isLoadingUnitData ?
                <div className="overlay-form-loading">
                    <div className="loader"></div>
                </div> : '' }
                <div style={{height:'10%'}}>
                    <div style={{width:'50%', float:'left'}}>
                        <Input 
                            style={{ height: '40px' }} 
                            placeholder={`Search by ${searchOption.sort_name}`} 
                            onPressEnter={handleChangeSearch}
                        />
                    </div>
                    <div className="btn-drop-down-menu">
                        <Button 
                            type="primary" 
                            onClick={() => setSearchOptionVisible(!isSearchOptionVisible)} 
                            style={{ height: '40px', width:'100%' }}
                        >
                            {searchOption.sort_name} <DownOutlined />
                        </Button>
                        {isSearchOptionVisible &&
                            <Menu onClick={handleSearchMenuClick} className="btn-dropdown-menu__content">
                                {searchOptions.map((value, index)=>
                                    <Menu.Item key={value.sort_key}>{value.sort_name}</Menu.Item>
                                )}
                            </Menu>
                        }
                    </div>
                    <div style={{width:'20%', float:'left', paddingLeft:'0.5%'}}>
                        <Button onClick={openUnit} type="default" style={{ height: '40px', width:'100%' }}>
                            <PlusOutlined /> Add New Unit
                        </Button>
                    </div>
                    <div style={{clear:'both'}}>
                    </div>
                </div>
            </DataTable>
        </>
    )
}

export default UnitDashboard;