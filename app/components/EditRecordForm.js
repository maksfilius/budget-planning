"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditRecordForm({ id, title, description }) {

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/records/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newTitle, newDescription }),
            });

            if(!res.ok) {
                throw new Error("Failed to update record")
            }
            
            router.push("/dashboard")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-48">
            <input 
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                type="text"
                placeholder="title" 
                className="border border-slate-500 px-8 py-2"
            />

            <input 
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                type="text"
                placeholder="description" 
                className="border border-slate-500 px-8 py-2"
            />

            <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                Update Topic
            </button>
        </form>
    )
}