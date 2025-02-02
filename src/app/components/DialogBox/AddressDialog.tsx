import { 
    useState,
    useCallback,
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
interface AddressForm {
    full_address : String | null,
    street_name: String | null,
    purok_name: String | null,
    barangay_name: String | null,
    city_name : String | null,
    id : number | null,
    created_by : number | null,
    city_id : number | null,
    street : number | null,
    purok_id : number | null,
    barangay_id : number | null,
    latitude : number | null,
    longitude : number | null,
    address_type : String | null
}

interface FormAddressData {

}

interface AddressDialogProps {
    isOpen: boolean,
    setIsOpen : Function,
    addressDataForm: any,
    setAddressDataForm: Function,
    setIsLoadingAddressData: Function,
    //refreshUserTable?: Function ,
}
const AddressDialog = (
    {
        isOpen, 
        setIsOpen, 
        addressDataForm, 
        setAddressDataForm,
        setIsLoadingAddressData,
        //refreshUserTable,
    }
    : AddressDialogProps
) => {
    const type = 'address';
    const {uuidv4} = useContext(AppContext)
    const dataTableContext = useContext(DatatableContext);
    const {accessToken} = useContext(LandmarksContext)
    const [form] = Form.useForm<AddressForm>()
    const landmarkService = new LandmarkService(accessToken);
    const {setIsRefreshDataTable} = dataTableContext
    const [pbarangaySearchName, setpBarangaySearchName] = useState<String>("");
    const [pPurokSearchName, setpPurokSearchName] = useState<String>("");
    const [pStreetSearchName, setpStreetSearchName] = useState<String>("");
    const [pbarangayID, setpBarangayID] = useState<any|null>(1);
    const [pPurokID, setpPurokID] = useState<any|null>(1);
    const [pStreetID, setpStreetID] = useState<any|null>(null);

    const [addressType , setAddressType] = useState<any|null> (null);

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const streetTypes = [
        {
            text : "Street Address",
            value : "street_address"
        },
        {
            text : "Home Address",
            value : "home_address"
        },
    ]

    const formAddressData : any = {
        full_address    : null,
        street          : pStreetID,
        address_type    : addressType,
        purok_id        : pPurokID,
        barangay_id     : pbarangayID,
        city_id         : null,
        created_by      : null,
        latitude        : null,
        longitude       : null,
    } 
      

    const submitForm = async (values: any) => {
        try {
            for (let i in values) {
                if (typeof formAddressData[i] !== 'undefined') {
                    if (! formAddressData[i] && ! (typeof values[i] == 'undefined')) {
                        formAddressData[i] = values[i]
                    }
                }
            }

            if (values.id) {
                await landmarkService.update(type, values.id, formAddressData)
                notification.success({
                    message: 'success',
                    description: 'Update address data success.',
                    placement: 'top',
                });
                return;
            } else {
                await landmarkService.create(type, formAddressData)
                notification.success({
                    message: 'success',
                    description: 'Added a new address.',
                    placement: 'top',
                });
            }
        } catch (e:any) {
            notification.error({
                message: 'Address failed. ',
                description: e?.response?.data?.error,
                placement: 'top',
            });
        } finally {
            setIsRefreshDataTable(true)
            setIsOpen(false)
        }
    }

    const handleChangeAddressType = useCallback ((value:string) => {
        setAddressType((prev:any) => value)
        if (value == "street_address") {
            setpStreetID(null);
            setpStreetSearchName("");
        }
    }, [])

    useEffect ( () => {
        if (isOpen) {
            if (addressDataForm.address_type) {
                setAddressType (addressDataForm.address_type)
            }
            if (addressDataForm.barangay_name) {
                setpBarangaySearchName (addressDataForm.barangay_name)
                setpBarangayID (addressDataForm.barangay_id)
            }
            if (addressDataForm.purok_name) {
                setpPurokSearchName (addressDataForm.purok_name)
            }
            if (addressDataForm.street_name) {
                setpStreetSearchName (addressDataForm.street_name)
            }
            form.setFieldsValue(addressDataForm)
        }
    }, [isOpen])
    

    return (
        <>
            <DialogBox
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalTitle={`Address Modal`}
                form={form}
                handleClose={()=>{
                    form.setFieldsValue({})
                    setAddressDataForm(null)
                }}
            >
                <Form 
                    form = {form}
                    onFinish={submitForm}
                    onValuesChange={()=>{}}
                    initialValues={()=>addressDataForm}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 16 }} 
                >
                    <Form.Item 
                        label="Address" 
                        name="full_address" 
                        key = "full_address"
                        rules={[{ required: true, message: 'Address name is required' }]}
                    >
                        <Input />
                        
                    </Form.Item>

                    <Form.Item 
                        label="Address Type" 
                        name="address_type" 
                        key = "address_type"
                        rules={[{ required: true, message: 'Address type is required' }]}
                    >
                        <Select placeholder="Select a designation" onChange={handleChangeAddressType}>
                            {streetTypes.map((option, index) => <Option key={index} value={option.value}>{option.text}</Option>)}
                        </Select>
                    </Form.Item>
                    { (addressType == "home_address") ?
                    <Form.Item 
                        label="Street" 
                        name="street_name" 
                        key = "street_name"
                    >
                        <WAutoComplete  
                            key={uuidv4()}
                            service={landmarkService}
                            functionName={'show'}
                            data={pStreetSearchName}
                            setData={(b:any) => {
                                setpStreetSearchName(b.label)
                                setpStreetID(b.item.id)
                            }}
                            payload={{
                                type : 'address',
                                payload : {
                                    full_address : '',
                                    city_id : 1,
                                    address_type: 'street_address',
                                    purok_id : pPurokID,
                                    barangay_id : pbarangayID
                                },
                                page: 1,
                            }}
                            wAutoCompleteIndexPayload={'full_address'}
                            wAutoCompleteIndexRsLabel={'full_address'}
                            style={{width:'100%', height:'130%'}}
                            placeholder={'Enter street name ...'}
                        />
                    </Form.Item>
                    : ''}
                    <Form.Item 
                        label = "Purok" 
                        name  = "purok_name" 
                        key   = "purok_name"
                    >
                        <WAutoComplete  
                            key={uuidv4()}
                            service={landmarkService}
                            functionName={'show'}
                            data={pPurokSearchName}
                            setData={(b:any) => {
                                setpPurokSearchName(b.label)
                                setpPurokID(b.item.id)
                            }}
                            payload={{
                                type : 'purok',
                                payload : {
                                    barangay_name : '',
                                    city_id : 1,
                                    barangay_id : pbarangayID
                                },
                                page: 1,
                            }}
                            wAutoCompleteIndexPayload={'purok_name'}
                            wAutoCompleteIndexRsLabel={'purok_name'}
                            style={{width:'100%', height:'130%'}}
                            placeholder={'Enter purok name ...'}
                        />
                    </Form.Item>

                    <Form.Item 
                        label="Barangay" 
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
                    

                    <Form.Item 
                        style={{ display: 'none' }} 
                        name="street"
                        key="street"
                    >
                        <Input type="hidden" />
                    </Form.Item>
                    

                    <Form.Item 
                        style={{ display: 'none' }} 
                        name="purok_id"
                        key="purok_id"
                    >
                        <Input type="hidden" />
                    </Form.Item>
                </Form>
            </DialogBox>
        </>
    )
}
export default AddressDialog;