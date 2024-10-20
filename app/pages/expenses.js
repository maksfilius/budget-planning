import React from 'react';
import Link from 'next/link';
import ExpensesItem from '../components/ExpensesItem';
import MonthSelector from '../components/MonthSelector';

export default function Expenses() {
    return (
        <>
            <div className='text-center my-6'>
                <h2>Ausgaben</h2>
            </div>
            <div className='flex justify-center'>
                <MonthSelector />
                <Link className='border p-4' href={'/dashboard/addExpense'}>
                    Add Expense
                </Link>
            </div>
            <ExpensesItem />
        </>
    );
};