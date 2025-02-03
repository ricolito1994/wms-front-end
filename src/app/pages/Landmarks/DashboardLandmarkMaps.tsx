import React, { 
    useContext, 
    useEffect, 
    useState ,
    useCallback
} from "react";
import GoogleMapReact from 'google-map-react';
import PlacesDialog from "app/components/DialogBox/PlacesDialog";
import { LandmarksContext } from "context/LandmarksContext";
import LandmarkService from "services/LandmarkService";
import { Modal } from 'antd';

const DashboardLandmarkMaps = () => {
    const API_KEY: any = process.env.REACT_APP_GOOGLE_API_KEY
    const LAT: any = process.env.REACT_APP_FEFAULT_LT
    const LNG: any = process.env.REACT_APP_DEFAULT_LG
    const {accessToken} = useContext(LandmarksContext)
    const landmarkService = new LandmarkService(accessToken);
    const [places, setPlaces] = useState<any>([])
    const [isOpenPlacesDialog, setIsOpenPlacesDialog] = useState<any>(false)
    const [placesDataForm, setPlacesDataForm] = useState<any>({
        address_type : "address"
    })
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
            scrollwheel: false, 
            disableDoubleClickZoom: true, 
            zoomControl: true, 
        }
    };
    const CityHall = ({ text }:any) => <div style={{fontSize:'35px'}}>🏢</div>;

    const Places = ({ text }:any) => <div style={{fontSize:'35px'}}>🏢</div>;

    useEffect(() => {
        
    }, [places])

    const handleMapClick = useCallback ((e : any) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

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

    const onGoogleApiLoaded = (map: any, maps: any) => {
        // Attach right-click event listener to the map
        map.addListener("rightclick", handleMapClick);
    };

    return (
        <>
            <PlacesDialog 
                isOpen={isOpenPlacesDialog}
                setIsOpen={setIsOpenPlacesDialog}
                placesDataForm={placesDataForm}
            />
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={defaultProps.options}
                onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
                yesIWantToUseGoogleMapApiInternals
            >
                <CityHall
                    lat={LAT}
                    lng={LNG}
                />
                {places.map((element:any, index:number) => {
                    <Places
                        key={index}
                        lat={element.latitude}
                        lng={element.longitude}
                    />
                })}
            </GoogleMapReact>
        </>
    )
}

export default DashboardLandmarkMaps;