import React, { 
    useContext, 
    useEffect, 
    useState ,
    useCallback
} from "react";
import { Modal, Spin } from 'antd';
import WAutoComplete from "../WAutoComplete";
import LandmarkService from "services/LandmarkService";
import { LandmarksContext } from "context/LandmarksContext";
interface SearchLocationsComponentProps {
}

const SearchLocationsComponent: React.FC <SearchLocationsComponentProps>  = (
    {
        // props here
    } 
): React.ReactElement => {

    let {accessToken} = useContext (LandmarksContext)
    let landmarkService = new LandmarkService(accessToken)
    let [isActive, setIsActive] = useState<boolean>(true);
    let [mainStyle, setMainStyle] = useState<any>( {
        height:'10%', 
        width:'50%', 
        position:'relative', 
        top:'2%', 
        left: '20%',
        background: 'rgba(255,255,255,0.7)', 
        padding : '1%'
    });

    const toggleActive = useCallback (() => {
        setIsActive((prev:boolean) => !prev)
    }, [isActive])

    useEffect (() => {
        let w = (! isActive) ? '2%' : '50%';
        let h = (! isActive) ? '5%' : '10%';
        setMainStyle((prev:any) => ({...prev, width: w, height: h}))
    }, [isActive])

    return (<>
        <div style={mainStyle} >
           {isActive && ( <div style={{
                height:'100%', width:'100%', position:'relative'
            }} >
                <b>Search Places</b>
                
                <WAutoComplete 
                    service = {landmarkService}
                    functionName  = {{}}
                    data  = {{}}
                    setData  = {()=>{}}
                    payload  = {{}}
                    wAutoCompleteIndexPayload  = {''}
                    wAutoCompleteIndexRsLabel  = {''}
                    style  = {{width:'100%'}}
                    placeholder  = {{}}
                    clearData  = {()=>{}}
                    wAutoUniqueID  = {123}
                />
                <div style={{
                    position:'relative',
                    float: 'right',
                    top: '-107%',
                }}>
                    <button style={{cursor:'pointer'}} onClick={toggleActive} > x </button>
                </div>
             </div>)}
             {! isActive && (<button style={{cursor:'pointer'}} onClick={toggleActive} > x </button>)}
        </div>
    </>)
}

export default SearchLocationsComponent;