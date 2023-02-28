import axios from "axios";
import { useState, useEffect } from 'react'
import { note } from "../../shared/interfaces/notes";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    const [editNote, setEditNote] = useState(false)
    const [value, setValue] = useState('')

    const editToggler = () => {
        setEditNote(prev => !prev)
    }

    useEffect(() => {
        // sets editNote to false when changing route
        setEditNote(false)
        axios
            .get(`http://localhost:8000/api/notes/${id}`)
            .then(response => {
                setNote(response.data)
                setValue(response.data.content)
            })
    }, [id])

    const saveNoteHandler = () => {
        axios
            .put(`http://localhost:8000/api/notes/${id}`, {
                content: value,
                dateModified: new Date()
            })
            .then(response => {
                console.log(response)
                setEditNote(false)
            })
    }

    const editing = () => {
        return (
            <div>
                <h1>Editing</h1>
                <button onClick={saveNoteHandler}>Save Note</button>
                <ReactQuill theme='snow' readOnly={false} value={value} onChange={setValue} />
            </div>
        )
    }

    const viewNote = () => {
        return (
            <div>
                <ReactQuill theme='bubble' readOnly={true} value={value} onChange={setValue} />
            </div>
        )
    }

    return ( 
        <div>
            <button onClick={editToggler}>{editNote ? 'Cancel Editing' : 'Edit Note'}</button>
            <h1>{note.title}</h1>
            {editNote 
                ? editing()
                : viewNote()
            }
        </div>
     );
}
 
export default DetailedNote;