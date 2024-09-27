"use client"

import React, { useState, useEffect } from 'react';
import TabButton from '../components/TabButton';
import Income from '../pages/income';
import Expenses from '../pages/expenses';
import Balance from '../pages/balance'

const Dashboard = () => {
    const [ selectedTab, setSelectedTab ] = useState(Income);

    useEffect(() => {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            setSelectedTab(savedTab === 'income' ? Income : savedTab === 'expenses' ? Expenses : Balance);
        }
    }, []);

    const handleSelect = (selectedButton) => {
        setSelectedTab(selectedButton);
        const tabName = selectedButton === Income ? 'income' : selectedButton === Expenses ? 'expenses' : 'balance';
        localStorage.setItem('activeTab', tabName);
    };

    return (
        <div className='flex flex-wrap lg:flex-nowrap h-screen'>
            <section className='basis-full lg:basis-1/5 block m-8 rounded-3xl'>
                <menu className='flex flex-col items-center'>
                    <TabButton onSelect={() => handleSelect(Income)}>income</TabButton>
                    <TabButton onSelect={() => handleSelect(Expenses)}>expenses</TabButton>
                    <TabButton onSelect={() => handleSelect(Balance)}>balance</TabButton>
                </menu>
            </section>
            
            <section className='flex flex-col basis-full lg:basis-4/5'>
                <section className='block m-8 rounded-3xl flex-1'>
                    {selectedTab}
                </section>

                <section className='block m-8 rounded-3xl basis-full lg:basis-1/5 flex-none'>
                    <h2 className='text-center'>Zusätzlicher Block</h2>
                </section>
            </section>
        </div>
    );
};

export default Dashboard ;