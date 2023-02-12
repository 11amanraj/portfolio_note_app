import { notebook } from '../shared/interfaces/notes';
import styles from './DetailedSection.module.css'
import NotesGallery from './DisplaySection/NotesGallery';

const DetailedSection: React.FC<{notebook: notebook | null}> = ({notebook}) => {
    const openNoteHandler = (id: string) => {
        console.log(id)
    }

    if(notebook !== null) {
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