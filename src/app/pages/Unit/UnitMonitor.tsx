import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";

import { AppContext } from "@/context";
import { WMapsContext } from "@/context/WMapsContext";

import WMapsComponent from "@/app/components/Maps/WMapsComponent";
import WSearchDialogComponent from "@/app/components/DialogBox/WSearchDialogComponent";
import { UnitRouteTemplateService } from "@/services/UnitRouteTemplateService";
import { 
    Modal        , 
    notification , 
    FloatButton  , 
    Spin         ,
    Button       ,
} from 'antd';
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
    BranchesOutlined    ,
    EyeOutlined         ,
} from '@ant-design/icons';

const UnitMonitor = () => {
    const API_KEY   : any                               = import.meta.env.VITE_GOOGLE_API_KEY
    const LAT       : any                               = import.meta.env.VITE_DEFAULT_LT
    const LNG       : any                               = import.meta.env.VITE_DEFAULT_LG
    const {accessToken}                                 = useContext(AppContext);
    const [isAddRouteMode, setIsAddRouteMode]           = useState<boolean>(false);
    const [isOpenSearchRoute, setIsOpenSearchRoute]     = useState<boolean>(false);
    const unitRouteTemplateService                      = new UnitRouteTemplateService(accessToken);

    const {
        setRouteData,
        setIsResetMap
    } = useContext(WMapsContext);

    useEffect(() => {
        
    }, [])

    const resetMap = () => {
    }

    const onSelectRoute = () => {

    }

    return (<>
        <WMapsComponent 
            APIKey={API_KEY}
            additionalMapOptions={[
                {
                    tooltipText: 'Add new route template',
                    icon : <BranchesOutlined/>,
                    click : () => setIsAddRouteMode((prev: boolean) => !prev),
                    id : 'route_mode',
                },
                {
                    tooltipText: 'Open a route',
                    icon : <EyeOutlined/>,
                    click : (e: any) => setIsOpenSearchRoute(true)
                },
                {
                    tooltipText: 'View/track unit route',
                    icon : <CarOutlined/>,
                    click : (e: any) => {}
                },
            ]}
            centerMap={{
                lat: parseFloat(LAT),
                lng: parseFloat(LNG)
            }}
            isAddRouteMode = {isAddRouteMode}
            mode = {"add-route-mode"}
            resetMap = {resetMap}
            onSelectRoute = {onSelectRoute}
        >
            <>
               {/*marker components here*/} 
                <WSearchDialogComponent
                    isOpen={isOpenSearchRoute}
                    setIsOpen={setIsOpenSearchRoute}
                    handleClose={resetMap}
                    title = "Search Route"
                    serviceClass={unitRouteTemplateService}
                    columnData={[
                        {
                            title : "Route Name",
                            dataIndex: 'route_template_name',
                            key: 'route_template_name',
                            sorter: (a:any, b:any) => a.route_template_name.localeCompare(b.route_template_name),
                        },
                        {
                            title : "Description",
                            dataIndex: 'description',
                            key: 'description',
                            sorter: (a:any, b:any) => a.description.localeCompare(b.description),
                        },
                        {
                            title : "Is Active",
                            dataIndex: 'is_active',
                            key: 'is_active',
                            sorter: (a:any, b:any) => a.is_active.localeCompare(b.is_active),
                            render: (text: any, b: any) => (
                                <span>
                                    {b.is_active}
                                </span>
                            ),
                        },
                        {
                            title : "Actions",
                            key: 'action',
                            render: (text: any, route: any) => (
                                <span>
                                    <Button type="primary" onClick={() => {
                                        let routes = route?.unit_routes?.map((routes:any) => {
                                            const {lat, lng} = routes;
                                            return {
                                                location : {
                                                    lat : parseFloat(lat), 
                                                    lng : parseFloat(lng)
                                                }
                                            }
                                        });
                                        setRouteData(routes)
                                    }}>Open</Button>&nbsp;
                                </span>
                            ),
                        },
                    ]}
                >
                    <div>SEARCH</div>
                </WSearchDialogComponent>
            </>
        </WMapsComponent>
    </>)
}

export default UnitMonitor;