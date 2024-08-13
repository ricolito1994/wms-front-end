import { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { Input, Button, Menu } from 'antd';
import { UnitContext } from 'context/UnitContext';
import { UnitService } from 'services/UnitService';
import { DownOutlined, PlusOutlined /*CloseOutlined*/ } from '@ant-design/icons';
import DataTable from 'app/components/DataTable';
import UnitDialog from '../../components/DialogBox/UnitDialog';
import UnitCrewDialog from "app/components/DialogBox/UnitCrewModal";
interface UnitModel {
    id? : Number | null,
    model_name: String,
    plate_number : String,
    chassis_number : String,
    gross_weight? : Number | null,
}
interface UnitParams {
    searchOptionParam: UnitSearchOption,
    page?: Number,
}
interface UnitSearchOption {
    sort_name: String,
    sort_key: String,
    searchValue?: String | null,
}
interface UnitSearchParam  {
    getUnitFunction: Function,
    params: UnitParams
}
const defaultUnitValues: UnitModel = {
    id: null,
    gross_weight: null,
    model_name: '',
    plate_number : '',
    chassis_number : '',
}
const defaultUnitSearchOptions : UnitSearchOption = {
    sort_name : 'All',
    sort_key: 'all',
    searchValue: null,
}

const UnitDashboard = () => {
    const {accessToken} = useContext(UnitContext)
    const [isOpenUnitDialog, setIsOpenUnitDialog] = useState<boolean>(false);
    const [isOpenCrewModal, setIsOpenCrewModal] = useState<boolean>(false);
    const [unitData, setUnitData] = useState<any>({});
    const [isSearchOptionVisible, setSearchOptionVisible] = useState<boolean>(false);
    const [isLoadingUnitData, setIsLoadingUnitData] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<string>("");
    const [tableData, setTableData] = useState<any>([]);
    const [paginationButtons, setPaginationButtons] = useState<any>([]);
    const [unitDataForm, setUnitDataForm] = useState<UnitModel>(defaultUnitValues);
    const [unitSearchParam, setUnitSearchParam] = useState<UnitSearchParam>();
    const [searchOption, setSearchOption] = useState<UnitSearchOption>(defaultUnitSearchOptions);
    const [totalResult, setTotalResult] = useState<Number>(0);
    const [loadedResult, setTotalLoadedResult] = useState<Number>(0);
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
            sorter: (a:any, b:any) => a.gross_weight.toString().localeCompare(b.gross_weight.toString()),
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
            render: (text: any, unit: any) => (
                <>
                    <span>
                    <Button type="primary" onClick={() => openUnit(unit.id)}>Edit</Button>&nbsp;
                    </span>
                    <span>
                        <Button type="primary" onClick={() => crewSetup(unit)}>
                            Crew Setup
                        </Button>
                    </span>
                </>
            ),
        },
    ]

    const crewSetup = (unit:any) => {
        setUnitData(unit)
        setIsOpenCrewModal(true)
    }

    const handleSearchMenuClick = (choice: any) => {
        let chosen = searchOptions.find(x => x.sort_key === choice.key)
        if (!chosen) throw ("Chosen option not found");
        setSearchOptionVisible(false)
        if (searchValue!=='') {
            let chosenData = {
                sort_key: chosen?.sort_key,
                sort_name : chosen?.sort_name,
                searchValue: '',
            }
            if (chosen?.sort_name !== 'All')  {
                chosenData['searchValue'] = searchValue
            } else {
                setSearchValue("")
            }
            setSearchOption(chosenData)
            getUnitData(chosenData)
            return;
        }
        setSearchOption(chosen)
        getUnitData(chosen)
    }

    const openUnit = async (unitID : any = null) => {
        if (!unitID) {
            setUnitDataForm(defaultUnitValues)
            setIsOpenUnitDialog(true)
            return
        };
        let searchOptionsParams = unitSearchParam?.params.searchOptionParam.searchValue ?
            unitSearchParam?.params.searchOptionParam : defaultUnitSearchOptions;
        let unitData = await getUnitData(
            searchOptionsParams, 
            unitSearchParam?.params.page, 
            unitID
        );
        setUnitDataForm(unitData.result);
        setIsOpenUnitDialog(true)
    }

    const deleteUnit = (unitId : any) => {}

    const getUnitData = async (
        searchOptionParam: any = null, 
        page: any = null,
        unitID: any = null
    ) => {
        try{
            if(!isLoadingUnitData) setIsLoadingUnitData(true)
            let searchParams = searchOptionParam ? searchOptionParam : unitSearchParam?.params.searchOptionParam;
            let pageNum = page ? page : unitSearchParam?.params.page;

            let result = await unitService.getUnit(searchParams, pageNum, unitID)
          
            
            setUnitSearchParam({
                getUnitFunction: getUnitData,
                params : {
                    searchOptionParam: searchParams,
                    page: pageNum
                }
            });
            if (!unitID){
                let unitData = result.result.data.map((item:any, index:any) => {
                    return { ...item, key: index.toString() };
                });
                setTotalResult(result.result.total)
                setTotalLoadedResult(result.result.to)
                setTableData(unitData)
                setPaginationButtons(result.result.links)
                setCurrentPage(result.result.current_page)
                return;
            } 
            
            return result;
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoadingUnitData(false)
        }
    }
    const handleChangeSearch = (e: any) => {
        setSearchValue(e.target.value)
        searchOption['searchValue'] = e.target.value
        setSearchOption(searchOption);
        getUnitData(searchOption, (unitSearchParam?.params.page ? 1 : unitSearchParam?.params.page));
    }
    useEffect(() => {
        getUnitData(searchOption);
        return () => {
        }
    }, [])
    return (
        <>
            <UnitCrewDialog
                unitData={unitData}
                isOpen={isOpenCrewModal}
                setIsOpen={setIsOpenCrewModal}
                form={null}
                handleClose={()=>setIsOpenCrewModal(false)}
            />
            <UnitDialog 
                isOpen={isOpenUnitDialog}
                setIsOpen={setIsOpenUnitDialog}
                unitDataForm={unitDataForm}
                setUnitDataForm={setUnitDataForm}
                setIsLoadingUnitData={setIsLoadingUnitData}
                refreshUnitTable={
                    {
                        getUnitFunction : getUnitData,
                        params : unitSearchParam
                    }
                }
            />
            <DataTable
                columnData={columnData}
                tableData={tableData}
                pagination={paginationButtons}
                paginationFunction={getUnitData}
                currentPage={currentPage}
                loadedResult={loadedResult}
                totalResult={totalResult}
            >
                { isLoadingUnitData ?
                <div className="overlay-form-loading">
                    <div className="loader"></div>
                </div> : '' }
                <div style={{height:'10%'}}>
                    <div style={{width:'50%', float:'left'}}>
                        <Input 
                            style={{ height: '40px' }} 
                            disabled={searchOption.sort_name === 'All'}
                            placeholder={`Search by ${searchOption.sort_name}`} 
                            onPressEnter={handleChangeSearch}
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
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
                        <Button onClick={()=>openUnit()} type="default" style={{ height: '40px', width:'100%' }}>
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