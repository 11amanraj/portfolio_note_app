import styles from './EditNote.module.css'
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const EditNote: React.FC<{id: string}> = ({id}) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/notes/${id}`)
            .then(response => {
                setValue(response.data.content)
            })
    }, [])

    return ( 
        <ReactQuill theme='snow' value={value} onChange={setValue} />
     );
}
 
export default EditNote;