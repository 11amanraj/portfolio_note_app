import Notebook from "./Notebook"
import {  useContext } from "react"
import NoteContext from "../../store/note-context"

const AllNotes = () => {
    const noteCtx = useContext(NoteContext)

    return (
        <>
            {noteCtx.notebooks && Object.keys(noteCtx.notebooks).map(key => (
                <div key={key}>
                    <h2>{key}</h2>
                    <Notebook notebook={noteCtx.notebooks && noteCtx.notebooks[key]}/>
                </div>
            ))}
        </>
    );
}

export default AllNotes;