import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";

import { AppContext } from "@/context";

import WMapsComponent from "@/app/components/Maps/WMapsComponent";
import { Modal, notification, FloatButton, Spin } from 'antd';
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
} from '@ant-design/icons';

const UnitMonitor = () => {
    const API_KEY   : any                     = import.meta.env.REACT_APP_GOOGLE_API_KEY
    const LAT       : any                     = import.meta.env.REACT_APP_DEFAULT_LT
    const LNG       : any                     = import.meta.env.REACT_APP_DEFAULT_LG
    const {accessToken}                       = useContext(AppContext);
    const [isAddRouteMode, setIsAddRouteMode] = useState<boolean>(false);

    useEffect(() => {
        
    }, [])

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
        >
            <>
               {/*marker components here*/} 
            </>
        </WMapsComponent>
    </>)
}

export default UnitMonitor;