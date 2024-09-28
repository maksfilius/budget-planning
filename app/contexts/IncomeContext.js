import React, { createContext, useContext, useEffect, useState } from 'react';

const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
    const [records, setRecords] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);

    const fetchRecords = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/records');
            const data = await response.json();
            setRecords(data.records || []);
            calculateTotalIncome(data.records || []);
        } catch (error) {
            console.error('Error loading income records: ', error);
        }
    };

    const calculateTotalIncome = (records) => {
        const total = records.reduce((sum, item) => {
            const amountString = item.title.replace(/[.,€\s]/g, '');
            const amount = parseFloat(amountString) / 100;
            return sum + (isNaN(amount) ? 0 : amount); 
        }, 0);
        setTotalIncome(total);
    };

    const removeRecord = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/records?id=${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the record');
            }

            setRecords((prevRecords) => prevRecords.filter(record => record._id !== id));
            calculateTotalIncome(records.filter(record => record._id !== id));
        } catch (error) {
            console.error('Error deleting income record: ', error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <IncomeContext.Provider value={{ records, totalIncome, removeRecord }}>
            {children}
        </IncomeContext.Provider>
    );
};

export const useIncome = () => {
    const context = useContext(IncomeContext);
    if (!context) {
        throw new Error("useIncome must be used within an IncomeProvider");
    }
    return context;
};