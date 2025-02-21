import React, { 
    useContext, 
    useEffect, 
    useState ,
    useCallback
} from "react";
import { 
    GoogleMap, 
    LoadScript, 
    Marker,
    InfoWindow, 
} from "@react-google-maps/api";
import PlacesDialog from "app/components/DialogBox/PlacesDialog";
import { LandmarksContext } from "context/LandmarksContext";
import LandmarkService from "services/LandmarkService";
import { Modal, notification, Spin } from 'antd';
import SearchLocationsComponent from "app/components/Maps/SearchLocationsComponent";

const DashboardLandmarkMaps: React.FC = (): React.ReactElement => {
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
    const [isLoadingMapData, setIsLoadingMapData] = useState<boolean>(false)
    const [selectedMarker, setSelectedMarker] = useState<any|null>(null)
    const [centerMap, setCenterMap] = useState<any|null>({
        lat: 10.53846,
        lng: 122.83512
    })
    const [markerRef, setMarkerRef] = useState<google.maps.MVCObject | undefined>();
    const defaultProps = {
        center: {
            lat: 10.53846,
            lng: 122.83512
        },
        zoom: 17,
        options : {
            scrollwheel: true, 
            disableDoubleClickZoom: true, 
            zoomControl: true, 
        }
    };

    useEffect(() => {
        if (coordinatesData && ! isOpenPlacesDialog) {
            setIsLoadingMapData(true)
            let existingPlaceIndex = places.findIndex( (e :any) => e?.id == coordinatesData.id && 
                e?.address_type == coordinatesData.address_type)
            if (existingPlaceIndex > -1) {
                setPlaces((prev:any) => 
                    prev.map((place:any, i:number) => 
                        i === existingPlaceIndex ? { ...place, 
                            latitude: coordinatesData?.latitude, 
                            longitude: coordinatesData?.longitude
                        } : place
                    )
                );
                setCoordinatesData(null)
                setSelectedMarker(coordinatesData)
                setIsLoadingMapData(false)
                return ;
            }
            setPlaces((prev:any) => [...prev, coordinatesData])
            setSelectedMarker(coordinatesData)
            setCoordinatesData(null)
            setIsLoadingMapData(false)
        }
    }, [isOpenPlacesDialog, coordinatesData])

    useEffect(() => {
        const getPlaces = async (signal: AbortSignal) => {
            try {
                setIsLoadingMapData(true)
                landmarkService.setAbortControllerSignal(signal)

                let places = await Promise.all([
                    landmarkService.all('address', {city_id: 1}),
                    landmarkService.all('barangay', {city_id: 1}),
                    landmarkService.all('purok', {city_id: 1})
                ])

                for (let p in places) {
                    let selplace = places[p].data
                    for (let q in selplace) {
                        let pl = selplace[q]
                        if (pl.latitude > 0 && pl.longitude > 0) {
                            let addressType = places[p]?.address_type;
                            let placeName:any = {
                                'address'    : 'full_address',
                                'purok'      : 'purok_name',
                                'barangay'   : 'barangay_name',
                            }
                            setPlaces((prev:any) => [...prev, {
                                'id'           : `${addressType}-${pl.id}`,
                                'latitude'     : parseFloat(pl.latitude),
                                'longitude'    : parseFloat(pl.longitude),
                                'address_type' : places[p]?.address_type,
                                'place_name'   : pl[placeName[addressType]]
                            }])
                        }
                    }
                }

            } catch (e) {
                // throw e
            } finally {
                setIsLoadingMapData(false)
            }
        }

        let abortController = new AbortController();

        getPlaces(abortController.signal)

        return () => {
            abortController.abort();
        }
    }, [])

    useEffect(() => {console.log(places)}, [places])

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
                setPlacesDataForm((prev:any) => 
                    ({...prev,
                        latitude: lat, 
                        longitude: lng
                    })
                )
            },
            onCancel() {
                
            },
        });
    }, [] );

    const markerClick = useCallback ( (marker: any, anchor: google.maps.MVCObject) => {
        setSelectedMarker(marker)
        setMarkerRef(anchor)
    }, [])

    useEffect(() => {
        if (selectedMarker) {
            setCenterMap({
                lat: parseFloat(selectedMarker.latitude),
                lng: parseFloat(selectedMarker.longitude)
            })
        }
    }, [selectedMarker])

    return (
        <>
            {isLoadingMapData ?
                <div className="overlay-form-loading">
                    <div className="loader"></div>
                </div> : '' 
            }
            <PlacesDialog 
                isOpen={isOpenPlacesDialog}
                setIsOpen={setIsOpenPlacesDialog}
                placesDataForm={placesDataForm}
                setCoordinatesData={setCoordinatesData}
            />
            <LoadScript googleMapsApiKey={API_KEY}>
                <GoogleMap 
                    mapContainerStyle={{height:'100%', width:'100%'}} 
                    center={centerMap} 
                    zoom={15}
                    onRightClick={handleMapClick}
                >   
                    <SearchLocationsComponent 
                        searchAction = {(place: any) => {
                            place.item[`latitude`] = parseFloat(place.item?.latitude);
                            place.item[`longitude`] = parseFloat(place.item?.longitude)
                            if (place.item[`latitude`] == 0 && place.item[`longitude`] == 0) {
                                notification.error({
                                    message: `${place.item[`place_name`]} does not have a location.`,
                                    description: `Please add it to the map first.`,
                                    placement: 'top',
                                });
                                return;
                            }
                            setSelectedMarker(place.item)
                        }} 
                    />
                    <Marker position={defaultProps.center} />
                    {places.map((marker:any, index : any) => {
                        return (
                            <Marker 
                                key={index} 
                                onClick={(e: any) => markerClick(marker, e)}
                                position={{ lat: marker.latitude, lng: marker.longitude }} 
                            >
                                {(selectedMarker?.id === marker.id && selectedMarker?.address_type === marker.address_type) && (
                                    <InfoWindow
                                        anchor={markerRef} // optional - can be removed; markerref is required if outside marker component
                                        position={{ lat: selectedMarker?.latitude, lng: selectedMarker?.longitude }}
                                        onCloseClick={() => setSelectedMarker(null)}
                                    >
                                        <div>
                                            <h3>{selectedMarker?.place_name}</h3>
                                            <p>{selectedMarker?.address_type}</p>
                                        </div>
                                    </InfoWindow>
                                )}
                            </Marker>
                        )
                    })}
                </GoogleMap>
            </LoadScript>
        </>
    )
}

export default DashboardLandmarkMaps;