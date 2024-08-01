import { 
    useEffect, 
    useContext 
} from 'react';
import { HRContext } from 'context/HRContext';
import { 
    Form, 
    Input, 
    Select, 
    Checkbox, 
    notification /*, Button, Row, Col*/
} from 'antd';
import { DatatableContext } from "context/DataTableContext";
import UserService from 'services/UserService';
import DialogBox from './';

const { Option } = Select;
interface UserForm {
    firstname: String,
    lastname : String,
    middlename : String | null,
    designation : String,
    position : String,
    is_active : any,
    id : number | null,
}

interface UnitDialogProps {
    isOpen: boolean,
    setIsOpen : Function,
    userDataForm: any,
    setUserDataForm: Function,
    setIsLoadingUserData: Function,
    //refreshUserTable?: Function ,
}
const UserDialog = (
    {
        isOpen, 
        setIsOpen, 
        userDataForm, 
        setUserDataForm,
        setIsLoadingUserData,
        //refreshUserTable,
    }
    : UnitDialogProps
) => {
    const dataTableContext = useContext(DatatableContext);
    const {accessToken} = useContext(HRContext)
    const [form] = Form.useForm<UserForm>()
    const userService = new UserService(accessToken);
    const {setIsRefreshDataTable} = dataTableContext
    const POSITION = [
        'CENRO OFFICER',
        'DUMP TRUCK DRIVER',
        'TEAM LEAD',
        'CREW'
    ]

    const DESIGNATION = [
        'admin',
        'crew',
    ]

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
      

    const submitForm = async (values: UserForm) => {
        try {
            setIsLoadingUserData(true)
            if (values?.id) {
                let result = await userService.updateUser(values.id, values)
                setUserDataForm(result.data)
                setIsRefreshDataTable(true)
                form.setFieldsValue(result.data)
                notification.success({
                    message: 'success',
                    description: 'Update employee success.',
                    placement: 'top',
                });
                return;
            }
            let result = await userService.addUser(values)
            setUserDataForm(result.data)
            /*refreshUserTable.getUnitFunction(
                refreshUserTable.params.searchOptionParam, 
                refreshUserTable.params.page
            );*/
            // if (refreshUserTable) {refreshUserTable()}
            setIsRefreshDataTable(true)
            form.setFieldsValue(result.data)
            notification.success({
                message: 'success',
                description: 'Added a new employee',
                placement: 'top',
            });
        } catch (e:any) {
            notification.error({
                message: 'User add failed.',
                description: e?.response?.data?.error,
                placement: 'top',
            });
        } finally {

        }
    }
    useEffect ( () => {
        if (isOpen) {
            form.setFieldsValue(userDataForm)
        }
    }, [isOpen])
    return (
        <>
            <DialogBox
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalTitle={`Employee`}
                form={form}
                handleClose={()=>{
                    form.setFieldsValue({})
                    setUserDataForm(null)
                }}
            >
                <Form 
                    form = {form}
                    onFinish={submitForm}
                    onValuesChange={()=>{}}
                    initialValues={()=>userDataForm}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 16 }} 
                >
                    <Form.Item 
                        label="Firstname" 
                        name="firstname" 
                        key = "firstname"
                        rules={[{ required: true, message: 'Firstname is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Lastname" 
                        name="lastname" 
                        key = "lastname"
                        rules={[{ required: true, message: 'Lastname is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        label="Middlename" 
                        name="middlename" 
                        key = "middlename"
                        //rules={[{ required: true, message: 'Middlename is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="designation"
                        label="designation"
                        rules={[{ required: true, message: 'Please select your designation!' }]}
                    >
                        <Select placeholder="Select a designation">
                            {DESIGNATION.map((option, index) => <Option key={index} value={option}>{option}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="position"
                        label="position"
                        rules={[{ required: true, message: 'Please select your position!' }]}
                    >
                        <Select placeholder="Select a position">
                            {POSITION.map((option, index) => <Option  key={index} value={option}>{option}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item {...tailLayout} name="is_active" valuePropName="checked">
                        <Checkbox>Is Active Employee</Checkbox>
                    </Form.Item>
                    
                    <Form.Item 
                        style={{ display: 'none' }} 
                        name="id"
                        key = "id"
                    >
                        <Input type="hidden" />
                    </Form.Item>
                </Form>
            </DialogBox>
        </>
    )
}

export default UserDialog;