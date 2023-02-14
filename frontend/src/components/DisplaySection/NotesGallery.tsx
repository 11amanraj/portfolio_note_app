import styles from './NotesGallery.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { note } from '../../shared/interfaces/notes'
import Loading from '../UI/Loading';
import { Link } from 'react-router-dom'

const NotesGallery: React.FC<{id: string | undefined}> = ({id}) => {
    const [notes, setNotes] = useState<note[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get(`http://localhost:8000/api/notebooks/${id}`)
            .then(response => {
                setNotes(response.data.notes)
                setLoading(false)
            })
    }, [id])

    if (loading) return <Loading />

    return (
        <div className={styles.container}>
            {notes.map(note => (
                <Link key={note.id} to={`/notebook/${id}/note/${note.id}`}>
                    <div className={styles.note}>
                        <div>
                            <h2>{note.title}</h2>
                            <p>{`by ${note.author}`}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )

}
 
export default NotesGallery;