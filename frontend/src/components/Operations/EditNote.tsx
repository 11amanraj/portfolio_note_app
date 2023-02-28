import styles from './EditNote.module.css'
import { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
// import { note } from '../../shared/interfaces/notes';
// import { Link, useLocation } from 'react-router-dom';

const EditNote: React.FC<{content: string | undefined}> = ({content}) => {
    // const [note, setNote] = useState<note>({
    //     title: '',
    //     content: '',
    //     author: '',
    //     id: '',
    //     dateCreated: new Date(0),
    //     dateModified: new Date(0),
    //     pinned: false
    // })
    const [value, setValue] = useState(content)
    // const titleRef = useRef<HTMLInputElement>(null)
    // const location = useLocation()
    // const url = location.pathname.split('/').slice(0,-1).join('/')

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8000/api/notes/${id}`)
    //         .then(response => {
    //             // setNote(response.data)
    //             setValue(response.data.content)
    //             // if(titleRef.current) {
    //             //     titleRef.current.value = response.data.title
    //             // }
    //         })
    // }, [id])

    return (
        <ReactQuill theme='snow' readOnly={false} value={value} onChange={setValue} />
        // <ReactQuill theme='bubble' readOnly={true} value={value} onChange={setValue} />
     );
}
 
export default EditNote;