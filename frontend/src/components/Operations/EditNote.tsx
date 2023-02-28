import styles from './EditNote.module.css'
import { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { note } from '../../shared/interfaces/notes';
import { Link, useLocation } from 'react-router-dom';

const EditNote: React.FC<{id: string | undefined}> = ({id}) => {
    const [note, setNote] = useState<note>({
        title: '',
        content: '',
        author: '',
        id: '',
        dateCreated: new Date(0),
        dateModified: new Date(0),
        pinned: false
    })
    const [value, setValue] = useState('')
    const titleRef = useRef<HTMLInputElement>(null)
    const location = useLocation()
    const url = location.pathname.split('/').slice(0,-1).join('/')

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/notes/${id}`)
            .then(response => {
                setNote(response.data)
                setValue(response.data.content)
                if(titleRef.current) {
                    titleRef.current.value = response.data.title
                }
            })
    }, [])

    return (
        <div>
            <div>
                <Link to={url}>Save Note</Link>
                <input ref={titleRef}/>
            </div>
            <ReactQuill theme='snow' value={value} onChange={setValue} />
        </div> 
     );
}
 
export default EditNote;