"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddRecord() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrenceFrequency, setRecurrenceFrequency] = useState("monthly");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!title || !description || !date) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/records", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ title, description, date, isRecurring, recurrenceFrequency })
            });

            if(res.ok) {
                router.push("/dashboard");
            } else {
                throw new Error("Failed to create a record");
            }
        } catch(error) {
            console.log(error)
        }
    };

    const handleTitleChange = (e) => {
        const value = e.target.value;

        if (/^[0-9]*[.,]?[0-9]*$/.test(value)) {
            setTitle(value);
            setError("");
        } else {
            setError("Bitte nur Zahlen eingeben.");
        }
    };

    const handleTitleBlur = () => {
        if (title !== "" && /^[0-9]+([.,][0-9]{1,2})?$/.test(title)) {
            const formattedTitle = parseFloat(title.replace(",", ".")).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
            setTitle(formattedTitle);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen"> 
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-48">
                <input 
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlur}
                    value={title}
                    type="text"
                    placeholder="Title" 
                    className="border border-slate-500 px-8 py-2"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <input 
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    placeholder="Description" 
                    className="border border-slate-500 px-8 py-2"
                />

                <input 
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    type="date"
                    placeholder="Date" 
                    className="border border-slate-500 px-8 py-2"
                />

                <label>
                    <input 
                        type="checkbox" 
                        checked={isRecurring} 
                        onChange={(e) => setIsRecurring(e.target.checked)} 
                    />
                    Is this recurring?
                </label>

                {isRecurring && (
                    <select
                        value={recurrenceFrequency}
                        onChange={(e) => setRecurrenceFrequency(e.target.value)}
                        className="border border-slate-500 px-8 py-2"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                )}

                <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                    Add Record
                </button>
            </form>
        </div>
    )
}
