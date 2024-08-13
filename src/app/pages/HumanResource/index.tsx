import { useContext }from 'react';
import { Outlet } from 'react-router-dom';
import { AppContext } from 'context';
import { HRContext } from '../../../context/HRContext';
import TopTabMenu from 'app/components/TopTabMenu';

function HumanResource () {
    const { 
        changeTab,
        currentTabIndex,
        setCurrentTabIndex,
    } = useContext(HRContext);
    const tabOptions = [
        {
            title: 'Employee',
            link : '/hr/',
            name : '',
            switchTab: changeTab
        },
        /*{
            title: 'Crew Setup',
            link : '/hr/crew',
            name : 'crew',
            switchTab: changeTab
        },*/
    ]
    return (
        <>
            <TopTabMenu 
                tabOptions={tabOptions}
                currentIndex={currentTabIndex}
                setCurrentIndex={setCurrentTabIndex}
            />
            <div className="content-main-container">
                <div className="content-main-items content-main-wide">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default HumanResource;