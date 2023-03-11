import { Link } from 'react-router-dom';
import { note } from '../../shared/interfaces/notes';
import styles from './NotesGrid.module.css'

const NotesGrid: React.FC<{notes: note[]}> = ({notes}) => {
    // add grid details in database itself

    return ( 
        <div className={styles.container}>
            {notes.map(note => (
                <div key={note.id}>
                {/* <div className={`${styles.note} ${styles[note.size]}`}> */}
                    <Link to={`/notebook/${note.notebook}/note/${note.id}`} className={styles.inner}>
                        <h2>{note.title}</h2>
                        <p>{`by ${note.author}`}</p>
                        <p>{note.stringDateCreated}</p>
                    </Link>
                </div>
            ))}
        </div>
     );
}
 
export default NotesGrid;