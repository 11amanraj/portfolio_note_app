import styles from './NotebookAccordion.module.css'
import { useState } from 'react'

const NotebookAccordion = () => {
    const [isActive, setIsActive] = useState(false) 
    const notebook = {
        title: 'Test Notebook',
        id: 'ahasgahj545g4a',
        notes: [
            {
                title: 'First Note',
                id: 0
            },
            {
                title: 'Second Note',
                id: 1
            }
        ]
    }

    const showNotesHandler = () => {
        setIsActive(prev => !prev)
    }

    const showNotes = () => {
        return (
            <div id='sect1' role="region" aria-labelledby="accordion1id">
                <button>Edit Notebook</button>
                <button>Delete Notebook</button>
                <button>{notebook.notes[0].title}</button>
                <button>{notebook.notes[1].title}</button>
            </div>
        )
    }

    return ( 
        <li className={styles.container}>
            <h3>
                <button onClick={showNotesHandler} aria-expanded={isActive} aria-controls="sect1" id="accordion1id">
                    {notebook.title}
                </button>
                <span onClick={() => console.log('deleting')} className={styles.modify}>
                    D
                </span> 
            </h3>
            {isActive && showNotes()}
        </li>
     );
}
 
export default NotebookAccordion;