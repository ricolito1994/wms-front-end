import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";

import { AppContext } from "context";

import WMapsComponent from "app/components/Maps/WMapsComponent";
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
    const API_KEY: any = process.env.REACT_APP_GOOGLE_API_KEY
    const LAT: any = process.env.REACT_APP_DEFAULT_LT
    const LNG: any = process.env.REACT_APP_DEFAULT_LG
    const {accessToken} = useContext(AppContext)

    useEffect(() => {
        
    }, [])

    return (<>
        <WMapsComponent 
            APIKey={API_KEY}
            //accessToken={accessToken}
            additionalMapOptions={[
                {
                    tooltipText: 'Add new route template',
                    icon : <BranchesOutlined/>,
                    click : (e: any) => {}
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
        >
            <>
               {/*marker components here*/} 
            </>
        </WMapsComponent>
    </>)
}

export default UnitMonitor;