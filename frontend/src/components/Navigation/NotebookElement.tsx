import styles from './NotebookElement.module.css'
import NoteContext from '../../store/note-context';
import { useContext } from 'react';
import { note } from '../../shared/interfaces/notes';

const NotebookElement: React.FC<{title: String, onSelect: (notebook: note[]) => void, maxSize: boolean}> = ({title, onSelect, maxSize}) => {
    const noteCtx = useContext(NoteContext)

    const titleSelectionHandler = () => {
        onSelect(noteCtx.notebooks[`${title}`])
    }

    return ( 
        <div className={maxSize ? styles.container : styles.hidden}>
            <div onClick={titleSelectionHandler} className={styles.title}>
                <h2>{title}</h2>
            </div>
            <ul>
                {noteCtx.notebooks[`${title}`].map(note => (
                    <li key={Math.random()} onClick={() => onSelect([note])}>{note.title}</li>
                ))}
            </ul> 
        </div>
     );
}
 
export default NotebookElement;