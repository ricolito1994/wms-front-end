import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
interface TabOption {
    title : String,
    link : String,
    name : String,
    switchTab : Function,
}
interface TabOptions {
    tabOptions : TabOption[],
    currentIndex : any,
    setCurrentIndex: Function,
}
const TopTabMenu = (
{ 
    tabOptions, 
    currentIndex, 
    setCurrentIndex 
}: TabOptions) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActiveLink = (index : any) => 
        currentIndex === index ? 'active' : '';
    useEffect(() => {
        let loc = location.pathname.split('/')[2]
        let indexLoc = tabOptions.findIndex(x => x.name === loc)
            indexLoc = indexLoc < 0 ? 0 : indexLoc;
        setCurrentIndex(indexLoc)
    },[currentIndex])
    return (
        <div className="top-tabs-container"> 
            {tabOptions.map ((tabOption: TabOption, index:any) => 
                <div key={index}
                    className={`top-tab-option tab-${index} ${isActiveLink(index)}`} 
                    onClick={()=>{
                        let link : any = tabOption.link;
                        navigate(link)
                        tabOption.switchTab(index)
                    }}
                >
                    {tabOption.title}
                </div>
            )}
        </div>
    )
}
export default TopTabMenu;