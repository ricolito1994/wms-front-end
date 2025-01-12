import { 
    useState,
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
import { AppContext } from "context";
import { DatatableContext } from "context/DataTableContext";
import { LandmarksContext } from 'context/LandmarksContext';
import LandmarkService from 'services/LandmarkService';
import WAutoComplete from 'app/components/WAutoComplete';
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
    purokDataForm: any,
    setPurokDataForm: Function,
    setIsLoadingBarangayData: Function,
    //refreshUserTable?: Function ,
}
const PurokDialog = (
    {
        isOpen, 
        setIsOpen, 
        purokDataForm, 
        setPurokDataForm,
        setIsLoadingBarangayData,
        //refreshUserTable,
    }
    : UnitDialogProps
) => {
    const type = 'purok';
    const {uuidv4} = useContext(AppContext)
    const dataTableContext = useContext(DatatableContext);
    const {accessToken} = useContext(LandmarksContext)
    const [form] = Form.useForm<UserForm>()
    const landmarkService = new LandmarkService(accessToken);
    const {setIsRefreshDataTable} = dataTableContext
    const [pbarangaySearchName, setpBarangaySearchName] = useState<boolean>(false);
    const [pbarangayID, setpBarangayID] = useState<any|null>(null);
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
      

    const submitForm = async (values: any) => {
        try {
            const { ['city_name']: a, ...updatedValues } = values;
            const { ['barangay_name']: ab, ...updatedValues1 } = updatedValues;
            
            if (pbarangayID) {
                updatedValues1['barangay_id'] = pbarangayID;
            } else {
                notification.error({
                    message: 'Barangay is required ',
                    placement: 'top',
                });
                return ;
            }
   
            setIsLoadingBarangayData(true)
            if (updatedValues1?.id) {
                await landmarkService.update(type, updatedValues1.id, updatedValues1)
                setIsRefreshDataTable(true)
                setIsOpen(false)
                notification.success({
                    message: 'success',
                    description: 'Update purok data success.',
                    placement: 'top',
                });
                return;
            }
            const { ['id']: b, ...rest } = updatedValues1;
            await landmarkService.create(type, rest)
            setIsOpen(false)
            setIsRefreshDataTable(true)
            notification.success({
                message: 'success',
                description: 'Added a new purok',
                placement: 'top',
            });
        } catch (e:any) {
            notification.error({
                message: 'purok failed. ',
                description: e?.response?.data?.error,
                placement: 'top',
            });
        } finally {

        }
    }
    useEffect ( () => {
        if (isOpen) {
            if (purokDataForm.barangay_name) {
                setpBarangaySearchName(purokDataForm.barangay_name)
            }
            if (purokDataForm.barangay_id) {
                setpBarangayID(purokDataForm.barangay_id)
            }
            form.setFieldsValue(purokDataForm)
        }
    }, [isOpen])

    return (
        <>
            <DialogBox
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalTitle={`Purok Modal`}
                form={form}
                handleClose={()=>{
                    form.setFieldsValue({})
                    setPurokDataForm(null)
                }}
            >
                <Form 
                    form = {form}
                    onFinish={submitForm}
                    onValuesChange={()=>{}}
                    initialValues={()=>purokDataForm}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 16 }} 
                >
                    <Form.Item 
                        label="Purok Name" 
                        name="purok_name" 
                        key = "purok_name"
                        rules={[{ required: true, message: 'Purok name is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        label="Barangay Name" 
                        name="barangay_name" 
                        key = "barangay_name"
                    >
                        <WAutoComplete  
                            key={uuidv4()}
                            service={landmarkService}
                            functionName={'show'}
                            data={pbarangaySearchName}
                            setData={(b:any) => {
                                setpBarangaySearchName(b.label)
                                setpBarangayID(b.item.id)
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
                            style={{width:'100%', height:'130%'}}
                            placeholder={'Enter barangay name ...'}
                        />
                    </Form.Item>

                    <Form.Item 
                        label="City Name" 
                        key = "city_name"
                        name = "city_name"
                    >
                        <Input disabled />
                    </Form.Item> 

                    <Form.Item 
                        label="Longitude" 
                        name="longitude" 
                        key = "longitude"
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item 
                        label="Latitude" 
                        name="latitude" 
                        key = "latitude"
                    >
                        <Input disabled />
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

                    <Form.Item 
                        style={{ display: 'none' }} 
                        name="barangay_id"
                        key="barangay_id"
                    >
                        <Input type="hidden" />
                    </Form.Item>
                </Form>
            </DialogBox>
        </>
    )
}
export default PurokDialog;