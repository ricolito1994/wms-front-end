import React, { 
    useContext, 
    useEffect, 
    useState,
    useCallback
} from "react";
import { 
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
import PurokDialog from "app/components/DialogBox/PurokDialog";
import WAutoComplete from 'app/components/WAutoComplete';

const Address = () => {
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
            dataIndex: 'address_name',
            key: 'address_name',
            sorter: (a:any, b:any) => a.purok_name.localeCompare(b.purok_name),
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
                    {b.barangay.barangay_name}
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
        city_id : 1,
    }
    
    const wAutoCompleteUniqueID1 = "101x2";
    const landmarkService = new LandmarkService (accessToken)
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isOpenPurokDialog, setIsOpenPurokDialog] = useState<boolean>(false);
    const [payload, setPayload] = useState<any>(defaultAddressSearchObject);
    const [purokSearchName, setPurokSearchName] = useState<any>('');
    const [barangaySearchName, setBarangaySearchName] = useState<any>('');
    const [purokDataForm, setPurokDataForm] = useState<any>({});
    const [isLoadingBarangayData, setIsLoadingBarangayData] = useState<boolean>(false);    

    useEffect(() => {
        return () => {

        }
    }, [])

    const openAddressDialog = (addressObject: any) => {

    }

    return (
        <>
            <div style={{height:'98%'}}>
                {/* isLoading ?
                <div className="overlay-form-loading">
                    <div className="loader"></div>
                </div> : '' */}
                {/* <PurokDialog 
                    key={uuidv4()}
                    isOpen = {isOpenPurokDialog}
                    setIsOpen = {setIsOpenPurokDialog}
                    purokDataForm = {purokDataForm}
                    setPurokDataForm = {setPurokDataForm}
                    setIsLoadingBarangayData = {()=>{}}
                />*/}
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
                                value={purokSearchName}
                                placeholder="Type Purok name ..."
                                onPressEnter={() => setPayload((prev:any) => ({ ...prev , purok_name: purokSearchName }))}
                                onChange={()=>{}}
                            />
                        </div>
                        <div style={{width:'30%', float:'left', paddingLeft:'0.5%'}}>
                            <WAutoComplete  
                                service={landmarkService}
                                functionName={'show'}
                                data={barangaySearchName}
                                setData={(b:any) => {
                                    setBarangaySearchName(b.label)
                                    setPayload((prev:any) => ({ ...prev , barangay_id: b.item.id }))
                                }}
                                clearData={(b:any) => {
                                    setBarangaySearchName("")
                                    setPayload((prev:any) => ({ ...prev , barangay_id: null }))
                                }}
                                payload={{
                                    type : 'barangay',
                                    payload : {
                                        barangay_name : '',
                                        city_id : 1
                                    },
                                    page: 1,
                                }}
                                wAutoCompleteIndexPayload={'barangay_name'}
                                wAutoCompleteIndexRsLabel={'barangay_name'}
                                wAutoUniqueID={wAutoCompleteUniqueID1}
                                style={{width:'100%', height:'144%'}}
                                placeholder={'Enter barangay name ...'}
                            />
                        </div>
                        <div style={{width:'20%', float:'left', paddingLeft:'0.5%'}}>
                            <Button onClick={()=>{openAddressDialog(null)}} type="default" style={{ height: '40px', width:'100%' }}>
                                <PlusOutlined /> Add New Purok
                            </Button>
                        </div>
                        <div style={{width:'18.5%', float:'left', paddingLeft:'0.5%'}}>
                            <Button 
                                onClick={()=>{
                                    window.dispatchEvent(new CustomEvent(`wAutoCompleteClear:${wAutoCompleteUniqueID1}`, {detail:''}));
                                    setPurokSearchName("")
                                    setPayload((prev:any) => ({ ...prev , barangay_id: null, purok_name : '' }))
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