import { useContext }from 'react';
import { Outlet } from 'react-router-dom';
import { AppContext } from 'context';
import { LandmarksContext } from '../../../context/LandmarksContext';
import TopTabMenu from 'app/components/TopTabMenu';

function Landmarks () {
    const { 
        changeTab,
        currentTabIndex,
        setCurrentTabIndex,
    } = useContext(LandmarksContext);
    const tabOptions = [
        {
            title: 'Dashboard Maps',
            link : '/landmarks/',
            name : 'dashboardmaps',
            switchTab: changeTab
        },
        {
            title: 'Address Setup',
            link : '/landmarks/address/',
            name : 'address',
            switchTab: changeTab
        },
        {
            title: 'Barangay Setup',
            link : '/landmarks/barangay/',
            name : 'barangay',
            switchTab: changeTab
        },
        {
            title: 'Purok Setup',
            link : '/landmarks/purok',
            name : 'purok',
            switchTab: changeTab
        },
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

export default Landmarks;