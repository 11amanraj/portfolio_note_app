import styles from './NotesGallery.module.css'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { note, TypeofSelection } from '../../shared/interfaces/notes'
import SelectionContext from '../../store/selection-context';

const NotesGallery: React.FC<{id: string | null}> = ({id}) => {
    const [notes, setNotes] = useState<note[]>([])
    
    const selectCtx = useContext(SelectionContext)

    const noteSelectionHandler = (id: string) => {
        selectCtx.onSelect(TypeofSelection.NOTE,id)
    }

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
                <div key={note.id} className={styles.note} onClick={() => noteSelectionHandler(note.id)}>
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