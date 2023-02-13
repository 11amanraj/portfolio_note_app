import styles from './NotesGallery.module.css'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { note, TypeofSelection } from '../../shared/interfaces/notes'
import SelectionContext from '../../store/selection-context';
import Loading from '../UI/Loading';

const NotesGallery: React.FC<{id: string | undefined}> = ({id}) => {
    const [notes, setNotes] = useState<note[]>([])
    const [loading, setLoading] = useState(false)
    
    // const selectCtx = useContext(SelectionContext)

    // const noteSelectionHandler = (id: string) => {
    //     selectCtx.onSelect(TypeofSelection.NOTE,id)
    // }

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