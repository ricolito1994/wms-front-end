import React, { 
    useContext, 
    useEffect, 
    useState ,
    useCallback
} from "react";
import { 
    GoogleMap, 
    LoadScript, 
    Marker 
} from "@react-google-maps/api";
import PlacesDialog from "app/components/DialogBox/PlacesDialog";
import { LandmarksContext } from "context/LandmarksContext";
import LandmarkService from "services/LandmarkService";
import { Modal } from 'antd';

const DashboardLandmarkMaps = () => {
    const API_KEY: any = process.env.REACT_APP_GOOGLE_API_KEY
    const LAT: any = process.env.REACT_APP_DEFAULT_LT
    const LNG: any = process.env.REACT_APP_DEFAULT_LG
    const {accessToken} = useContext(LandmarksContext)
    const landmarkService = new LandmarkService(accessToken);
    const [places, setPlaces] = useState<any>([])
    const [isOpenPlacesDialog, setIsOpenPlacesDialog] = useState<any>(false)
    const [placesDataForm, setPlacesDataForm] = useState<any>({
        address_type : "address"
    })
    const [coordinatesData, setCoordinatesData] = useState<any|null>(null)
    const defaultProps = {
        center: {
            lat: 10.53846,
            lng: 122.83512
        },
        zoom: 17,
        options : {
            //zoomControl: false, 
            //gestureHandling: "none", 
            //disableDoubleClickZoom: true, 
            //gestureHandling: "none", 
            scrollwheel: true, 
            disableDoubleClickZoom: true, 
            zoomControl: true, 
        }
    };

    useEffect(() => {
        if (coordinatesData) {
            setPlaces((prev:any) => [...prev, coordinatesData])
            setCoordinatesData(null)
        }
    }, [isOpenPlacesDialog, coordinatesData])

    useEffect(() => {
        
    }, [places])

    const handleMapClick = useCallback ((e :google.maps.MapMouseEvent) => {
        const lat = e?.latLng?.lat();
        const lng = e?.latLng?.lng();

        Modal.confirm({
            title: 'Do you want to add a location ?',
            content: `Latitude: ${lat}, Longitude: ${lng}`,
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                setIsOpenPlacesDialog(true)
                setPlacesDataForm((prev:any) => ({...prev, latitude: lat, longitude: lng}))
            },
            onCancel() {
                
            },
        });
    }, [] );

    return (
        <>
            <PlacesDialog 
                isOpen={isOpenPlacesDialog}
                setIsOpen={setIsOpenPlacesDialog}
                placesDataForm={placesDataForm}
                setCoordinatesData={setCoordinatesData}
            />
            <LoadScript googleMapsApiKey={API_KEY}>
                <GoogleMap 
                    mapContainerStyle={{height:'100%', width:'100%'}} 
                    center={defaultProps.center} 
                    zoom={12}
                    onRightClick={handleMapClick}
                >
                    <Marker position={defaultProps.center} />
                    {places.map((marker:any, index : any) => (
                        <Marker key={index} position={{ lat: marker.latitude, lng: marker.longitude }} />
                    ))}
                </GoogleMap>
            </LoadScript>
        </>
    )
}

export default DashboardLandmarkMaps;