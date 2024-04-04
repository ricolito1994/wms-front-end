import React from "react";
import { Link } from 'react-router-dom';

function Sidenav () {
    return (<>
        <div>
            <Link to ='/'>Dashboard</Link>
            <Link to ='/unit'>Unit</Link>
            <Link to ='/reports'>Reports</Link>
        </div>
    </>)
}

export default Sidenav;