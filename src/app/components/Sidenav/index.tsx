import React, {
    useEffect,
    useState,
} from "react";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { 
    DoubleLeftOutlined , 
    DoubleRightOutlined,
    HomeOutlined        ,
    DeleteOutlined    ,
    CarOutlined        ,
    ShopOutlined       ,
    IdcardOutlined     ,
    PieChartOutlined    ,
} from '@ant-design/icons';
import {Tooltip} from 'antd';

const Sidenav = () => {
    const location = useLocation();
    const [isMinimized, setIsMinimized] = useState<boolean>(true);

    const isActiveLink = (path:any) => {
        return location.pathname.split('/')[1] === path ? 'active' : '';
    };

    const sideMenus = [
        {
            menu         : <><li><Link className={isActiveLink('')} to ='/'>Dashboard</Link></li></>,
            minimized    : <><li className='li-minimized'>
                            <Tooltip title="dashboard" placement="right">  
                                <Link className={isActiveLink('')} to ='/'> <HomeOutlined /></Link>
                            </Tooltip>
                           </li></>
        },
        {
            menu         : <><li><Link className={isActiveLink('waste-management')} to ='/waste-management'>Waste Management</Link></li></>,
            minimized    : <><li className='li-minimized'>
                            <Tooltip title="Waste Management" placement="right">
                                <Link className={isActiveLink('waste-management')} to ='/waste-management'> <DeleteOutlined /></Link>
                            </Tooltip>
                            </li></>
        },
        {
            menu         : <><li><Link className={isActiveLink('unit')} to ='/unit'>Unit</Link></li></>,
            minimized    : <><li className='li-minimized'>
                            <Tooltip title="Unit Management" placement="right">
                                <Link className={isActiveLink('unit')} to ='/unit'><CarOutlined /></Link>
                            </Tooltip>
                           </li></>
        },
        {
            menu         : <><li><Link className={isActiveLink('landmarks')} to ='/landmarks'>Landmarks</Link></li></>,
            minimized    : <><li className='li-minimized'>
                            <Tooltip title="Landmarks" placement="right">
                                <Link className={isActiveLink('landmarks')} to ='/landmarks'><ShopOutlined /></Link>
                            </Tooltip>
                            </li></>
        },
        {
            menu         : <><li><Link className={isActiveLink('hr')} to ='/hr'>HR</Link></li></>,
            minimized    : <><li className='li-minimized'>
                            <Tooltip title="Human Resource" placement="right">
                                <Link className={isActiveLink('hr')} to ='/hr'><IdcardOutlined /></Link>
                            </Tooltip>
                           </li></>
        },
        {
            menu         : <><li><Link className={isActiveLink('reports')} to ='/reports'>Reports</Link></li></>,
            minimized    : <><li className='li-minimized'>
                            <Tooltip title="Reports" placement="right">
                                <Link className={isActiveLink('reports')} to ='/reports'><PieChartOutlined /></Link>
                            </Tooltip>
                           </li></>
        }
    ]

    useEffect (()=>{

    }, [isMinimized])
    return (
        <div className={! isMinimized ? "sidenav" : 'sidenav-minimized'}>
            <a href="javascript:void(0);" onClick={()=>setIsMinimized((prev:boolean) => !prev)}>
                {! isMinimized ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
            </a>
            {! isMinimized ?
                <div className="logo-container">
                    <div>
                        <img src={`${process.env.PUBLIC_URL}/wms-logo.png?${new Date().getTime()}`} alt="Logo" width='100'/>
                    </div>
                    <div className='version-number'>
                        {process.env.REACT_APP_WMS_VERSION}
                    </div>
                </div> :
                <div className="logo-container">
                    <div>
                        <img src={`${process.env.PUBLIC_URL}/wms-logo.png?${new Date().getTime()}`} alt="Logo" width='40'/>
                    </div>
                </div>    
            }
            <div className='side-menu-container'>
                <ul>
                    {
                        sideMenus.map((menu:any, index: number) => <>
                            <span key={index}>{isMinimized ? menu.minimized : menu.menu}</span>
                        </>)
                    }
                </ul>
            </div>
        </div>
    )
}
export default Sidenav;