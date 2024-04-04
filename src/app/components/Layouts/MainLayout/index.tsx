import React from "react";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
//components
import Sidenav from "app/components/Sidenav";
import Topnav from "app/components/Topnav";

function MainLayout () {
    return (
        <>
            <div>
                <Topnav/>
                <Sidenav/>
                <Outlet/>
            </div>
        </>
    );
}

export default MainLayout;