import React, {
    useEffect,
    useContext,
    useState,
} from 'react';

import { 
    Form, 
    Input, 
    notification, 
    Spin 
} from 'antd';

import DialogBox from '.';

import { UnitRouteTemplateService } from '@/services/UnitRouteTemplateService';

import { AppContext } from '@/context';

interface SaveRouteDialogComponentInterface {
    isOpen?: boolean,
    setIsOpen: Function,
    saveParams?: any,
    clearData?: Function,
}

const SaveRouteDialogComponent: React.FC<SaveRouteDialogComponentInterface> = ({
    isOpen = false,
    setIsOpen = () => {},
    saveParams,
    clearData,
}) : React.ReactElement => {
    const [form] = Form.useForm<any>();
    const { 
        accessToken ,
        userData
    } = useContext(AppContext)
    const unitRouteService = new UnitRouteTemplateService(accessToken)
    const { TextArea } = Input;

    const submitForm = async (e: any) => {
        try {
            const newWaypoints = saveParams?.waypoints?.map((wp:any) => {
                const { lat, lng } = wp.location;
                return { lat, lng };
            });

            e = {
                ...e , 
                locations: newWaypoints,
                created_by : userData.id,
                ...(!e.is_active ? {is_active : true} : {})
            }
            
            const abortController = new AbortController;
            const abortSignal = abortController.signal;
            unitRouteService.setAbortControllerSignal(abortSignal)
            await unitRouteService.store(e);

            if(clearData && clearData instanceof Function) 
                clearData();

            notification.success({
                message: 'success',
                description: 'Route saved.',
                placement: 'top',
            });
            
        } catch (e:any) {
            notification.error({
                message: 'failed',
                description: 'Failed, something went wrong.',
                placement: 'top',
            });
        }
    }

    return (
        <DialogBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalTitle={`Save route template`}
            form={form}
            handleClose={()=>{
                
            }}
        >
            <Form 
                form = {form}
                onFinish={submitForm}
                onValuesChange={()=>{}}
                initialValues={()=>{}}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 25 }} 
            >
                <Form.Item 
                    label="Route name" 
                    name="route_template_name" 
                    key = "route_template_name"
                    rules={[{ required: true, message: 'Route name is required' }]}
                >
                    <Input placeholder='route name' />
                </Form.Item>

                <Form.Item 
                    label="Description" 
                    name="description" 
                    key = "description"
                >
                    <TextArea 
                        placeholder='route description'
                        rows={5}
                        maxLength={200}
                        showCount
                    />
                </Form.Item>
            </Form>
        </DialogBox>
    )
}

export default React.memo(SaveRouteDialogComponent)