"use client";

import { useExpenses } from '../contexts/ExpensesContext';
import Link from 'next/link';
import RemoveOutcomeBtn from './RemoveOutcomeBtn';

export default function ExpensesItem() {
    const { expenses, totalExpenses } = useExpenses();

    return (
        <>
            {expenses.map(item => (
                <div key={item._id} className='p-4 w-64 border border-slate-300 flex justify-between mx-auto my-5'>
                    <div>
                        <h2 className='font-bold text-2xl'>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <RemoveOutcomeBtn id={item._id} />
                        <Link href={`/dashboard/editExpense/${item._id}`}>
                            edit
                        </Link>
                    </div>
                </div>
            ))}
            <div className='text-center mt-6'>
                <h3 className='font-bold'>Gesamtausgaben: {totalExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h3>
            </div>
        </>
    );
}