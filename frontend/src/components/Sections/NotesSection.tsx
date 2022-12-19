import { useState } from "react"
import styles from './NotesSection.module.css'
import { note } from '../../shared/interfaces/notes'
import EachNote from "../Notes/EachNote"

const NotesSection: React.FC<{selectedNotebook: note[] | null}> = ({selectedNotebook}) => {
    return (
            <div className={styles.container}>
                <div className={styles.bgd}>
                    {selectedNotebook ? selectedNotebook.map(note => (
                            <EachNote key={Math.random()} note={note}/>
                    ))
                                    : 'No Notes Found'
                    }
                </div>
            </div>
        )
}
 
export default NotesSection;