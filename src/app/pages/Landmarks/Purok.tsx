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
import { idText } from "typescript";
interface PurokDialogDataProps {

}

const Purok = () => {
    const {
        uuidv4, 
        userData,
        CURRENT_CITY,
        CURRENT_CITY_ID
    } = useContext(AppContext)

    const PurokColumnData = [
        {
            title : "Purok Name",
            dataIndex: 'purok_name',
            key: 'purok_name',
            sorter: (a:any, b:any) => a.purok_name.localeCompare(b.purok_name),
        },
        {
            title : "Latitude",
            dataIndex: 'latitude',
            key: 'latitude',
            sorter: (a:any, b:any) => a.latitude.localeCompare(b.latitude),
        },
        {
            title : "Longitude",
            dataIndex: 'longitude',
            key: 'longitude',
            sorter: (a:any, b:any) => a.longitude.localeCompare(b.longitude),
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
                  <Button type="primary" onClick={() => openPurokDialog(purok)}>Edit</Button>&nbsp;
                </span>
            ),
        },
    ]

    const defaultPurokSearchObject : any = {
        purok_name : '',
        city_id : 1,
        barangay_id : null,
    }

    const defaultPurokFormObject : any = {
        //id : null,
        purok_name : '',
        city_id : 1,
        city_name : CURRENT_CITY,
        created_by : CURRENT_CITY_ID,
        longitude : 0.0,
        latitude : 0.0,
    }
    const wAutoCompleteUniqueID1 = "101x1";
    const {accessToken} = useContext(LandmarksContext)
    const landmarkService = new LandmarkService (accessToken)
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isOpenPurokDialog, setIsOpenPurokDialog] = useState<boolean>(false);
    const [payload, setPayload] = useState<any>(defaultPurokSearchObject);
    const [purokSearchName, setPurokSearchName] = useState<any>('');
    const [barangaySearchName, setBarangaySearchName] = useState<any>('');
    const [purokDataForm, setPurokDataForm] = useState<any>({});
    const [isLoadingBarangayData, setIsLoadingBarangayData] = useState<boolean>(false);
    
    useEffect(() => {
        
    }, [])

    const openPurokDialog = (purokObject:any|null) => {
        if (!purokObject) {
            setPurokDataForm(defaultPurokFormObject)
            setIsOpenPurokDialog(true);
            return;
        }
        setPurokDataForm(({...defaultPurokFormObject, 
            id            : purokObject.id,
            barangay_id   : purokObject.barangay_id,
            purok_name    : purokObject.purok_name,
            latitude      : purokObject.latitude,
            longitude     : purokObject.longitude,
            barangay_name : purokObject.barangay.barangay_name
        }))
        setIsOpenPurokDialog(true);
    }

    const handleChangepSearchName = useCallback ((e:any) => setPurokSearchName((prev:any) => e.target.value), []);

    return (
        <>
            <div style={{height:'98%'}}>
                {/* isLoading ?
                <div className="overlay-form-loading">
                    <div className="loader"></div>
                </div> : '' */}
                <PurokDialog 
                    key={uuidv4()}
                    isOpen = {isOpenPurokDialog}
                    setIsOpen = {setIsOpenPurokDialog}
                    purokDataForm = {purokDataForm}
                    setPurokDataForm = {setPurokDataForm}
                    setIsLoadingBarangayData = {()=>{}}
                />
                <DataTableV2
                    columnData={PurokColumnData}
                    getDataService={landmarkService}
                    getDataMethodName={'show'}
                    payload={payload}
                    additionalProps = {{
                        payloadObject : {
                            type: 'purok',
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
                                onChange={handleChangepSearchName}
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
                            <Button onClick={()=>{openPurokDialog(null)}} type="default" style={{ height: '40px', width:'100%' }}>
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
    );
}

export default Purok;
