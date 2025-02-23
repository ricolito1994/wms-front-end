import React, { 
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
import { LandmarksContext } from 'context/LandmarksContext';
import LandmarkService from 'services/LandmarkService';
import WAutoComplete from 'app/components/WAutoComplete';
import DialogBox from './';

const PlacesDialog: React.FC<any> = (
    {
        isOpen, 
        setIsOpen, 
        placesDataForm,
        setCoordinatesData,
    }
    : any
): React.ReactElement => {

    const { Option } = Select;

    const placeType = [
        {
            value : "address",
            text : "Address"
        },{
            value : "purok",
            text : "Purok"
        },{
            value : "barangay",
            text : "Barangay"
        },
    ]

    const [form] = Form.useForm<any>()
    const {uuidv4, accessToken} = useContext(AppContext)
    const landmarkService = new LandmarkService(accessToken);
    const [addressType, setAddressType] = useState<any>("");

    const [pbarangaySearchName, setpBarangaySearchName] = useState<String>("");
    const [pPurokSearchName, setpPurokSearchName] = useState<String>("");
    const [pAddressSearchName, setpAddressSearchName] = useState<String>("");

    const [pbarangayID, setpBarangayID] = useState<any|null>(null);
    const [pPurokID, setpPurokID] = useState<any|null>(null);
    const [pAddressID, setpAddressID] = useState<any|null>(null);

    const [formPlacesObjects , setFormPlacesObjects] = useState<any|null> ({
        'latitude'  : '',
        'longitude' : '',
        'id'        : '',
    });

    const submitForm = useCallback(async (values : any) => {
        let coordinatesData : any | null = null;
        try {
            let id = formPlacesObjects.id.split('-')
            let updated = await landmarkService.update(
                values.address_type,
                id[1], 
                formPlacesObjects
            );
            let placeName:any = {
                'address'    : 'full_address',
                'purok'      : 'purok_name',
                'barangay'   : 'barangay_name',
            }
            formPlacesObjects['address_type'] = values.address_type
            formPlacesObjects['place_name'] = updated?.data[placeName[values.address_type]];
            coordinatesData = formPlacesObjects;
            notification.success({
                message: 'success',
                description: 'Update address data success.',
                placement: 'top',
            });
        } catch (e) {
            notification.error({
                message: 'Address failed. ',
                description: "failed",
                placement: 'top',
            });
        } finally {
            setCoordinatesData(coordinatesData)
            setIsOpen(false);
        }
    }, [formPlacesObjects]);

    const handleSelectAddressTypeChange = useCallback((placeType :any) => {
        setAddressType(placeType)
    }, [])

    useEffect (() => {
        let abort: any = null;
        let id : any = null;
        if (isOpen) {
            if (placesDataForm.address_type) {
                setAddressType (placesDataForm.address_type)
            }
            if (placesDataForm.barangay_name) {
                setpBarangaySearchName (placesDataForm.barangay_name)
                setpBarangayID (placesDataForm.barangay_id)
                id = `barangay-${placesDataForm.barangay_id}`
            }
            if (placesDataForm.purok_name) {
                setpPurokSearchName (placesDataForm.purok_name)
                setpPurokID(placesDataForm.purok_id)
                id = `purok-${placesDataForm.purok_id}`
            }
            if (placesDataForm.address_name) {
                setpAddressSearchName (placesDataForm.address_name)
                setpAddressID(placesDataForm.address_id)
                id = `address-${placesDataForm.address_id}`
            }
            form.setFieldsValue(placesDataForm)

            setFormPlacesObjects((prev:any) => ({...prev,
                id        : id,
                longitude : placesDataForm.longitude,
                latitude  : placesDataForm.latitude
            }))

            if (! landmarkService.abortControllerSignal) {
                abort = new AbortController();
                landmarkService.setAbortControllerSignal(abort.signal)
            }
        } else {
            onClosePlacesModal();
        }
        return () => {
            if (abort) {
                abort?.abort();
            }
        }
    }, [isOpen])

    const onClosePlacesModal = (): void => {
        form.setFieldsValue({})
        setpBarangaySearchName("")
        setpAddressSearchName("")
        setpPurokSearchName("")
        setpAddressID(null)
        setpBarangayID(null)
        setpPurokID(null)
    }

    return (
    <>
        <DialogBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalTitle={`Places Modal`}
            form={form}
            handleClose={onClosePlacesModal}
        >
            <Form 
                form = {form}
                onFinish={submitForm}
                onValuesChange={()=>{}}
                initialValues={()=>placesDataForm}
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 16 }} 
            >
                <Form.Item 
                    label="Address Type" 
                    name="address_type" 
                    key = "address_type"
                >
                    <Select placeholder="Select a designation" onChange={handleSelectAddressTypeChange}>
                        {placeType.map((option, index) => <Option key={index} value={option.value + ""}>{option.text}</Option>)}
                    </Select>
                </Form.Item>
                { addressType == "purok" ?
                <Form.Item label="Purok">
                    <WAutoComplete  
                        key={uuidv4()}
                        service={landmarkService}
                        functionName={'show'}
                        data={pPurokSearchName}
                        setData={(b:any) => {
                            setpPurokSearchName(b.label)
                            setpPurokID(b.item.id)
                            setFormPlacesObjects((prev:any) => ({...prev,
                                id : `purok-${b.item.id}`
                            }))
                        }}
                        payload={{
                            type : 'purok',
                            payload : {
                                barangay_name : '',
                                city_id : 1,
                            },
                            page: 1,
                        }}
                        wAutoCompleteIndexPayload={'purok_name'}
                        wAutoCompleteIndexRsLabel={'purok_name'}
                        style={{width:'100%', height:'130%'}}
                        placeholder={'Enter purok name ...'}
                    />
                </Form.Item>
                : addressType == 'barangay' ? 
                <Form.Item label="Barangay">
                    <WAutoComplete  
                        key={uuidv4()}
                        service={landmarkService}
                        functionName={'show'}
                        data={pbarangaySearchName}
                        setData={(b:any) => {
                            setpBarangaySearchName(b.label)
                            setpBarangayID(b.item.id)
                            setFormPlacesObjects((prev:any) => ({...prev,
                                id : `barangay-${b.item.id}`
                            }))
                        }}
                        payload={{
                            type : 'barangay',
                            payload : {
                                barangay_name : '',
                                city_id : 1,
                            },
                            page: 1,
                        }}
                        wAutoCompleteIndexPayload={'barangay_name'}
                        wAutoCompleteIndexRsLabel={'barangay_name'}
                        style={{width:'100%', height:'130%'}}
                        placeholder={'Enter barangay name ...'}
                    />
                </Form.Item>
                : addressType == "address" ? 
                <Form.Item label="Address">
                <WAutoComplete  
                    key={uuidv4()}
                    service={landmarkService}
                    functionName={'show'}
                    data={pAddressSearchName}
                    setData={(b:any) => {
                        setpAddressSearchName(b.label)
                        setpAddressID(b.item.id)
                        setFormPlacesObjects((prev:any) => ({...prev,
                            id : `address-${b.item.id}`
                        }))
                    }}
                    payload={{
                        type : 'address',
                        payload : {
                            barangay_name : '',
                            city_id : 1,
                        },
                        page: 1,
                    }}
                    wAutoCompleteIndexPayload={'full_address'}
                    wAutoCompleteIndexRsLabel={'full_address'}
                    style={{width:'100%', height:'130%'}}
                    placeholder={'Enter address name ...'}
                />
                </Form.Item> : ''
                }
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

            </Form>
        </DialogBox>
    </>
    )
}

export default PlacesDialog;