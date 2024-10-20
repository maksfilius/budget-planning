import React from 'react';
import Link from 'next/link';
import IncomeItem from '../components/IncomeItem';
import MonthSelector from '../components/MonthSelector';

export default function Income() {

    return (
        <>
            <div className='text-center m-6 flex font-black'>
                <MonthSelector />
                <Link className='border p-4 ms-auto rounded-lg' href={'/dashboard/addRecord'}>
                    Add Income
                </Link>
            </div>
            <IncomeItem />
        </>
    );
};