import Notebook from "./Notebook"
import axios from 'axios'
import { useEffect, useState } from "react"

interface note {
    id: number,
    title: string,
    body: string
}

interface notebook {
    [key: string]: note[]
}

const AllNotes = () => {
    const [notebooks, setNotebooks] = useState<null | notebook>(null)

    useEffect(() => {
        axios.get<notebook>('http://localhost:3001/notebooks')
            .then(response => {
                setNotebooks(response.data)
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <>
            {notebooks && Object.keys(notebooks).map(key => (
                <div key={key}>
                    <h2>{key}</h2>
                    <Notebook notebook={notebooks[key]}/>
                </div>
            ))}
        </>
    );
}

export default AllNotes;