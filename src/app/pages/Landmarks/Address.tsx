import React, { 
    useContext, 
    useEffect, 
    useState,
    useCallback
} from "react";
import {     
    Select, 
    notification,
    Input, 
    Button, 
    Menu , 
    Spin
} from 'antd';
import { 
    DownOutlined, 
    PlusOutlined 
    /*CloseOutlined*/ 
} from '@ant-design/icons';
import { AppContext } from "context";
import { LandmarksContext } from "context/LandmarksContext";
import DataTableV2 from "app/components/DataTableV2";
import LandmarkService from "services/LandmarkService";
import AddressDialog from "app/components/DialogBox/AddressDialog";
import WAutoComplete from 'app/components/WAutoComplete';

const Address = () => {
    const { Option } = Select;
    const {accessToken} = useContext(LandmarksContext)
    const {
        uuidv4, 
        userData,
        CURRENT_CITY,
        CURRENT_CITY_ID
    } = useContext(AppContext)

    const AddressColumnData = [
        {
            title : "Address Name",
            dataIndex: 'full_address',
            key: 'full_address',
            sorter: (a:any, b:any) => a.full_address.localeCompare(b.full_address),
        },
        {
            title : "Barangay",
            dataIndex: 'city',
            key: 'city',
            render: (text: any, b: any) => (
                <span>
                    {b.barangay.barangay_name}
                </span>
            ),
        },
        {
            title : "Purok",
            dataIndex: 'purok',
            key: 'purok',
            render: (text: any, b: any) => (
                <span>
                    {b.purok.purok_name}
                </span>
            ),
        },
        {
            title : "City",
            dataIndex: 'city',
            key: 'city',
            render: (text: any, b: any) => (
                <span>
                    {b.city.city_name}
                </span>
            ),
        },
        {
            title : "Actions",
            key: 'action',
            render: (text: any, purok: any) => (
                <span>
                    <Button type="primary" onClick={() => openAddressDialog(purok)}>Edit</Button>&nbsp;
                </span>
            ),
        },
    ]

    const defaultAddressSearchObject : any = {
        full_address : '',
        city_id : CURRENT_CITY_ID,
        address_type : ''
    }

    const defaultAddressDialogFormData : any = {
        full_address : '',
        city_id : CURRENT_CITY_ID,
        city_name : CURRENT_CITY,
        created_by : userData.id,
        longitude : 0.0,
        latitude : 0.0,
        address_type : 'street_address'
    }
    
    const wAutoCompleteUniqueID1 = "101x2";
    const landmarkService = new LandmarkService (accessToken)
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isOpenAddressDialog, setIsOpenAddressDialog] = useState<boolean>(false);
    const [payload, setPayload] = useState<any>(defaultAddressSearchObject);
    const [purokSearchName, setPurokSearchName] = useState<any>('');
    const [barangaySearchName, setBarangaySearchName] = useState<any>('');
    const [addressDataForm, setAddressDataForm] = useState<any>({});
    const [isLoadingBarangayData, setIsLoadingBarangayData] = useState<boolean>(false);    

    const [fullAddressSearchName, setFullAddressSearchName] = useState<any>("");
    const [addressType, setAddressType] = useState<any>("");

    useEffect(() => {
        return () => {

        }
    }, [])

    const openAddressDialog = (addressObject: any|null) => {
        setIsOpenAddressDialog(true)
        if (! addressObject) {
            setAddressDataForm(defaultAddressDialogFormData) 
            return;
        } 
        setAddressDataForm(({...defaultAddressDialogFormData, 
            id            : addressObject.id,
            barangay_id   : addressObject.barangay_id,
            purok_name    : addressObject.purok.purok_name,
            latitude      : addressObject.latitude,
            longitude     : addressObject.longitude,
            barangay_name : addressObject.barangay.barangay_name,
            full_address  : addressObject.full_address,
            address_type  : addressObject.address_type,
            street_name   : addressObject.street?.full_address,
            street        : addressObject.street?.id
        }))
    }

    const handleChangeAddressName = useCallback ((e:any) => setFullAddressSearchName((prev:any) => e.target.value), []);

    const handleChangeAddressType = useCallback ((value:string) => {
        setAddressType((prev:any) => value)
        setPayload((prev:any) => ({ ...prev , address_type : value }))
    }, [])

    const streetTypes = [
        {
            text : "All",
            value : ""
        },
        {
            text : "Street Address",
            value : "street_address"
        },
        {
            text : "Home Address",
            value : "home_address"
        },
    ]

    return (
        <>
            <div style={{height:'98%'}}>
                {isLoading ?
                <div className="overlay-form-loading">
                    <div className="loader"></div>
                </div> : '' }
                {<AddressDialog 
                    key={uuidv4()}
                    isOpen = {isOpenAddressDialog}
                    setIsOpen = {setIsOpenAddressDialog}
                    addressDataForm = {addressDataForm}
                    setAddressDataForm = {setAddressDataForm}
                    setIsLoadingAddressData = {()=>{}}
                />}
                <DataTableV2
                    columnData={AddressColumnData}
                    getDataService={landmarkService}
                    getDataMethodName={'show'}
                    payload={payload}
                    additionalProps = {{
                        payloadObject : {
                            type: 'address',
                            payload: payload,
                        }
                    }}
                >
                    <div style={{height:'7%', paddingBottom:'1%'}}>
                        <div style={{width:'30%', float:'left'}}>
                            <Input 
                                style={{ height: '40px' }} 
                                value={fullAddressSearchName}
                                placeholder="Type Address..."
                                onPressEnter={() => setPayload((prev:any) => ({ ...prev , full_address: fullAddressSearchName }))}
                                onChange={handleChangeAddressName}
                            />
                        </div>
                        <div style={{width:'30%', float:'left', paddingLeft:'0.5%'}}>
                            <Select style={{ width: '100%' , height: '40px' }}  placeholder="Select address type" onChange={handleChangeAddressType} value={addressType}>
                                {streetTypes.map((option, index) => <Option key={index} value={option.value}>{option.text}</Option>)}
                            </Select>
                        </div>
                        <div style={{width:'20%', float:'left', paddingLeft:'0.5%'}}>
                            <Button onClick={()=>{openAddressDialog(null)}} type="default" style={{ height: '40px', width:'100%' }}>
                                <PlusOutlined /> Add New Address
                            </Button>
                        </div>
                        <div style={{width:'18.5%', float:'left', paddingLeft:'0.5%'}}>
                            <Button 
                                onClick={()=>{
                                    window.dispatchEvent(new CustomEvent(`wAutoCompleteClear:${wAutoCompleteUniqueID1}`, {detail:''}));
                                    setFullAddressSearchName('')
                                    setPayload((prev:any) => ({ ...prev , full_address : '' }))
                                }} 
                                type="default" 
                                style={{ height: '40px', width:'100%' }}
                            >
                                <PlusOutlined /> Clear Search
                            </Button>
                        </div>
                        <div style={{clear:'both'}}>
                        </div>
                    </div>
                </DataTableV2>
            </div>
        </>
    )
}

export default Address;