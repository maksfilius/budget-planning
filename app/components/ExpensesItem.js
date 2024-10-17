"use client";

import { useExpenses } from '../contexts/ExpensesContext';
import Link from 'next/link';
import RemoveOutcomeBtn from './RemoveOutcomeBtn';

export default function ExpensesItem() {
    const { expenses, totalExpenses, recurringExpenses, nonRecurringExpenses, removeRecord } = useExpenses();

    const recurringItems = expenses.filter(item => item.isRecurring);
    const nonRecurringItems = expenses.filter(item => !item.isRecurring);

    return (
        <>
            <div className='flex flex-wrap justify-around'>
                <div>
                    <h2 className="text-center">One-time Income</h2>
                    {nonRecurringItems.map(item => (
                        <div key={item._id} className='p-4 w-64 border border-slate-300 flex justify-between mx-auto my-5'>
                            <div>
                                <h2 className='font-bold text-2xl'>{item.title}</h2>
                                <p>{item.description}</p>
                                <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <RemoveOutcomeBtn id={item._id} onRemove={() => removeRecord(item._id)} />
                                <Link href={`/dashboard/editExpens/${item._id}`}>
                                    edit
                                </Link>
                            </div>
                        </div>
                    ))}
                    <h3 className='font-bold'>
                        Total Non-Recurring Income: {nonRecurringExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </h3>
                </div>

                <div>
                    <h2 className="text-center">Recurring Income</h2>
                    {recurringItems.map(item => (
                        <div key={item._id} className='p-4 w-64 border border-slate-300 flex justify-between mx-auto my-5'>
                            <div>
                                <h2 className='font-bold text-2xl'>{item.title}</h2>
                                <p>{item.description}</p>
                                <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                                <p>Recurrence: {item.recurrenceFrequency}</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <RemoveOutcomeBtn id={item._id} onRemove={() => removeRecord(item._id)} />
                                <Link href={`/dashboard/editExpens/${item._id}`}>
                                    edit
                                </Link>
                            </div>
                        </div>
                    ))}
                    <h3 className='font-bold'>
                        Total Recurring Income: {recurringExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </h3>
                </div>

                <div className='text-center mt-6 w-full'>
                    <h3 className='font-bold'>
                        Total Income: {totalExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </h3>
                </div>
            </div>
        </>
    );
}