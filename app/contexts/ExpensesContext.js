import React, { createContext, useContext, useEffect, useState } from 'react';

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);

    const fetchExpenses = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/expenses');
            const data = await response.json();
            setExpenses(data.expenses || []);
            calculateTotalExpenses(data.expenses || []);
        } catch (error) {
            console.error('Error loading expenses: ', error);
        }
    };

    const calculateTotalExpenses = (expenses) => {
        const total = expenses.reduce((sum, item) => {
            const amountString = item.title.replace(/[.,€\s]/g, '');
            const amount = parseFloat(amountString) / 100; 
            return sum + (isNaN(amount) ? 0 : amount); 
        }, 0);
        setTotalExpenses(total);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <ExpensesContext.Provider value={{ expenses, totalExpenses }}>
            {children}
        </ExpensesContext.Provider>
    );
};

export const useExpenses = () => {
    const context = useContext(ExpensesContext);
    if (!context) {
        throw new Error("useExpenses must be used within an ExpensesProvider");
    }
    return context;
};