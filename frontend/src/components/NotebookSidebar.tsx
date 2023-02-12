import styles from './NotebookSidebar.module.css'
import { useState } from 'react'

const NotebookSidebar = () => {
    const [showNotes, setShowNotes] = useState<boolean>(false)

    const noteVisibilityHandler = () => {
        setShowNotes(prev => !prev)
    }

    return ( 
        <div>
            <p onClick={noteVisibilityHandler}>Notebook Sidebar</p>
            {showNotes && 
                <div className={styles.notes}>
                    <p>1st Note</p>
                    <p>2nd Note</p>
                    <p>3rd Note</p>
                </div>
            }
        </div>
     );
}
 
export default NotebookSidebar;