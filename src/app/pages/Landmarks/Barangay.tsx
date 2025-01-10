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

    const barangayColumnData = [
        {
            title : "Barangay Name",
            dataIndex: 'barangay_name',
            key: 'barangay_name',
            sorter: (a:any, b:any) => a.barangay_name.localeCompare(b.barangay_name),
        },
        {
            title : "City",
            dataIndex: 'city',
            key: 'city',
            sorter: (a:any, b:any) => a.address.localeCompare(b.address),
        },
        {
            title : "Actions",
            key: 'action',
            render: (text: any, barangay: any) => (
                <span>
                  <Button type="primary" onClick={() => openBarangayDialog(barangay.id)}>Edit</Button>&nbsp;
                </span>
            ),
        },
    ]

    const defaultEmployeeSearchPayload : any = {
        payloadObject : {
            type: 'barangay',
            payload : {
                barangay_name : '',
                city_id : 1,
            }
        }
    }

    const {uuidv4} = useContext(AppContext)
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

    const openBarangayDialog = (id:any|null) => {
        if (!id) {
            setBarangayDataForm({})
            setIsOpenBarangayDialog(true);
            return;
        }
    }

    return (
        <>
            <div style={{height:'95%'}}>
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
                >
                    <div style={{height:'7%', paddingBottom:'1%'}}>
                        <div style={{width:'50%', float:'left'}}>
                            <Input 
                                style={{ height: '40px' }} 
                                placeholder="Type User's name ..."
                                onPressEnter={() => setPayload("")}
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
