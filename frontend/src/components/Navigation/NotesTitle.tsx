import { NavLink, useNavigate } from 'react-router-dom'
import { note } from '../../shared/interfaces/notes';
import DeleteEntry from '../Operations/DeleteEntry';
import styles from './NotesTitle.module.css'
import axios from 'axios';
import { useContext } from 'react'
import { NotebooksContext } from '../../store/NotebooksContextProvider';

const NotesTitle: React.FC<{note: note}> = ({note}) => {
    const { rerenderComponent } = useContext(NotebooksContext)
    const navigate = useNavigate()

    const deleteHandler = (id: string) => {
        console.log(id)
        axios
            .delete(`http://localhost:8000/api/notes/${id}`)
            .then(response => {
                rerenderComponent(true)
                navigate(`/notebook/${note.notebook}`)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <NavLink 
                className={({isActive}) => isActive ? styles.active : undefined}
                to={`/notebook/${note.notebook}/note/${note.id}`}>
                        <div className={styles.title}>
                            <span>{note.title}</span>
                            <DeleteEntry onDelete={deleteHandler} id={note.id}/>
                        </div>
            </NavLink> 
        </> 
     );
}
 
export default NotesTitle;