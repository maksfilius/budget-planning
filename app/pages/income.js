import React from 'react';
import Link from 'next/link';
import IncomeItem from '../components/IncomeItem';

export default function Income() {

    return (
        <>
            <div className='text-center my-6'>
                <h2>Income titel</h2>
            </div>
            <div className='flex justify-center'>
                <Link className='border p-4' href={'/dashboard/addRecord'}>
                    Add Income
                </Link>
            </div>
            <IncomeItem />
        </>
    );
};