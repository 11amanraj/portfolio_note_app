import styles from './NotebookTitles.module.css'
import { NavLink } from 'react-router-dom'
import { notebook } from '../../shared/interfaces/notes'
import NotesTitle from './NotesTitle'

const NotebookTitles: React.FC<{notebook: notebook}> = ({notebook}) => {
    return ( 
        <NavLink 
            className={({isActive}) => isActive ? styles.active : undefined} 
            to={`/notebook/${notebook.id}`}>
                <p className={styles.title}>{notebook.title}</p>
                <div className={styles.notes}>
                    {notebook.notes.map(note => (
                        <NotesTitle key={note.id} note={note}/>
                    ))}
                </div>
        </NavLink>
     );
}
 
export default NotebookTitles;