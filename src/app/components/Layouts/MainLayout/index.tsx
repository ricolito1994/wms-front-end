import React from "react";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
//components
import Sidenav from "app/components/Sidenav";
import Topnav from "app/components/Topnav";

function MainLayout () {
    return (
        <>
            <div className="container">
                <Topnav/>
                <div className="content">
                    <Sidenav/>
                    <div className="main">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainLayout;