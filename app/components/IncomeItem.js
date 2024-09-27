"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import RemoveBtn from './RemoveBtn';

const fetchRecords = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/records', {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch records');
        }

        return res.json();
    } catch (error) {
        console.error('Error loading records: ', error);
        return { records: [] };
    }
};

export default function IncomeItem() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const loadRecords = async () => {
            const data = await fetchRecords();
            setRecords(data.records || []);
        };

        loadRecords();
    }, []);

    const totalIncome = records.reduce((sum, item) => {
        const amountString = item.title.replace(/[.,]/g, '');
        const amount = parseFloat(amountString) / 100; 
        return sum + (isNaN(amount) ? 0 : amount); 
    }, 0);

    return (
        <>
            {records.map(item => (
                <div key={item._id} className='p-4 w-64 border border-slate-300 flex justify-between mx-auto my-5'>
                    <div>
                        <h2 className='font-bold text-2xl'>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <RemoveBtn id={item._id} />
                        <Link href={`/dashboard/editRecord/${item._id}`}>
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