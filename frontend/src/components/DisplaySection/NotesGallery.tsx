import styles from './NotesGallery.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { note } from '../../shared/interfaces/notes'

const NotesGallery: React.FC<{id: string | null}> = ({id}) => {
    const [notes, setNotes] = useState<note[]>([])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/notebooks/${id}`)
            .then(response => {
                setNotes(response.data.notes)
            })
    }, [id])

    return (
        <div className={styles.container}>
            {notes.map(note => (
                <div key={note.id} className={styles.note}>
                    <div>
                        <h2>{note.title}</h2>
                        <p>{`by ${note.author}`}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
 
export default NotesGallery;