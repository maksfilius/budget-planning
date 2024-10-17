"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditRecordForm({ id, title, description, date }) {
    const [newTitle, setNewTitle] = useState(title);
    const [numericValue, setNumericValue] = useState(title.replace(/[^\d.,]/g, ""));
    const [newDescription, setNewDescription] = useState(description);
    const [newDate, setNewDate] = useState(date);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setNewTitle(title);
        setNumericValue(title.replace(/[^\d.,]/g, ""));
        setNewDescription(description);
        setNewDate(date);
    }, [title, description, date]);

    const handleTitleChange = (e) => {
        const value = e.target.value.replace(/[^\d.,]/g, "");

        if (/^[0-9]*[.,]?[0-9]*$/.test(value)) {
            setNumericValue(value);
            setError("");
        } else {
            setError("Bitte nur Zahlen eingeben.");
        }
    };

    const handleTitleFocus = () => {
        setIsEditing(true);
    };

    const handleTitleBlur = () => {
        setIsEditing(false);
        if (numericValue !== "" && /^[0-9]+([.,][0-9]{1,2})?$/.test(numericValue)) {
            const formattedTitle = parseFloat(numericValue.replace(",", ".")).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
            setNewTitle(formattedTitle);
        } else {
            setNewTitle(numericValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/records/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newTitle, newDescription, newDate }),
            });

            if (!res.ok) {
                throw new Error("Failed to update record");
            }

            router.push("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-48">
                <input
                    onChange={handleTitleChange}
                    onFocus={handleTitleFocus}
                    onBlur={handleTitleBlur}
                    value={isEditing ? numericValue : newTitle}
                    type="text"
                    placeholder="Title"
                    className="border border-slate-500 px-8 py-2"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <input
                    onChange={(e) => setNewDescription(e.target.value)}
                    value={newDescription}
                    type="text"
                    placeholder="Description"
                    className="border border-slate-500 px-8 py-2"
                />

                <input
                    onChange={(e) => setNewDate(e.target.value)}
                    value={newDate}
                    type="date"
                    placeholder="Date"
                    className="border border-slate-500 px-8 py-2"
                />

                <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                    Update Topic
                </button>
            </form>
        </div>
    );
}