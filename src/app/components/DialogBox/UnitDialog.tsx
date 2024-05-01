import React, { useEffect, useContext } from 'react';
import { UnitContext } from 'context/UnitContext';
import { UnitService } from 'services/UnitService';
import { Form, Input /*, Button, Row, Col*/ } from 'antd';
import DialogBox from './';
interface UnitForm {
    model : String,
    plate_number : String,
    chassis_number : String,
    gross_weight : Number,
}
interface UnitDialogProps {
    isOpen: boolean,
    setIsOpen : Function,
    unitDataForm: any,
}
const UnitDialog = ({isOpen, setIsOpen, unitDataForm}: UnitDialogProps) => {
    const {accessToken} = useContext(UnitContext)
    const [form] = Form.useForm<UnitForm>()
    const unitService = new UnitService(accessToken);
    const submitForm = async (values: UnitForm) => {
        try {
            await unitService.addUnit(values)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect ( () => {
        
    }, [unitDataForm])
    return (
        <>
            <DialogBox
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalTitle={`UNIT`}
                form={form}
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
                        rules={[{ required: true, message: 'Model is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Plate Number" 
                        name="plate_number" 
                        rules={[{ required: true, message: 'Plate Number is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Chassis Number" 
                        name="chassis_number" 
                        rules={[{ required: true, message: 'Chassis Number is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Gross Weight" 
                        name="gross_weight" 
                        rules={[{ required: true, message: 'Gross Weight is required' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </DialogBox>
        </>
    )
}

export default UnitDialog;