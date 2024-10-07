"use client";

import React, { useState, useEffect } from 'react';
import TabButton from '../components/TabButton';
import Income from '../pages/income';
import Expenses from '../pages/expenses';
import Balance from '../pages/balance';
import { IncomeProvider, useIncome } from '../contexts/IncomeContext';
import { ExpensesProvider, useExpenses } from '../contexts/ExpensesContext';

const DashboardContent = () => {
    const [selectedTab, setSelectedTab] = useState('income');
    const { totalIncome } = useIncome(); 
    const { totalExpenses } = useExpenses();

    useEffect(() => {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            setSelectedTab(savedTab);
        }
    }, []);

    const handleSelect = (tabName) => {
        setSelectedTab(tabName);
        localStorage.setItem('activeTab', tabName);
    };

    const renderSelectedTab = () => {
        if (selectedTab === 'income') return <Income />;
        if (selectedTab === 'expenses') return <Expenses />;
        return <Balance />;
    };

    return (
        <div className='flex flex-wrap lg:flex-nowrap h-screen'>
            <section className='basis-full lg:basis-1/5 block m-8 rounded-3xl'>
                <menu className='flex flex-col items-center'>
                    <TabButton 
                        className={selectedTab === 'income' ? 'active' : ''} 
                        onSelect={() => handleSelect('income')}
                    >
                        income
                    </TabButton>

                    <TabButton 
                        className={selectedTab === 'expenses' ? 'active' : ''} 
                        onSelect={() => handleSelect('expenses')}
                    >
                        expenses
                    </TabButton>

                    <TabButton 
                        className={selectedTab === 'balance' ? 'active' : ''} 
                        onSelect={() => handleSelect('balance')}
                    >
                        balance
                    </TabButton>
                </menu>
            </section>

            <section className='flex flex-col basis-full lg:basis-4/5'>
                <section className='block m-8 rounded-3xl flex-1'>
                    {renderSelectedTab()}
                </section>

                <section className='block m-8 rounded-3xl basis-full lg:basis-1/5 flex-none'>
                    <h2 className='text-center'>Zusätzlicher Block</h2>
                    <h3 className='text-center'>Gesamteinnahmen: {totalIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h3>
                    <h3 className='text-center'>Gesamtausgaben: {totalExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h3>
                </section>
            </section>
        </div>
    );
};

const Dashboard = () => {
    return (
        <IncomeProvider>
            <ExpensesProvider>
                <DashboardContent />
            </ExpensesProvider>
        </IncomeProvider>
    );
};

export default Dashboard;