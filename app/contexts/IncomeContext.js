import React, { createContext, useContext, useEffect, useState } from 'react';

const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
    const [records, setRecords] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [recurringIncome, setRecurringIncome] = useState(0);
    const [nonRecurringIncome, setNonRecurringIncome] = useState(0);

    const fetchRecords = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/records');
            const data = await response.json();
            const recordsData = data.records || [];
            setRecords(recordsData);
            calculateIncome(recordsData);
        } catch (error) {
            console.error('Error loading income records: ', error);
        }
    };

    const calculateIncome = (records) => {
        let total = 0;
        let recurringTotal = 0;
        let nonRecurringTotal = 0;

        records.forEach(item => {
            const amountString = item.title.replace(/[.,€\s]/g, '');
            const amount = parseFloat(amountString) / 100;

            if (!isNaN(amount)) {
                if (item.isRecurring) {
                    recurringTotal += amount;
                } else {
                    nonRecurringTotal += amount;
                }
                total += amount;
            }
        });

        setTotalIncome(total);
        setRecurringIncome(recurringTotal);
        setNonRecurringIncome(nonRecurringTotal);
    };

    const removeRecord = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/records?id=${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the record');
            }
    
            setRecords((prevRecords) => {
                const updatedRecords = prevRecords.filter(record => record._id !== id);
                calculateIncome(updatedRecords);
                return updatedRecords;
            });
        } catch (error) {
            console.error('Error deleting income record: ', error);
        }
    };
    

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <IncomeContext.Provider value={{ records, totalIncome, recurringIncome, nonRecurringIncome, removeRecord }}>
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