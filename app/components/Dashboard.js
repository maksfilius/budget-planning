"use client";

import React, { useState, useEffect } from 'react';
import TabButton from '../components/TabButton';
import Income from '../pages/income';
import Expenses from '../pages/expenses';
import Balance from '../pages/balance';
import { IncomeProvider, useIncome } from '../contexts/IncomeContext';
import { ExpensesProvider, useExpenses } from '../contexts/ExpensesContext';
import { MonthProvider, useMonth } from '../contexts/MonthContext';
import { DarkThemeToggle, Flowbite, Drawer, Sidebar, TextInput } from "flowbite-react";
import {
    HiSearch,
    HiMenuAlt1 ,
} from "react-icons/hi";
import { RiSettings5Fill, RiLogoutCircleRLine } from "react-icons/ri";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";

const DashboardContent = () => {
    const [selectedTab, setSelectedTab] = useState('income');
    const { totalMonthlyIncome, nonRecurringIncome, recurringIncome } = useIncome(); 
    const { totalExpenses } = useExpenses();

    const [isOpen, setIsOpen] = useState(false);

    const { selectedMonth } = useMonth();

    const handleClose = () => setIsOpen(false);

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

    const handleIncomeUpdate = (newTotal) => {
        setTotalMonthlyIncome(newTotal);
    };

    const months = Array.from({ length: 12 }, (_, i) => {
        return new Date(0, i).toLocaleString('de-DE', { month: 'long' });
    });

    return (
        <div className='flex flex-col lg:flex-row h-screen'>
            <aside className="block lg:hidden">
                <div className="flex items-center justify-center">
                    <HiMenuAlt1 onClick={() => setIsOpen(true)} size={42 } />
                </div>
                <Drawer open={isOpen} onClose={handleClose}>
                    <Drawer.Header title="MENU" titleIcon={() => <></>} />
                    <Drawer.Items>
                    <Sidebar
                        aria-label="Sidebar with multi-level dropdown example"
                        className="[&>div]:bg-transparent [&>div]:p-0"
                    >
                        <div className="flex h-full flex-col justify-between py-2">
                        <div>
                            <form className="pb-3 md:hidden">
                            <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                            </form>
                            <Sidebar.Items>
                            <Sidebar.ItemGroup>
                                <TabButton 
                                    className={selectedTab === 'income' ? 'active' : ''} 
                                    onSelect={() => handleSelect('income')}
                                >
                                    <GiReceiveMoney />
                                    income
                                </TabButton>
                                <TabButton 
                                    className={selectedTab === 'expenses' ? 'active' : ''} 
                                    onSelect={() => handleSelect('expenses')}
                                >
                                    <GiPayMoney />
                                    expenses
                                </TabButton>
                            </Sidebar.ItemGroup>
                            </Sidebar.Items>
                        </div>
                        </div>
                    </Sidebar>
                    </Drawer.Items>
                </Drawer>
            </aside>
            
            <aside className='basis-full hidden lg:block lg:basis-1/6 block m-4 rounded-3xl'>
                <div className='flex flex-col items-center'>
                    <div className='m-5 p-5'>Logo</div>
                    <TabButton 
                        className={selectedTab === 'income' ? 'active' : ''} 
                        onSelect={() => handleSelect('income')}
                    >
                        <GiReceiveMoney size={40} />
                        Incomes
                    </TabButton>

                    <TabButton 
                        className={selectedTab === 'expenses' ? 'active' : ''} 
                        onSelect={() => handleSelect('expenses')}
                    >
                        <GiPayMoney size={40} />
                        Expenses
                    </TabButton>
                </div>
            </aside>

            <main className='flex flex-col basis-full lg:basis-5/6'>
                <section className='pt-4 p-4 lg:pe-4 lg:ps-0'>
                    <div className='flex items-center justify-end gap-7 block  py-4 px-6 rounded-3xl'>
                        <p className='me-auto'>Hi <strong>Max</strong></p>
                        <Flowbite>
                            <DarkThemeToggle />
                        </Flowbite>
                        <RiSettings5Fill className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                        <RiLogoutCircleRLine className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                    </div>
                </section>
                <section className='border-custom me-4 m-4 lg:ms-0 rounded-3xl flex-1 flex flex-col h-3/6'>
                    {renderSelectedTab()}
                </section>

                <section className='block mb-4 m-4 lg:ms-0 p-6 rounded-3xl flex-none'>
                    <div className='flex justify-between'>
                        <div className='text-center'>
                            <h4 className='font-bold'>
                                Month: {months[selectedMonth]}
                            </h4>
                        </div>
                        <h4 className='text-center'>Total expenses: {totalExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h4>
                        <h4 className='text-center'>Total incomes: {totalMonthlyIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h4>
                    </div>
                </section>
            </main>
        </div>
    );
};

const Dashboard = () => {
    return (
        <IncomeProvider>
            <ExpensesProvider>
                <MonthProvider>
                    <DashboardContent />
                </MonthProvider>
            </ExpensesProvider>
        </IncomeProvider>
    );
};

export default Dashboard;