import React from "react";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Sidenav = () => {
    const location = useLocation();
    const isActiveLink = (path:any) => {
        return location.pathname.split('/')[1] === path ? 'active' : '';
    };
    return (
        <div className="sidenav">
            <div className="logo-container">
                <div>
                    <img src={`${process.env.PUBLIC_URL}/wms-logo.png?${new Date().getTime()}`} alt="Logo" width='100'/>
                </div>
                <div className='version-number'>
                    {process.env.REACT_APP_WMS_VERSION}
                </div>
            </div>
            <div className='side-menu-container'>
                <ul>
                    <li><Link className={isActiveLink('')} to ='/'>Dashboard</Link></li>
                    <li><Link className={isActiveLink('waste-management')} to ='/waste-management'>Waste Management</Link></li>
                    <li><Link className={isActiveLink('unit')} to ='/unit'>Unit</Link></li>
                    <li><Link className={isActiveLink('landmarks')} to ='/landmarks'>Landmarks</Link></li>
                    <li><Link className={isActiveLink('hr')} to ='/hr'>HR</Link></li>
                    <li><Link className={isActiveLink('reports')} to ='/reports'>Reports</Link></li>
                </ul>
            </div>
        </div>
    )
}
export default Sidenav;