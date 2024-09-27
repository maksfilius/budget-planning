import EditRecordForm from "../../../components/EditRecordForm";

const getRecordById = async(id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/records/${id}`, {
            cache: "no-store",
        });

        if(!res.ok) {
            throw new Error("Failed to fetch record")
        }
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export default async function EditRecord({ params }) {
    const { id } = params;
    const {record} = await getRecordById(id);
    const { title, description } = record;

    return (
        <EditRecordForm id={id} title={title} description={description} />
    )
}