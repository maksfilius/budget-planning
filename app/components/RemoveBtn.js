"use client";

export default function RemoveBtn({ id, onRemove }) {
    const removeRecord = async () => {
        const confirmed = confirm("Sind Sie sicher, dass Sie diesen Datensatz löschen möchten?");

        if (confirmed) {
            try {
                const res = await fetch(`http://localhost:3000/api/records?id=${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    onRemove();
                } else {
                    console.error('Failed to delete the record');
                }
            } catch (error) {
                console.error('Error during deletion:', error);
            }
        }
    };

    return (
        <button onClick={removeRecord} className='btn text-red-400'>
            Entfernen
        </button>
    );
}