"use client";

import { useState } from 'react';
import { useIncome } from '../contexts/IncomeContext';
import Link from 'next/link';
import RemoveIncomeBtn from './RemoveBtn';

export default function IncomeItem() {
    const { records, totalIncome, recurringIncome, nonRecurringIncome, removeRecord } = useIncome();
    
    const recurringItems = records.filter(item => item.isRecurring);
    const nonRecurringItems = records.filter(item => !item.isRecurring);

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const months = Array.from({ length: 12 }, (_, i) => {
        return new Date(0, i).toLocaleString('de-DE', { month: 'long' });
    });

    const filteredNonRecurringItems = nonRecurringItems.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === selectedMonth;
    });

    const totalNonRecurringIncome = filteredNonRecurringItems.reduce((total, item) => {
        return total + parseFloat(item.title.replace('€', '').replace('.', '').replace(',', '.'));
    }, 0);

    return (
        <>
            <div className='flex flex-wrap justify-around'>
                <div>
                    <h2 className="text-center">One-time Income</h2>
                    
                    <div className="text-center mb-4">
                        <label htmlFor="month-select">Select Month: </label>
                        <select
                            id="month-select"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                            className="ml-2 border border-slate-300 p-1"
                        >
                            {months.map((month, index) => (
                                <option key={index} value={index}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {filteredNonRecurringItems.map(item => (
                        <div key={item._id} className='p-4 w-64 border border-slate-300 flex justify-between mx-auto my-5'>
                            <div>
                                <h2 className='font-bold text-2xl'>{item.title}</h2>
                                <p>{item.description}</p>
                                <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <RemoveIncomeBtn id={item._id} onRemove={() => removeRecord(item._id)} />
                                <Link href={`/dashboard/editRecord/${item._id}`}>
                                    edit
                                </Link>
                            </div>
                        </div>
                    ))}
                    <h3 className='font-bold'>
                        Total Non-Recurring Income: {totalNonRecurringIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
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
                                <RemoveIncomeBtn id={item._id} onRemove={() => removeRecord(item._id)} />
                                <Link href={`/dashboard/editRecord/${item._id}`}>
                                    edit
                                </Link>
                            </div>
                        </div>
                    ))}
                    <h3 className='font-bold'>
                        Total Recurring Income: {recurringIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </h3>
                </div>

                <div className='text-center mt-6 w-full'>
                    <h3 className='font-bold'>
                        Total Income: {totalIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </h3>
                </div>
            </div>
        </>
    );
}