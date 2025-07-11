import React, {
    useEffect,
    useState,
} from "react";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { 
    DoubleLeftOutlined  , 
    DoubleRightOutlined ,
    HomeOutlined        ,
    DeleteOutlined      ,
    CarOutlined         ,
    ShopOutlined        ,
    IdcardOutlined      ,
    PieChartOutlined    ,
} from '@ant-design/icons';
import {Tooltip} from 'antd';

const Sidenav: React.FC = (): React.ReactElement => {
    const location = useLocation();
    const [isMinimized, setIsMinimized] = useState<boolean>(true);

    const isActiveLink = (path:any) => {
        return location.pathname.split('/')[1] === path ? 'active' : '';
    };

    const sideMenus = [
        {
            menu         : <><li key={`0-side-nav-menu`}><Link className={isActiveLink('')} to ='/'>Dashboard</Link></li></>,
            minimized    : <><li key={`0-side-nav-min`} className='li-minimized'>
                            <Tooltip title="dashboard" placement="right">  
                                <Link className={isActiveLink('')} to ='/'> <HomeOutlined /></Link>
                            </Tooltip>
                           </li></>
        },
        {
            menu         : <><li key={`1-side-nav-menu`}><Link className={isActiveLink('waste-management')} to ='/waste-management'>Waste Management</Link></li></>,
            minimized    : <><li key={`1-side-nav-min`} className='li-minimized'>
                            <Tooltip title="Waste Management" placement="right">
                                <Link className={isActiveLink('waste-management')} to ='/waste-management'> <DeleteOutlined /></Link>
                            </Tooltip>
                            </li></>
        },
        {
            menu         : <><li key={`2-side-nav-menu`}><Link className={isActiveLink('unit')} to ='/unit'>Unit</Link></li></>,
            minimized    : <><li key={`2-side-nav-min`} className='li-minimized'>
                            <Tooltip title="Unit Management" placement="right">
                                <Link className={isActiveLink('unit')} to ='/unit'><CarOutlined /></Link>
                            </Tooltip>
                           </li></>
        },
        {
            menu         : <><li key={`3-side-nav-menu`}><Link className={isActiveLink('landmarks')} to ='/landmarks'>Landmarks</Link></li></>,
            minimized    : <><li key={`3-side-nav-min`} className='li-minimized'>
                            <Tooltip title="Landmarks" placement="right">
                                <Link className={isActiveLink('landmarks')} to ='/landmarks'><ShopOutlined /></Link>
                            </Tooltip>
                            </li></>
        },
        {
            menu         : <><li key={`4-side-nav-menu`}><Link className={isActiveLink('hr')} to ='/hr'>HR</Link></li></>,
            minimized    : <><li key={`4-side-nav-min`} className='li-minimized'>
                            <Tooltip title="Human Resource" placement="right">
                                <Link className={isActiveLink('hr')} to ='/hr'><IdcardOutlined /></Link>
                            </Tooltip>
                           </li></>
        },
        {
            menu         : <><li key={`5-side-nav-menu`}><Link className={isActiveLink('reports')} to ='/reports'>Reports</Link></li></>,
            minimized    : <><li key={`5-side-nav-min`} className='li-minimized'>
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
            <a href="#" onClick={(e:any)=>{e.preventDefault(); setIsMinimized((prev:boolean) => !prev)}}>
                {! isMinimized ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
            </a>
            {! isMinimized ?
                <div className="logo-container">
                    <div>
                        <img src={`${import.meta.env.PUBLIC_URL}/wms-logo.png?${new Date().getTime()}`} alt="Logo" width='100'/>
                    </div>
                    <div className='version-number'>
                        {import.meta.env.REACT_APP_WMS_VERSION}
                    </div>
                </div> :
                <div className="logo-container">
                    <div>
                        <img src={`${import.meta.env.PUBLIC_URL}/wms-logo.png?${new Date().getTime()}`} alt="Logo" width='40'/>
                    </div>
                </div>    
            }
            <div key={`side-menu-container-xx`} className='side-menu-container'>
                <ul>
                    {
                        sideMenus.map((menu:any, index: number) => 
                            <React.Fragment key={`sidemenu-${index}`}>
                                <span key={index}>{isMinimized ? menu.minimized : menu.menu}</span>
                            </React.Fragment>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
export default Sidenav;