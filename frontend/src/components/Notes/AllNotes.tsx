import {  useContext, useState } from "react"
import NoteContext from "../../store/note-context"
import SideBar from "../Navigation/SideBar"
import styles from './AllNotes.module.css'
import { note } from '../../shared/interfaces/notes'
import EachNote from "./EachNote"

const AllNotes = () => {
    const [selectedNote, setSelectedNote] = useState<note | null>()
    // const noteCtx = useContext(NoteContext)

    const noteSelectionHandler = (note: note) => {
        setSelectedNote(note)
    }
    
    // if ((noteCtx.loading === null) || noteCtx.loading ) {
    //     return (
    //         <div>Loading ...</div>
    //     )
    // } else if (!noteCtx.loading && (Object.keys(noteCtx.notebooks).length === 0)) {
    //     return (
    //         <div>No notebooks found ...</div>
    //     )
    // }
        
    return (
            <div className={styles.container}>
                <SideBar onSelect={noteSelectionHandler}/>
                {selectedNote && 
                    <div>
                        <EachNote note={selectedNote} />
                    </div>}
            </div>
        )
}

export default AllNotes;