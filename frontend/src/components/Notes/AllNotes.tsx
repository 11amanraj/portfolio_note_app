import { useState } from "react"
import SideBar from "../Navigation/SideBar"
import styles from './AllNotes.module.css'
import { note } from '../../shared/interfaces/notes'
import EachNote from "./EachNote"

const AllNotes = () => {
    const [selectedNotebook, setSelectedNotebook] = useState<note[] | null>()

    const noteSelectionHandler = (notebook: note[]) => {
        setSelectedNotebook(notebook)
    }
    
    return (
            <div className={styles.container}>
                <SideBar onSelect={noteSelectionHandler}/>
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

export default AllNotes;