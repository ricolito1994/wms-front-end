import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
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
const TopTabMenu = ({ tabOptions, currentIndex, setCurrentIndex }: TabOptions) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActiveLink = (index : any, path: String) => {
        //return location.pathname === path ? 'active' : '';
        return currentIndex === index ? 'active' : '';
    };
    useEffect(()=>{
        let loc = location.pathname.split('/')[2]
        let indexLoc = tabOptions.findIndex(x => x.name === loc)
        //let pathLink: any = tabOptions[currentIndex];
        //navigate(pathLink.link)
        setCurrentIndex(indexLoc)
    },[currentIndex])

    return (
        <div className="top-tabs-container"> 
            {tabOptions.map ((tabOption: TabOption, index:Number) => 
                <div 
                    className={"top-tab-option tab-"+index+" "+isActiveLink(index, tabOption.name)} 
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