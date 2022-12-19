import styles from './Notes.module.css'
import NotesSection from './NotesSection';
import SideBar from './SideBar';
import { useState } from 'react';
import { note } from '../../shared/interfaces/notes';

const Notes = () => {
    const [selectedNotebook, setSelectedNotebook] = useState<note[] | null>(null)

    const noteSelectionHandler = (notebook: note[]) => {
        setSelectedNotebook(notebook)
    }
    
    return ( 
        <div className={styles.container}>
            <SideBar onSelect={setSelectedNotebook}/>
            <NotesSection selectedNotebook={selectedNotebook}/>
        </div>
     );
}
 
export default Notes;