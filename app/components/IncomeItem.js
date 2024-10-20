import { useMonth } from '../contexts/MonthContext';
import { useIncome } from '../contexts/IncomeContext';
import Link from 'next/link';
import RemoveIncomeBtn from './RemoveBtn';
import { RiEditLine } from "react-icons/ri";

export default function IncomeItem() {
    const { selectedMonth } = useMonth();
    const { records, recurringIncome,nonRecurringIncome, removeRecord } = useIncome();
    
    const recurringItems = records.filter(item => item.isRecurring);
    const nonRecurringItems = records.filter(item => !item.isRecurring);

    const filteredNonRecurringItems = nonRecurringItems.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === selectedMonth;
    });

    const totalNonRecurringIncome = filteredNonRecurringItems.reduce((total, item) => {
        return total + parseFloat(item.title.replace('€', '').replace('.', '').replace(',', '.'));
    }, 0);

    const totalMonthlyIncome = totalNonRecurringIncome + recurringIncome;

    return (
        <div className='flex flex-wrap mx-6 grow'>
            <div className='flex justify-center lg:justify-between w-full lg:h-5/6 flex-wrap'>
                <div>
                    <h3 className="text-center">One-time Income</h3>
                    
                    {filteredNonRecurringItems.map(item => (
                        <div key={item._id} className='w-64 p-4 rounded-lg justify-between mx-auto my-5 block'>
                            <div className="flex gap-2.5 w-full items-center">
                                <div className='font-bold text-2xl me-auto'>{item.title}</div>
                                <RemoveIncomeBtn id={item._id} onRemove={() => removeRecord(item._id)} />
                                <Link href={`/dashboard/editRecord/${item._id}`}>
                                    <RiEditLine />
                                </Link>
                            </div>
                            
                            <p>{item.description}</p>
                            <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                        </div>
                    ))}
                    <h4 className='font-bold'>
                        Total Non-Recurring Income: {totalNonRecurringIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </h4>
                </div>

                <div >
                    <h3 className="text-center">Recurring Income</h3>
                    <div className='lg:h-5/6 overflow-y-scroll'>
                        {recurringItems.map(item => (
                            <div key={item._id} className='w-64 p-4 rounded-lg justify-between mx-auto my-5 block'>
                                <div className="flex gap-2.5 w-full items-center">
                                    <div className='font-bold text-2xl me-auto'>{item.title}</div>
                                    <RemoveIncomeBtn id={item._id} onRemove={() => removeRecord(item._id)} />
                                    <Link href={`/dashboard/editRecord/${item._id}`}>
                                        <RiEditLine />
                                    </Link>
                                </div>

                                <p className='text-sm'>{item.description}</p>
                                <div className='flex justify-between'>
                                    <p className='text-xs'>Date: {new Date(item.date).toLocaleDateString()}</p>
                                    <p className='text-xs'>Recurrence: {item.recurrenceFrequency}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h4 className='font-bold'>
                        Total Recurring Income: {recurringIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </h4>
                </div>
            </div>

            <div className='text-right mt-6 w-full'>
                <h4 className='font-bold'>
                    Total monthly Income: {totalMonthlyIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </h4>
            </div>
        </div>
    );
}
