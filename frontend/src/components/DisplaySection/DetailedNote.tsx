import axios from "axios";
import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
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

    const location = useLocation()

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/notes/${id}`)
            .then(response => 
                setNote(response.data)
            )
    }, [id])

    return ( 
        <div>
            <Link to={`${location.pathname}/edit`}><p>Edit Note</p></Link>
            <button>Edit Note</button>
            <h1>{note.title}</h1>
            <h1>{note.author}</h1>
            <div>{note.content}</div>
        </div>
     );
}
 
export default DetailedNote;