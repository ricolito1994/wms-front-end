import React, { 
    useContext  , 
    useEffect   , 
    useState    ,
    useCallback ,
} from "react";
import { 
    GoogleMap          , 
    LoadScript         , 
    Marker             ,
    InfoWindow         , 
    useJsApiLoader     ,
    useLoadScript      ,
    DirectionsRenderer ,
} from "@react-google-maps/api";
import { 
    DoubleLeftOutlined  , 
    DoubleRightOutlined ,
    HomeOutlined        ,
    DeleteOutlined      ,
    CarOutlined         ,
    ShopOutlined        ,
    IdcardOutlined      ,
    PieChartOutlined    ,
    DownOutlined        ,
    CloseOutlined       ,
} from '@ant-design/icons';

import { Button } from "antd";

import SearchLocationsComponent from "./SearchLocationsComponent";
import WMapsDirectionsListComponent from "./WMapsDirectionsListComponent";
import { LandmarksContext } from "context/LandmarksContext";
import LandmarkService from "services/LandmarkService";
import { Modal, notification, FloatButton, Spin } from 'antd';
import PlacesDialog from "app/components/DialogBox/PlacesDialog";
import { AppContext } from "context";
interface LocationProps {
    lat: number,
    lng: number
}

interface WMapsProps {
    additionalMapOptions?   : any []
    APIKey?                 : any,
    loadingProcesses?       : any [],
    accessTokenF?           : string,
    centerMap?              : LocationProps
    children?               : React.ReactElement,
    disablePlaceMarkers?    : boolean,
    isAddRouteMode?         : boolean,
    mode?                   : any,
}

const API_KEY: any = process.env.REACT_APP_GOOGLE_API_KEY ?? 'ABCDE123';
const LAT: any = parseFloat(process.env.REACT_APP_DEFAULT_LT ?? '0.00');
const LNG: any = parseFloat(process.env.REACT_APP_DEFAULT_LG ?? '0.00');

