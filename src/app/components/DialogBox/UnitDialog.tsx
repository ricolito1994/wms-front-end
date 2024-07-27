import { useEffect, useContext } from 'react';
import { UnitContext } from 'context/UnitContext';
import { UnitService } from 'services/UnitService';
import { Form, Input /*, Button, Row, Col*/ } from 'antd';
import DialogBox from './';
interface UnitForm {
    model_name: String,
    plate_number : String,
    chassis_number : String,
    gross_weight : Number,
}
interface RefreshUnitTable {
    getUnitFunction : any,
    params: any,
}
interface UnitDialogProps {
    isOpen: boolean,
    setIsOpen : Function,
    unitDataForm: any,
    setUnitDataForm: Function,
    setIsLoadingUnitData: Function,
    refreshUnitTable: RefreshUnitTable,
}
const UnitDialog = (
    {
        isOpen, 
        setIsOpen, 
        unitDataForm, 
        setUnitDataForm,
        setIsLoadingUnitData,
        refreshUnitTable,
    }
    : UnitDialogProps
) => {
    const {accessToken} = useContext(UnitContext)
    const [form] = Form.useForm<UnitForm>()
    const unitService = new UnitService(accessToken);
    const submitForm = async (values: UnitForm) => {
        try {
            setIsLoadingUnitData(true)
            let result = await unitService.addUnit(values)
            setUnitDataForm(result.data)
            refreshUnitTable.getUnitFunction(
                refreshUnitTable.params.searchOptionParam, 
                refreshUnitTable.params.page
            );
        } catch (e) {
            console.log(e)
        }
    }
    useEffect ( () => {
        if (isOpen) {
            form.setFieldsValue(unitDataForm)
        }
    }, [isOpen])
    return (
        <>
            <DialogBox
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalTitle={`UNIT`}
                form={form}
                handleClose={()=>{
                    form.setFieldsValue({})
                    setUnitDataForm(null)
                }}
            >
                <Form 
                    form = {form}
                    onFinish={submitForm}
                    onValuesChange={()=>{}}
                    initialValues={()=>unitDataForm}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 16 }} 
                >
                    <Form.Item 
                        label="Model" 
                        name="model_name" 
                        key = "model_name"
                        rules={[{ required: true, message: 'Model is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Plate Number" 
                        name="plate_number" 
                        key = "plate_number"
                        rules={[{ required: true, message: 'Plate Number is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Chassis Number" 
                        name="chassis_number" 
                        key = "chassis_number"
                        rules={[{ required: true, message: 'Chassis Number is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Gross Weight" 
                        name="gross_weight" 
                        key = "gross_weight"
                        rules={[{ required: true, message: 'Gross Weight is required' }]}
                    >
                        <Input />
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

export default UnitDialog;