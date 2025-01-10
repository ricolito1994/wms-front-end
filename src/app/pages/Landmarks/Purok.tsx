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
import { LandmarksContext } from "context/LandmarksContext";
import DataTableV2 from "app/components/DataTableV2";
import LandmarkService from "services/LandmarkService";
const Purok = () => {

    const userColumnData = [
        {
            title : "Purok Name",
            dataIndex: 'fullname',
            key: 'fullname',
            sorter: (a:any, b:any) => a.fullname.localeCompare(b.fullname),
        },
        {
            title : "Barangay",
            dataIndex: 'barangay',
            key: 'barangay',
            sorter: (a:any, b:any) => a.address.localeCompare(b.address),
        },
        {
            title : "Actions",
            key: 'action',
            render: (text: any, user: any) => (
                <span>
                  <Button type="primary" onClick={() => openPurokDialog(user.id)}>Edit</Button>&nbsp;
                </span>
            ),
        },
    ]
    
    const {accessToken} = useContext(LandmarksContext)
    const landmarkService = new LandmarkService (accessToken)
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [payload, setPayload] = useState<any>({});
    const [purokName, setPurokName] = useState<any>('');

    useEffect(() => {
        
    }, [])

    const openPurokDialog = (param:any|null) => {}

    return (
        <>
            <div style={{height:'95%'}}>
                { isLoading ?
                <div className="overlay-form-loading">
                    <div className="loader"></div>
                </div> : '' }
                <DataTableV2
                    columnData={userColumnData}
                    getDataService={landmarkService}
                    getDataMethodName={'getUser'}
                    payload={payload}
                >
                    <div style={{height:'7%', paddingBottom:'1%'}}>
                        <div style={{width:'50%', float:'left'}}>
                            <Input 
                                style={{ height: '40px' }} 
                                placeholder="Type Purok name ..."
                                onPressEnter={() => setPayload((prev:any) => ({ ...prev , purok_name: purokName }))}
                                onChange={(e)=>setPurokName(e.target.value)}
                            />
                        </div>
                        
                        <div style={{width:'20%', float:'left', paddingLeft:'0.5%'}}>
                            <Button onClick={()=>{openPurokDialog(null)}} type="default" style={{ height: '40px', width:'100%' }}>
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

export default Purok;