const WMapsComponent: React.FC <WMapsProps> = (
    {
        /* WMS Maps component props */
        centerMap               = {lat: LAT, lng: LNG},
        APIKey                  = API_KEY,
        disablePlaceMarkers     = true,
        additionalMapOptions    = [],
        loadingProcesses        = [],
        mode                        ,
        accessTokenF                ,
        children                    ,
        isAddRouteMode              ,
    } 
): React.ReactElement => {
    const defaultCenter: LocationProps = {
        lat: centerMap?.lat ,
        lng: centerMap?.lng ,
    }
    const {accessToken} = useContext(AppContext);
    const landmarkService = new LandmarkService(accessToken);
    const [places, setPlaces] = useState<any>([])
    const [isOpenPlacesDialog, setIsOpenPlacesDialog] = useState<any>(false)
    const [placesDataForm, setPlacesDataForm] = useState<any>({
        address_type : "address"
    })
    const [coordinatesData, setCoordinatesData] = useState<any|null>(null)
    const [centerMapLocation, setCenterMapLocation] = useState<LocationProps>(defaultCenter)
    const [markerRef, setMarkerRef] = useState<google.maps.MVCObject | undefined>();
    const [selectedMarker, setSelectedMarker] = useState<any|null>(null)
    const [isLoadingMapData, setIsLoadingMapData] = useState<boolean>(false)
    const [isOpenMapOptions, setIsOpenMapOptions] = useState<boolean>(false);

    const {isLoaded} = useLoadScript ({
        googleMapsApiKey: APIKey
    })

    /* unit directions */
    const [newWaypoints, setNewWaypoints] = useState<{ location: google.maps.LatLngLiteral }[]>([]);
    const [newDirections, setNewDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [selectedWaypoints, setSelectedWaypoints] = useState<{ location: google.maps.LatLngLiteral }[]>([]);
    const [selectedDirections, setSelectedDirections] = useState<google.maps.DirectionsResult | null>(null);

    const clickAddNewRoute = (event: google.maps.MapMouseEvent) => {
        if (! isAddRouteMode) return;

        if (event.latLng) {
            let latlng = event.latLng;
            setNewWaypoints((prev: any) => [...prev, { location: latlng.toJSON() }]);
        }
    };
    
    useEffect (() => {
        fetchDirections(newWaypoints, setNewDirections);
    }, [newWaypoints])

    useEffect (() => {
        //
        console.log(newDirections)
    }, [newDirections])
    
    useEffect(() => {
        if (disablePlaceMarkers) return;

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
        if (!isLoaded && typeof google === "undefined") return;

        const getPlaces = async (signal: AbortSignal) => {
            if (disablePlaceMarkers) return;
            try {
                setIsLoadingMapData(true)
                landmarkService.setAbortControllerSignal(signal)

                let concurrentProcesses = [
                    landmarkService.all('address', {city_id: 1}),
                    landmarkService.all('barangay', {city_id: 1}),
                    landmarkService.all('purok', {city_id: 1})
                ]

                if (loadingProcesses) {
                    concurrentProcesses = [...loadingProcesses];
                }

                let places = await Promise.all(concurrentProcesses)

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
    }, [isLoaded])

    useEffect(() => {console.log(places)}, [places])


    const fetchDirections = (
        waypoints               : any|null      = null, 
        plotDirectionsCallback  : Function|null = null
    ) => {
        if (waypoints.length < 2) return; // Need at least 2 points to draw a route
    
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: waypoints[0].location,
            destination: waypoints[waypoints.length - 1].location,
            waypoints: waypoints.slice(1, -1),
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                if(plotDirectionsCallback && result) { 
                    /*let legsLength = result?.routes[0].legs.length
                    const origin      = new google.maps.LatLng(waypoints[0].location.lat, waypoints[0].location.lng);
                    const destination = new google.maps.LatLng(waypoints[waypoints.length - 1].location.lat, waypoints[waypoints.length - 1].location.lng);
                    result.routes[0].legs[legsLength - 1] = {...result?.routes[0].legs[legsLength - 1], 
                        start_location : origin,
                        end_location   : destination
                    }*/
                    plotDirectionsCallback (result)
                }
            } else {
              console.error("Error fetching directions:", status);
            }
          }
        );
    };

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

    const saveDirections = () => {

    }

    const deleteDirections = (index: any|null = null) => {

    }

    useEffect(() => {
        if (selectedMarker) {
            setCenterMapLocation({
                lat: parseFloat(selectedMarker.latitude),
                lng: parseFloat(selectedMarker.longitude)
            })
        }
    }, [selectedMarker])

    return (<>
        {isLoadingMapData &&
            (<div className="overlay-form-loading">
                <div className="loader"></div>
            </div>)
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
                center={centerMapLocation} 
                zoom={15}
                onRightClick={handleMapClick}
                onClick={clickAddNewRoute}
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
                
                <Marker position={defaultCenter} />

                {newDirections && <DirectionsRenderer directions={newDirections} />}
                
                {newDirections && (
                    <WMapsDirectionsListComponent
                        directions={newDirections}
                        waypoints={newWaypoints}
                        setDirections={setNewDirections}
                        setWaypoints={setNewWaypoints}
                    >
                        <>
                            <Button type="primary" >
                                Save
                            </Button> &nbsp;
                            <Button onClick={()=>{
                                setNewDirections(null)
                                setNewWaypoints([])
                            }} type="primary" danger>
                                Cancel
                            </Button>
                        </>
                    </WMapsDirectionsListComponent>
                )}

                <FloatButton
                    shape="circle"
                    type="primary"
                    style={{ 
                        position:'relative', 
                        top:'20%', 
                        left: '1%',
                    }}
                    icon={<HomeOutlined />}
                    tooltip={<div>Click to default center</div>}
                    onClick={()=>setCenterMapLocation(defaultCenter)}
                />
                <FloatButton.Group
                    trigger="click"
                    style={{ 
                        position:'absolute', 
                        top:'45%', 
                        left: '1%',
                        width: '0%',
                        height: '0%'
                    }}
                    icon={<DownOutlined />}
                    tooltip={<div>Click to show options.</div>}
                    placement="bottom"
                    open={isOpenMapOptions}
                    onClick={()=>setIsOpenMapOptions((prev: boolean) => !prev)} // toggle
                >
                   {additionalMapOptions?.map((option:any, index:number)=> <>
                    <FloatButton 
                        key={index}
                        icon={option.icon}
                        tooltip={<div>{option.tooltipText}</div>}
                        onClick={option.click}
                        type={
                            /* for toggle properties - define some of unique toggle conditions */
                            mode === 'add-route-mode' ? ((option.id && option.id === 'route_mode' && isAddRouteMode) ? 'primary' : 'default')
                            : 'default'
                        }
                    />
                   </>)}
                </FloatButton.Group>
                {!disablePlaceMarkers && places.map((marker:any, index : any) => {
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
                {children}
            </GoogleMap> 
        </LoadScript>
    </>)
}

export default WMapsComponent;