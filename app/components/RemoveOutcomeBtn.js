"use client";

import { useRouter } from "next/navigation";

export default function RemoveOutcomeBtn({ id }) {
    const router = useRouter();

    const removeOutcome = async () => {
        const confirmed = confirm("Are you sure you want to delete this expense?");

        if (confirmed) {
            try {
                const res = await fetch(`http://localhost:3000/api/expenses?id=${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    window.location.reload(); 
                } else {
                    console.error('Failed to delete the expense:', errorData.message);
                }
            } catch (error) {
                console.error('Error during deletion:', error);
            }
        }
    };

    return (
        <button onClick={removeOutcome} className='btn text-red-400'>
            Remove
        </button>
    );
}