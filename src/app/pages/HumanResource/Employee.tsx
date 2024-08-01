import { 
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
import { DownOutlined, PlusOutlined /*CloseOutlined*/ } from '@ant-design/icons';
import { HRContext } from "context/HRContext";
import UserDialog from "app/components/DialogBox/UserDialog";
import DataTableV2 from "app/components/DataTableV2";
import UserService from "services/UserService";
import {DatatableContext}from 'context/DataTableContext';

interface UserModel {
    id? : Number | null,
    firstname: String,
    lastname : String,
    middlename : String | null,
    position : String,
    designation : String,
    is_active : any,
}


interface SearchEmployeePayload {
    users_name : string|null,
}

const Employee = () => {

    const defaultUserValues: UserModel = {
        id: null,
        firstname: '',
        lastname: '',
        middlename : null,
        position : '',
        designation : '',
        is_active : true,
    }

    const defaultEmployeeSearchPayload = {
        users_name : "",
    }

    const userColumnData = [
        {
            title : "Fullname",
            dataIndex: 'fullname',
            key: 'fullname',
            sorter: (a:any, b:any) => a.fullname.localeCompare(b.fullname),
        },
        {
            title : "Address",
            dataIndex: 'address',
            key: 'address',
            sorter: (a:any, b:any) => a.address.localeCompare(b.address),
        },
        {
            title : "Position",
            dataIndex: 'position',
            key: 'position',
            sorter: (a:any, b:any) => a.position.localeCompare(b.position),
        },
        {
            title : "Designation",
            dataIndex: 'designation',
            key: 'designation',
            sorter: (a:any, b:any) => a.designation.localeCompare(b.designation),
        },
        {
            title : "Actions",
            key: 'action',
            render: (text: any, user: any) => (
                <span>
                  <Button type="primary" onClick={() => openUserDialog(user.id)}>Edit</Button>&nbsp;
                </span>
            ),
        },
    ]
    const {accessToken} = useContext(HRContext)
    const {isRefreshDataTable} = useContext(DatatableContext)
    const userService = new UserService(accessToken)
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [isUserDialogOpen, setIsUserDialogOpen] = useState<boolean>(false);
    const [userDialogForm, setUserDialogForm] = useState<UserModel>(defaultUserValues);
    const [payload, setPayload] = useState<SearchEmployeePayload>(defaultEmployeeSearchPayload);
    const [usersName, setUsersName] = useState<string>('');
    

    const openUserDialog = (userID : any|null = null) => {
        if (!userID) {
            setIsUserDialogOpen(true);
            setUserDialogForm(defaultUserValues)
            return;
        }
        getEmployeeData(userID);
    }

    const getEmployeeData = async (userId:any|null = null) => {
        if(!isLoading) setIsloading(true)
            
        try {
            //if (signal) userService.setAbortControllerSignal(signal);
            let response = await userService.getUser(null, null, userId)
            setUserDialogForm(response.data)  
            setIsUserDialogOpen(true)
        } catch (e) {
            console.log(e);
            
        } finally {
            setIsloading(false)
        }
    }

    useEffect(() => {
        //const controller = new AbortController();
        //const signal = controller.signal;
        //getEmployeeData(signal)
        return () => {
            //controller.abort();
        }
    }, [])

    return (
        <>
            <div>
                { isLoading ?
                <div className="overlay-form-loading">
                    <div className="loader"></div>
                </div> : '' }
                <UserDialog 
                    isOpen={isUserDialogOpen}
                    setIsOpen={setIsUserDialogOpen}
                    userDataForm={userDialogForm}
                    setUserDataForm={setUserDialogForm}
                    setIsLoadingUserData={()=>{}}
                />
                <DataTableV2
                    columnData={userColumnData}
                    getDataService={userService}
                    getDataMethodName={'getUser'}
                    payload={payload}
                >
                    <div style={{height:'10%', paddingBottom:'1%'}}>
                        <div style={{width:'50%', float:'left'}}>
                            <Input 
                                style={{ height: '40px' }} 
                                placeholder="Type User's name ..."
                                onPressEnter={() => setPayload(prev => ({ ...prev , users_name: usersName }))}
                                onChange={(e)=>setUsersName(e.target.value)}
                            />
                        </div>
                        
                        <div style={{width:'20%', float:'left', paddingLeft:'0.5%'}}>
                            <Button onClick={()=>{openUserDialog(null)}} type="default" style={{ height: '40px', width:'100%' }}>
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

export default Employee;