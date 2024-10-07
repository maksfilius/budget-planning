import React, { createContext, useContext, useEffect, useState } from 'react';

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [recurringExpenses, setRecurringExpenses] = useState(0);
    const [nonRecurringExpenses, setNonRecurringExpenses] = useState(0);

    const fetchExpenses = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/expenses');
            const data = await response.json();
            setExpenses(data.expenses || []);
            calculateExpenses(data.expenses || []);
        } catch (error) {
            console.error('Error loading expenses: ', error);
        }
    };

    const calculateExpenses = (expenses) => {
        let total = 0;
        let recurringTotal = 0;
        let nonRecurringTotal = 0;

        expenses.forEach(item => {
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

        setTotalExpenses(total);
        setRecurringExpenses(recurringTotal);
        setNonRecurringExpenses(nonRecurringTotal);
    };

    const removeRecord = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/records?id=${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the record');
            }
    
            setExpenses((prevExpenses) => {
                const updatedExpenses = prevExpenses.filter(record => record._id !== id);
                calculateExpenses(updatedExpenses);
                return updatedExpenses;
            });
        } catch (error) {
            console.error('Error deleting income record: ', error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <ExpensesContext.Provider value={{ expenses, totalExpenses, recurringExpenses, nonRecurringExpenses, removeRecord }}>
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