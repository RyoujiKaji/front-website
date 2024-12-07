// src/context/DataContext.js
import React, { createContext, useState, useContext } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useAppContext = ()=>{
    return useContext(DataContext);
}
