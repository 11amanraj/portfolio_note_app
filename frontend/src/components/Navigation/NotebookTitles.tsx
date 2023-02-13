import styles from './NotebookTitles.module.css'
import { NavLink } from 'react-router-dom'
import { notebook } from '../../shared/interfaces/notes'

const NotebookTitles: React.FC<{notebook: notebook}> = ({notebook}) => {
    console.log(notebook)

    return ( 
        <NavLink 
            className={({isActive}) => isActive ? styles.active : undefined} 
            to={`/notebook/${notebook.id}`}>
                <p className={styles.title}>{notebook.title}</p>
                <div className={styles.notes}>
                    <p>{notebook.notes[0].title}</p>
                    <p>{notebook.notes[1].title}</p>
                </div>
        </NavLink>
     );
}
 
export default NotebookTitles;