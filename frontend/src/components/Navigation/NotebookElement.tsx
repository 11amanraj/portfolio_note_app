import styles from './NotebookElement.module.css'
import NoteContext from '../../store/note-context';
import { useContext } from 'react';
import { note } from '../../shared/interfaces/notes';

const NotebookElement: React.FC<{title: String, onSelect: (notebook: note[]) => void}> = ({title, onSelect}) => {
    const noteCtx = useContext(NoteContext)

    return ( 
        <div className={styles.container}>
            <h2 onClick={() => onSelect(noteCtx.notebooks[`${title}`])}>{title}</h2>
            <ul>
                {noteCtx.notebooks[`${title}`].map(note => (
                    <li key={Math.random()} onClick={() => onSelect([note])}>{note.title}</li>
                ))}
            </ul>
        </div>
     );
}
 
export default NotebookElement;