import styles from './NotebookTitles.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { notebook } from '../../shared/interfaces/notes'
import NotesTitle from './NotesTitle'
import { useEffect, useState, useContext } from 'react'
import DeleteEntry from '../Operations/DeleteEntry'
import { NotebooksContext } from '../../store/NotebooksContextProvider'
import AddEntry from '../Operations/AddEntry'
import axios from 'axios'
import { MessageContext } from '../../store/MessageContextProvider'

const NotebookTitles: React.FC<{notebook: notebook}> = ({notebook}) => {
    const [isActive, setIsActive] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const { deleteNotebook, rerenderComponent } = useContext(NotebooksContext)
    const { messageHandler } = useContext(MessageContext)

    useEffect(() => {
        const urlArray = location.pathname.split('/')

        if((urlArray[1] === 'notebook') && (urlArray[2] === notebook.id)) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [location, notebook])

    const deleteHandler = (id: string) => {
        deleteNotebook(id)
        // rerenderComponent(true)
    }

    const newNoteHandler = (title: string) => {
        console.log(title)

        const newNote = {
            title: title,
            content: '',
            author: "John Doe",
            notebookID: notebook.id
        }
        
        axios
            .post('http://localhost:8000/api/notes', newNote)
            .then(response => {
                rerenderComponent(true)
                messageHandler(false, `${newNote.title} added !`)
                navigate(`/notebook/${notebook.id}/note/${response.data.id}`, {state:{edit: true}})
            })
            .catch(error => console.log(error))

    }

    
    return (
        <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
            <Link className={isActive ? styles.active : ''} to={`/notebook/${notebook.id}`}>
                <p className={styles.title}>{notebook.title}<DeleteEntry header={`Delete Notebook - ${notebook.title} ?`} onDelete={deleteHandler} id={notebook.id}/></p>
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