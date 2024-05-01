import { useContext }from 'react';
import { Outlet } from 'react-router-dom';
import { AppContext } from 'context';
import { UnitContext } from '../../../context/UnitContext';
import TopTabMenu from 'app/components/TopTabMenu';

function Unit () {
    const { 
        changeTab,
        currentTabIndex,
        setCurrentTabIndex,
    } = useContext(UnitContext);
    const tabOptions = [
        {
            title: 'Unit List',
            link : '/unit/',
            name : '',
            switchTab: changeTab
        },
        {
            title: 'Dispatch Unit',
            link : '/unit/performance',
            name : 'performance',
            switchTab: changeTab
        },
        {
            title: 'Monitor Unit',
            link : '/unit/monitor',
            name : 'monitor',
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

export default Unit;