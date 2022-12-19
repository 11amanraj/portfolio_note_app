import styles from './SideBar.module.css'
import NoteContext from '../../store/note-context';
import { useContext, useState } from 'react';
import NotebookElement from './NotebookElement';
import { note } from '../../shared/interfaces/notes';

const SideBar: React.FC<{onSelect: (notebook: note[]) => void}> = ({onSelect}) => {
    const [showBar, setShowBar] = useState(true)
    const noteCtx = useContext(NoteContext)

    return ( 
        <section className={showBar ? styles.container : styles.hidden}>
            <button className={styles.btn}>X</button>
            <h1>Your Notebooks</h1>
            <div className={styles.title}>
                {noteCtx.headers.map(title => <NotebookElement key={Math.random()} maxSize={showBar} onSelect={onSelect} title={title} />)}
            </div>
            <button onClick={() => setShowBar(prev => !prev)}>hide</button>
        </section>
     );
}
 
export default SideBar;
