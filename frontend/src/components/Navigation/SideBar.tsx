import styles from './SideBar.module.css'
import NoteContext from '../../store/note-context';
import { useContext } from 'react';
import NotebookElement from './NotebookElement';
import { note } from '../../shared/interfaces/notes';

const SideBar: React.FC<{onSelect: (note: note) => void}> = ({onSelect}) => {
    const noteCtx = useContext(NoteContext)

    return ( 
        <section className={styles.container}>
            <h1>Your Notebooks</h1>
            <div className={styles.title}>
                {noteCtx.headers.map(title => <NotebookElement onSelect={onSelect} title={title} />)}
            </div>
        </section>
     );
}
 
export default SideBar;
