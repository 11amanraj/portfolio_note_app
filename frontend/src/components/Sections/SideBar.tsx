import styles from './SideBar.module.css'
import NoteContext from '../../store/note-context';
import { useContext, useState } from 'react';
import NotebookElement from './NotebookElement';
import { note } from '../../shared/interfaces/notes';
// import SelectionContext from '../../store/selection-context';

const SideBar: React.FC<{onSelect: (notebook: note[]) => void}> = ({onSelect}) => {
    const [showBar, setShowBar] = useState(true)
    const noteCtx = useContext(NoteContext)
    // const selectCtx = useContext(SelectionContext)

    // console.log(selectCtx)

    return ( 
        <section className={showBar ? styles.container : styles.hidden}>
            <button className={styles.btn}>X</button>
            <h1>Your Notebooks</h1>
            <div className={styles.title}>
                {noteCtx.headers.map(title => <NotebookElement onSelect={onSelect} key={Math.random()} maxSize={showBar} title={title} />)}
            </div>
            <button onClick={() => setShowBar(prev => !prev)}>hide</button>
        </section>
     );
}
 
export default SideBar;
