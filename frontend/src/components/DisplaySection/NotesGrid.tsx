import { Link } from 'react-router-dom';
import { note } from '../../shared/interfaces/notes';
import SingleNote from '../NotesGallery/SingleNote';
import styles from './NotesGrid.module.css'

const NotesGrid: React.FC<{notes: note[], 
    onPin : (pinStatus: boolean, e: React.MouseEvent<HTMLButtonElement>, id: string) => void }
    > = ({onPin, notes}) => {
    // add grid details in database itself

    return ( 
        <div className={styles.container}>
            {notes[0] && <SingleNote id={notes[0].id}/>}
            {notes.map(note => (
                <div key={note.id}>
                {/* <div className={`${styles.note} ${styles[note.size]}`}> */}
                    <Link to={`/notebook/${note.notebook}/note/${note.id}`} className={styles.inner}>
                        <h2>{note.title}</h2>
                        <p>{`by ${note.author}`}</p>
                        <p>{note.stringDateCreated}</p>
                        <button onClick={(e) => onPin(note.pinned, e, note.id)}>
                            {note.pinned ? 'Unpin Note' : 'Pin Note'}
                        </button>
                    </Link>
                </div>
            ))}
        </div>
     );
}
 
export default NotesGrid;