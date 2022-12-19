import styles from './NotebookElement.module.css'
import NoteContext from '../../store/note-context';
import { useContext, useState } from 'react';
import { note } from '../../shared/interfaces/notes';
import SelectionContext from '../../store/selection-context';

const NotebookElement: React.FC<{title: String, maxSize: boolean}> = ({title, maxSize}) => {
    const [showList, setShowList] = useState(false);
    const noteCtx = useContext(NoteContext)
    const selectCtx = useContext(SelectionContext)

    const showListHandler = () => {
        selectCtx.onSelect('notebook',noteCtx.notebooks[`${title}`])
        setShowList(prev => !prev)
    }

    const selectListHandler = (note: note) => {
        selectCtx.onSelect('note', [note])
    }

    return ( 
        <div className={maxSize ? styles.container : styles.hidden}>
            <div onClick={showListHandler} className={styles.title}>
                <h2>{title}</h2>
            </div>
            {showList && <ul>
                {noteCtx.notebooks[`${title}`].map(note => (
                    <li onClick={() => selectListHandler(note)} key={Math.random()}>{note.title}</li>
                ))}
            </ul> }
        </div>
     );
}
 
export default NotebookElement;