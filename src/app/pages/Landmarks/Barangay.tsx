import React, { 
    useContext, 
    useEffect, 
    useState 
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
import BarangayDialog from "app/components/DialogBox/BarangayDialog";

interface BarangayDialogDataProps {

}

const Barangay = () => {
    const {
        uuidv4, 
        userData,
        CURRENT_CITY,
        CURRENT_CITY_ID
    } = useContext(AppContext)

    const barangayColumnData = [
        {
            title : "Barangay Name",
            dataIndex: 'barangay_name',
            key: 'barangay_name',
            sorter: (a:any, b:any) => a.barangay_name.localeCompare(b.barangay_name),
        },
        {
            title : "Latitude",
            dataIndex: 'latitude',
            key: 'latitude',
            sorter: (a:any, b:any) => a.barangay_name.localeCompare(b.latitude),
        },
        {
            title : "Longitude",
            dataIndex: 'longitude',
            key: 'longitude',
            sorter: (a:any, b:any) => a.barangay_name.localeCompare(b.longitude),
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
            render: (text: any, barangay: any) => (
                <span>
                  <Button type="primary" onClick={() => openBarangayDialog(barangay)}>Edit</Button>&nbsp;
                </span>
            ),
        },
    ]

    const defaultEmployeeSearchPayload : any = {
        barangay_name : '',
        city_id : 1,
    }

    const defaultBarangayDialogForm : any = {
        //id : null,
        barangay_name : '',
        city_id : 1,
        city_name : CURRENT_CITY,
        created_by : CURRENT_CITY_ID,
        longitude : 0.0,
        latitude : 0.0,
    }
    
    const {accessToken} = useContext(LandmarksContext)
    const landmarkService = new LandmarkService (accessToken)
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isOpenBarangayDialog, setIsOpenBarangayDialog] = useState<boolean>(false);
    const [payload, setPayload] = useState<any>(defaultEmployeeSearchPayload);
    const [barangayName, setBarangayName] = useState<any>('');
    const [barangayDataForm, setBarangayDataForm] = useState<any>({});
    const [isLoadingBarangayData, setIsLoadingBarangayData] = useState<boolean>(false);
    
    useEffect(() => {
        
    }, [])

    const openBarangayDialog = (barangayObject:any|null) => {
        if (!barangayObject) {
            setBarangayDataForm(defaultBarangayDialogForm)
            setIsOpenBarangayDialog(true);
            return;
        }
        setBarangayDataForm(({...defaultBarangayDialogForm, 
            id:barangayObject.id,
            barangay_name:barangayObject.barangay_name,
            latitude : barangayObject.latitude,
            longitude : barangayObject.longitude
        }))
        setIsOpenBarangayDialog(true);
    }

    return (
        <>
            <div style={{height:'98%'}}>
                {/* isLoading ?
                <div className="overlay-form-loading">
                    <div className="loader"></div>
                </div> : '' */}
                <BarangayDialog 
                    key={uuidv4()}
                    isOpen = {isOpenBarangayDialog}
                    setIsOpen = {setIsOpenBarangayDialog}
                    barangayDataForm = {barangayDataForm}
                    setBarangayDataForm = {setBarangayDataForm}
                    setIsLoadingBarangayData = {()=>{}}
                />
                <DataTableV2
                    columnData={barangayColumnData}
                    getDataService={landmarkService}
                    getDataMethodName={'show'}
                    payload={payload}
                    additionalProps = {{
                        payloadObject : {
                            type: 'barangay',
                            payload: payload,
                        }
                    }}
                >
                    <div style={{height:'7%', paddingBottom:'1%'}}>
                        <div style={{width:'50%', float:'left'}}>
                            <Input 
                                style={{ height: '40px' }} 
                                placeholder="Type User's name ..."
                                onPressEnter={() => setPayload((prev:any) => ({ ...prev , barangay_name: barangayName }))}
                                onChange={(e)=>setBarangayName(e.target.value)}
                            />
                        </div>
                        
                        <div style={{width:'20%', float:'left', paddingLeft:'0.5%'}}>
                            <Button onClick={()=>{openBarangayDialog(null)}} type="default" style={{ height: '40px', width:'100%' }}>
                                <PlusOutlined /> Add New User
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

export default Barangay;
