import { useMonth } from '../contexts/MonthContext';

export default function MonthSelector() {
    const { selectedMonth, setSelectedMonth } = useMonth();

    const months = Array.from({ length: 12 }, (_, i) => {
        return new Date(0, i).toLocaleString('de-DE', { month: 'long' });
    });

    return (
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
    );
}