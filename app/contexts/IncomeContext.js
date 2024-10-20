import React, { createContext, useContext, useEffect, useState } from 'react';

const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
    const [records, setRecords] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [recurringIncome, setRecurringIncome] = useState(0);
    const [nonRecurringIncome, setNonRecurringIncome] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [totalMonthlyIncome, setTotalMonthlyIncome] = useState(0);

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
        let recurringTotal = 0;
        let nonRecurringTotal = 0;

        const filteredNonRecurringItems = records.filter(item => {
            const itemDate = new Date(item.date);
            return !item.isRecurring && itemDate.getMonth() === selectedMonth;
        });

        nonRecurringTotal = filteredNonRecurringItems.reduce((total, item) => {
            const amount = parseFloat(item.title.replace(/[.,€\s]/g, '')) / 100;
            return total + (isNaN(amount) ? 0 : amount);
        }, 0);

        recurringTotal = records
            .filter(item => item.isRecurring)
            .reduce((total, item) => {
                const amount = parseFloat(item.title.replace(/[.,€\s]/g, '')) / 100;
                return total + (isNaN(amount) ? 0 : amount);
            }, 0);

        setRecurringIncome(recurringTotal);
        setNonRecurringIncome(nonRecurringTotal);

        const totalMonthlyIncome = recurringTotal + nonRecurringTotal;
        setTotalMonthlyIncome(totalMonthlyIncome);
    };

    useEffect(() => {
        calculateIncome(records);
    }, [records, selectedMonth]);

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
                filterNonRecurringIncomeForMonth(updatedRecords, selectedMonth);
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
        <IncomeContext.Provider value={{ 
            records, 
            recurringIncome, 
            nonRecurringIncome,
            totalMonthlyIncome,
            selectedMonth, 
            setSelectedMonth,
            setRecords, 
            removeRecord 
        }}>
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