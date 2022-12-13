import Notebook from "./Notebook"
import {  useContext } from "react"
import NoteContext from "../../store/note-context"

const AllNotes = () => {
    const noteCtx = useContext(NoteContext)
    
    if ((noteCtx.loading === null) || noteCtx.loading ) {
        return (
            <div>Loading ...</div>
        )
    } else if (!noteCtx.loading && (Object.keys(noteCtx.notebooks).length === 0)) {
        return (
            <div>No notebooks found ...</div>
        )
    }
        
    return (
            <div>
                {noteCtx.notebooks && Object.keys(noteCtx.notebooks).map(key => (
                    <div key={key}>
                        <h2>{key}</h2>
                        <Notebook notebook={noteCtx.notebooks && noteCtx.notebooks[key]}/>
                    </div>
                ))}
            </div>
        )
}

export default AllNotes;