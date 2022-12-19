import styles from './NotebookElement.module.css'
import NoteContext from '../../store/note-context';
import { useContext, useState } from 'react';
import { note } from '../../shared/interfaces/notes';

const NotebookElement: React.FC<{title: String, onSelect: (notebook: note[]) => void, maxSize: boolean}> = ({title, maxSize, onSelect}) => {
    const [showList, setShowList] = useState(false);
    const noteCtx = useContext(NoteContext)

    // const titleSelectionHandler = () => {
    //     onSelect(noteCtx.notebooks[`${title}`])
    // }

    const showListHandler = () => {
        onSelect(noteCtx.notebooks[`${title}`])
        setShowList(prev => !prev)
    }

    console.count('render: ')

    return ( 
        <div className={maxSize ? styles.container : styles.hidden}>
            <div onClick={showListHandler} className={styles.title}>
            {/* <div onClick={titleSelectionHandler} className={styles.title}> */}
                <h2>{title}</h2>
            </div>
            {showList && <ul>
                {noteCtx.notebooks[`${title}`].map(note => (
                    <li key={Math.random()}>{note.title}</li>
                ))}
            </ul> }
        </div>
     );
}
 
export default NotebookElement;