import { 
    useEffect, 
    useContext 
} from 'react';
import { 
    Form, 
    Input, 
    Select, 
    Checkbox, 
    notification /*, Button, Row, Col*/
} from 'antd';
import { DatatableContext } from "context/DataTableContext";
import { LandmarksContext } from 'context/LandmarksContext';
import LandmarkService from 'services/LandmarkService';
import DialogBox from './';

const { Option } = Select;
interface UserForm {
    barangay_name: String,
    id : number | null,
    created_by : number | null,
    city_id : number | null,
    city_name : String,
}

interface UnitDialogProps {
    isOpen: boolean,
    setIsOpen : Function,
    barangayDataForm: any,
    setBarangayDataForm: Function,
    setIsLoadingBarangayData: Function,
    //refreshUserTable?: Function ,
}
const BarangayDialog = (
    {
        isOpen, 
        setIsOpen, 
        barangayDataForm, 
        setBarangayDataForm,
        setIsLoadingBarangayData,
        //refreshUserTable,
    }
    : UnitDialogProps
) => {
    const type = 'barangay';
    const dataTableContext = useContext(DatatableContext);
    const {accessToken} = useContext(LandmarksContext)
    const [form] = Form.useForm<UserForm>()
    const landmarkService = new LandmarkService(accessToken);
    const {setIsRefreshDataTable} = dataTableContext

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
      

    const submitForm = async (values: UserForm) => {
        try {
            setIsLoadingBarangayData(true)
            if (values?.id) {
                let result = await landmarkService.update(type, values.id, values)
                setBarangayDataForm(result.data)
                setIsRefreshDataTable(true)
                form.setFieldsValue(result.data)
                notification.success({
                    message: 'success',
                    description: 'Update barangay data success.',
                    placement: 'top',
                });
                return;
            }
            let result = await landmarkService.create(type, values)
            setBarangayDataForm(result.data)
            /*refreshUserTable.getUnitFunction(
                refreshUserTable.params.searchOptionParam, 
                refreshUserTable.params.page
            );*/
            // if (refreshUserTable) {refreshUserTable()}
            setIsRefreshDataTable(true)
            form.setFieldsValue(result.data)
            notification.success({
                message: 'success',
                description: 'Added a new barangay',
                placement: 'top',
            });
        } catch (e:any) {
            notification.error({
                message: 'Barangay add failed.',
                description: e?.response?.data?.error,
                placement: 'top',
            });
        } finally {

        }
    }
    useEffect ( () => {
        if (isOpen) {console.log(barangayDataForm)
            form.setFieldsValue(barangayDataForm)
        }
    }, [isOpen])
    return (
        <>
            <DialogBox
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalTitle={`Barangay Modal`}
                form={form}
                handleClose={()=>{
                    form.setFieldsValue({})
                    setBarangayDataForm(null)
                }}
            >
                <Form 
                    form = {form}
                    onFinish={submitForm}
                    onValuesChange={()=>{}}
                    initialValues={()=>barangayDataForm}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 16 }} 
                >
                    <Form.Item 
                        label="Barangay Name" 
                        name="barangay_name" 
                        key = "barangay_name"
                        rules={[{ required: true, message: 'Barangay name is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        label="City Name" 
                        key = "city_name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        style={{ display: 'none' }} 
                        name="city_id"
                        key = "city_id"
                    >
                        <Input type="hidden" />
                    </Form.Item>

                    <Form.Item 
                        style={{ display: 'none' }} 
                        name="created_by"
                        key = "created_by"
                    >
                        <Input type="hidden" />
                    </Form.Item>
                    
                    <Form.Item 
                        style={{ display: 'none' }} 
                        name="id"
                        key="id"
                    >
                        <Input type="hidden" />
                    </Form.Item>
                </Form>
            </DialogBox>
        </>
    )
}

export default BarangayDialog;