import styles from './NotebookTitles.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { notebook } from '../../shared/interfaces/notes'
import NotesTitle from './NotesTitle'
import { useEffect, useState, useContext } from 'react'
import DeleteEntry from '../Operations/DeleteEntry'
import AddEntry from '../Operations/AddEntry'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../store/storeHooks'
import { addOneNote, deleteOneNotebook } from '../../reducers/notebooksReducer'
import noteService from '../../services/noteService'

const NotebookTitles: React.FC<{notebook: notebook}> = ({notebook}) => {
    const [isActive, setIsActive] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const urlArray = location.pathname.split('/')

        if((urlArray[1] === 'notebook') && (urlArray[2] === notebook.id)) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [location, notebook])

    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const deleteHandler = async (id: string) => {
        const response = await dispatch(deleteOneNotebook(id, user.token))
        return response
        // deleteNotebook(id)
        // navigate('/')
        // rerenderComponent(true)
    }

    const newNoteHandler = async (title: string) => {
        const newNote = {
            title: title,
            notebookID: notebook.id
        }

        const savedNote = await noteService.createNew(newNote,user.token)
        dispatch(addOneNote({notebookID: notebook.id,note: savedNote}))
        navigate(`/notebook/${notebook.id}/note/${savedNote.id}`, {state:{edit: true}})

        return true
    }
    
    return (
        <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
            <Link className={isActive ? styles.active : ''} to={`/notebook/${notebook.id}`}>
                <p className={styles.title}>
                    {notebook.title}
                    <DeleteEntry 
                        header={`Delete Notebook - ${notebook.title} ?`} 
                        onDelete={deleteHandler} 
                        id={notebook.id}
                    />
                </p>
            </Link>
            {isActive && <div className={styles.notes}>
                    <AddEntry addEntry={newNoteHandler}/>
                    {/* <input 
                        type='text' 
                        placeholder='Add New Note' name='
                        add-note' 
                        id='add-note-input'
                    /> */}
                    {notebook.notes.map(note => (
                    <NotesTitle key={note.id} note={note}/>
                ))}
            </div>}
        </div>
     );
}
 
export default NotebookTitles;