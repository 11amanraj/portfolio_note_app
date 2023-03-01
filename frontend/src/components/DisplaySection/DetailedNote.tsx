import axios from "axios";
import { useState, useEffect } from 'react'
import { note } from "../../shared/interfaces/notes";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router-dom";
import LoadingButton from "../UI/LoadingButton";
import Loading from "../UI/Loading";

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
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(true)

    const editToggler = () => {
        setEditNote(prev => !prev)
    }

    const location = useLocation()

    useEffect(() => {
        // sets editNote to false when changing route

        if(location.state === null) {
            setEditNote(false)
        } else {
            if(location.state.edit) {
                setEditNote(true)
            }
        }

        setFetchLoading(true)

        axios
            .get(`http://localhost:8000/api/notes/${id}`)
            .then(response => {
                setFetchLoading(false)
                setNote(response.data)
                setValue(response.data.content)
            })
    }, [id, location])

    const saveNoteHandler = () => {
        setLoading(true)
        axios
            .put(`http://localhost:8000/api/notes/${id}`, {
                content: value,
                dateModified: new Date()
            })
            .then(response => {
                setLoading(false)
                console.log(response)
                setEditNote(false)
            })
    }

    const editing = () => {
        return (
            <div>
                <h1>Editing</h1>
                <LoadingButton onSave={saveNoteHandler} loading={loading}/>
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

    if(fetchLoading) {
        return (
            <Loading />
        )
    } else {
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

}
 
export default DetailedNote;