import React, {useState, useEffect} from 'react';
import { useDebounce } from 'hooks/useDebounce.hook';
import { AutoComplete, Input, Spin } from 'antd';

interface AutoCompletePropsData {
    service? : any,
    functionName? : any,
    data: any,
    setData: Function,
    payload?: any
    wAutoCompleteIndexPayload: string,
    wAutoCompleteIndexRsLabel: string,
    style?: any,
    placeholder?: any
}

const WAutoComplete : React.FC<AutoCompletePropsData> = ({
    service,
    functionName,
    data,
    setData,
    payload,
    wAutoCompleteIndexPayload,
    wAutoCompleteIndexRsLabel,
    style,
    placeholder,
})  => {

    const [autoCompleteInputValue, setAutoCompleteInputValue] = useState<string>(data);
    const [resultData, setResultData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const debouncedAutoCompleteValue = useDebounce<any>(autoCompleteInputValue)

    useEffect(()=>{
      const getData = async (value:any, signal:any|null = null) => {
        try {
            setIsLoading(true)
            if(signal) service?.setAbortControllerSignal(signal)
            if(!value) return;
            payload.payload[wAutoCompleteIndexPayload] = value;
            if(service[functionName]) {
                let data = await service[functionName](...Object.values(payload))
                setResultData(data.data.data
                    .map((item : any, index: any) => { 
                        return {
                            item,
                            ...{
                                label : item[wAutoCompleteIndexRsLabel],
                                value : item.id
                            },
                        } 
                    })
                )
            } else {
                throw "Function not existent";
            }
        } catch (e: any) {
            // err
            throw e;
        } finally {
            setIsLoading(false)
        }
      }
      const controller = new AbortController();
      const signal = controller.signal;
      getData(debouncedAutoCompleteValue, signal)
      
      return () => {
        // abortController
        controller.abort();
      }  
    }, [debouncedAutoCompleteValue])
    
    const handleSelect = (value:any) => {
        let result = resultData.find( (x:any) => x.value === value)
        setAutoCompleteInputValue(result.label)
        setData(result)
    }

    const handleChange = (value:any) => {
        setAutoCompleteInputValue(value)
    }   

    return (<>
        <Spin spinning={isLoading}>
            <div className={"auto-complete-container"}>
                <AutoComplete
                    options={resultData}
                    value={autoCompleteInputValue}
                    onSelect={handleSelect}
                    onChange={handleChange}
                    style={style}
                >
                    <Input 
                        placeholder={placeholder} 
                        style={style}
                    />
                </AutoComplete>
            </div>
        </Spin>
    </>)
}

export default React.memo(WAutoComplete);