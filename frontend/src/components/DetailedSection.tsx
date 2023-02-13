import { useState, useContext } from 'react';
import { notebook, TypeofSelection } from '../shared/interfaces/notes';
import SelectionContext from '../store/selection-context';
import styles from './DetailedSection.module.css'
import NotesGallery from './DisplaySection/NotesGallery';
import SingleNote from './DisplaySection/SingleNote';

const DetailedSection: React.FC<{notebook: notebook | null}> = ({notebook}) => {
    const [selectedNote, setSelectedNote] = useState<string | null>(null)
    const selectCtx = useContext(SelectionContext)

    const openNoteHandler = (id: string) => {
        console.log(id)
        setSelectedNote(id)
    }

    if(selectCtx.type === TypeofSelection.WELCOME) {
        return (
            <div>
                Please Select A Notebook
            </div>
        )
    } else if (selectCtx.type === TypeofSelection.NOTEBOOK) {
        return (
            <div>
                <NotesGallery id={selectCtx.selected}/>
            </div>
        )
    } else if (selectCtx.type === TypeofSelection.NOTE) {
        return (
            <SingleNote id={selectCtx.selected}/>
        )
    } else {
        return (
            <div>
                Working
            </div>
        )
    }
    // if(selectedNote !== null) {
    //     return (
    //         <div>
    //             {selectedNote}
    //         </div>
    //     )
    // } else if(notebook !== null) {
    //     return (
    //         <NotesGallery onSelect={openNoteHandler} notebook={notebook}/>
    //     )
    // } else {
    //     return (
    //         <div>
    //             Please Select A Notebook
    //         </div>
    //     )   
    // } 
}
 
export default DetailedSection;