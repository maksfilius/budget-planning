"use client";

import { useIncome } from '../contexts/IncomeContext';
import Link from 'next/link';
import RemoveIncomeBtn from './RemoveBtn';

export default function IncomeItem() {
    const { records, totalIncome, recurringIncome, nonRecurringIncome, removeRecord } = useIncome();

    const recurringItems = records.filter(item => item.isRecurring);
    const nonRecurringItems = records.filter(item => !item.isRecurring);

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
                                <RemoveIncomeBtn id={item._id} onRemove={() => removeRecord(item._id)} />
                                <Link href={`/dashboard/editIncome/${item._id}`}>
                                    edit
                                </Link>
                            </div>
                        </div>
                    ))}
                    <h3 className='font-bold'>
                        Total Non-Recurring Income: {nonRecurringIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </h3>
                </div>

                <div>
                    <h2 className="text-center">Recurring Income</h2>
                    {recurringItems.map(item => (
                        <div key={item._id} className='p-4 w-64 border border-slate-300 flex justify-between mx-auto my-5'>
                            <div>
                                <h2 className='font-bold text-2xl'>{item.title}</h2>
                                <p>{item.description}</p>
                                <p>Recurrence: {item.recurrenceFrequency}</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <RemoveIncomeBtn id={item._id} onRemove={() => removeRecord(item._id)} />
                                <Link href={`/dashboard/editIncome/${item._id}`}>
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