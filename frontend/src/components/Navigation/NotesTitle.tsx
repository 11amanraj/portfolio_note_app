import { NavLink } from 'react-router-dom'
import { note } from '../../shared/interfaces/notes';
import styles from './NotesTitle.module.css'

const NotesTitle: React.FC<{note: note}> = ({note}) => {
    return ( 
        <NavLink 
            className={({isActive}) => isActive ? styles.active : undefined}
            to={`/notebook/${note.notebook}/note/${note.id}`}>
                <p>{note.title}</p>
        </NavLink> 
     );
}
 
export default NotesTitle;