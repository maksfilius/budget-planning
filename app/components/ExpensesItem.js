"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import RemoveOutcomeBtn from './RemoveOutcomeBtn';

const fetchExpenses = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/expenses', {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch expenses');
        }

        return res.json();
    } catch (error) {
        console.error('Error loading expenses: ', error);
        return { expenses: [] };
    }
};

export default function ExpensesItem() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const loadExpenses = async () => {
            const data = await fetchExpenses();
            setExpenses(data.expenses || []);
        };

        loadExpenses();
    }, []);

    const totalExpenses = expenses.reduce((sum, item) => {
        const amountString = item.title.replace(/[.,]/g, '');
        const amount = parseFloat(amountString) / 100; 
        return sum + (isNaN(amount) ? 0 : amount); 
    }, 0);

    return (
        <>
            {expenses.map(item => (
                <div key={item._id} className='p-4 w-64 border border-slate-300 flex justify-between mx-auto my-5'>
                    <div>
                        <h2 className='font-bold text-2xl'>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <RemoveOutcomeBtn id={item._id}  />
                        <Link href={`/dashboard/editExpense/${item._id}`}>
                            edit
                        </Link>
                    </div>
                </div>
            ))}
            <div className='text-center mt-6'>
                <h3 className='font-bold'>Gesamteinnahmen: {totalExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h3>
            </div>
        </>
    );
}