import { useState } from 'react';
import { notebook } from '../shared/interfaces/notes';
import styles from './DetailedSection.module.css'
import NotesGallery from './DisplaySection/NotesGallery';

const DetailedSection: React.FC<{notebook: notebook | null}> = ({notebook}) => {
    const [selectedNote, setSelectedNote] = useState<string | null>(null)

    const openNoteHandler = (id: string) => {
        console.log(id)
        setSelectedNote(id)
    }

    if(selectedNote !== null) {
        return (
            <div>
                {selectedNote}
            </div>
        )
    } else if(notebook !== null) {
        return (
            <NotesGallery onSelect={openNoteHandler} notebook={notebook}/>
        )
    } else {
        return (
            <div>
                Please Select A Notebook
            </div>
        )   
    } 
}
 
export default DetailedSection;