import styles from './NotebookTitles.module.css'
import { Link, useLocation } from 'react-router-dom'
import { notebook } from '../../shared/interfaces/notes'
import NotesTitle from './NotesTitle'
import { useEffect, useState } from 'react'

const NotebookTitles: React.FC<{notebook: notebook}> = ({notebook}) => {
    const [isActive, setIsActive] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const urlArray = location.pathname.split('/')

        if((urlArray[1] === 'notebook') && (urlArray[2] === notebook.id)) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [location, notebook])
    
    return (
        <div>
            <Link className={isActive ? styles.active : ''} to={`/notebook/${notebook.id}`}>
                <p className={styles.title}>{notebook.title}</p>
            </Link>
            {isActive && <div className={styles.notes}>
                    {notebook.notes.map(note => (
                    <NotesTitle key={note.id} note={note}/>
                ))}
            </div>}
        </div>
     );
}
 
export default NotebookTitles;