import axios from "axios";
import { useState, useEffect } from 'react'
import { note } from "../../shared/interfaces/notes";

const DetailedNote: React.FC<{id: string | undefined}> = ({id}) => {
    const [note, setNote] = useState<note>({
        title: '',
        content: '',
        author: '',
        id: '',
        dateCreated: new Date(0),
        dateModified: new Date(0),
        pinned: false
    })

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/notes/${id}`)
            .then(response => 
                setNote(response.data)
            )
    }, [id])

    return ( 
        <div>
            <h1>{note.title}</h1>
            <h1>{note.author}</h1>
            <div>{note.content}</div>
        </div>
     );
}
 
export default DetailedNote;