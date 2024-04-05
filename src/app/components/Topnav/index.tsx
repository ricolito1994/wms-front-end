import React from "react";

function Topnav () {
    return (
        <div className='topnav'>
            <div className='topnav-container'>
                <div className='topnav-container-app-name'>
                    {process.env.REACT_APP_NAME}
                </div>
                <div className='topnav-container-user-account'>
                    <div>
                        {process.env.REACT_APP_NAME}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Topnav;