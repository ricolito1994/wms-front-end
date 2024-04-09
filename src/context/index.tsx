import React, { createContext, useEffect, useRef, useState } from 'react';
export const AppContext = createContext<any>(null);

const AppContextProvider = ({children} : any) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
export default AppContextProvider;