import React, { createContext, useState, useContext } from 'react';

const MonthContext = createContext();

export function MonthProvider({ children }) {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    return (
        <MonthContext.Provider value={{ selectedMonth, setSelectedMonth }}>
            {children}
        </MonthContext.Provider>
    );
}

export function useMonth() {
    return useContext(MonthContext);
}