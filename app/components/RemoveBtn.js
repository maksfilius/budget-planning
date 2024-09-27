"use client";

import { useRouter } from "next/navigation";

export default function  RemoveBtn({ id }) {
    const router = useRouter();
    const removeRecord = async() => {
        
        const confirmed = confirm("Are you sure?");

        if(confirmed) {
            try {
                const res = await fetch(`http://localhost:3000/api/records?id=${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    window.location.reload(); 
                } else {
                    console.error('Failed to delete the record');
                }
            } catch (error) {
                console.error('Error during deletion:', error);
            }
        }
    }

    return (
        <>
            <button onClick={removeRecord} className='btn text-red-400'>remove</button>
        </>
    )
}