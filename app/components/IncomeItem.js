"use client";

import { useIncome } from '../contexts/IncomeContext';
import Link from 'next/link';
import RemoveIncomeBtn from './RemoveBtn';

export default function IncomeItem() {
    const { records, totalIncome, removeRecord } = useIncome();

    return (
        <>
            {records.map(item => (
                <div key={item._id} className='p-4 w-64 border border-slate-300 flex justify-between mx-auto my-5'>
                    <div>
                        <h2 className='font-bold text-2xl'>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <RemoveIncomeBtn id={item._id} onRemove={() => removeRecord(item._id)} />
                        <Link href={`/dashboard/editIncome/${item._id}`}>
                            edit
                        </Link>
                    </div>
                </div>
            ))}
            <div className='text-center mt-6'>
                <h3 className='font-bold'>Gesamteinnahmen: {totalIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h3>
            </div>
        </>
    );
}