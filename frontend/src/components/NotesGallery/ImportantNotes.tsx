import { useEffect, useState } from "react";
import noteService from "../../services/noteService";
import SectionCard from "../UI/SectionCard";
import { note } from "../../shared/interfaces/notes";
import styles from './ImportantNotes.module.css'
import { useAppSelector } from "../../store/storeHooks";
import ReactQuill from "react-quill";
import notebookService from "../../services/notebookService";

const ImportantNotes: React.FC<{ notebookID ?: string }> = (notebookID) => {
    const [skip, setSkip] = useState<number>(0)
    const [pinnedNotes, setPinnedNotes] = useState<note[]>([])
    const { token } = useAppSelector(state => state.user)

    useEffect(() => {
        const fetchAllPinnedNotes = async (token: string) => {
            const notes = await noteService.getPinned(token)
            setPinnedNotes(notes)
        }

        const fetchNotebookPinnedNotes = async (id: string, token: string) => {
            const notes = await notebookService.getPinned(id, token)
            setPinnedNotes(notes) 
        }

        if(typeof notebookID === 'string') {
            fetchNotebookPinnedNotes(notebookID, token)
        } else {
            fetchAllPinnedNotes(token)
        }
    }, [token, notebookID])

    const nextPinnedNoteHandler = () => {
        setSkip(prev => prev+1)
        // if(pinnedNotes.length - skip > 3) {
        //     setSkip(prev => prev+1)
        // }
    }
    
    const previousPinnedNoteHandler = () => {
        setSkip(prev => prev-1)
        // if(skip > 0) {
        //     setSkip(prev => prev-1)
        // }
    }

    return ( 
        <SectionCard classes={styles.pin}>
            <div className={styles.header}>
                <h2>Pinned Note</h2>
                {(skip > 0) 
                    ? <button onClick={previousPinnedNoteHandler}>P</button> 
                    : <button>Q</button>
                }
                {(pinnedNotes.length - skip > 3) 
                    ? <button onClick={nextPinnedNoteHandler}>N</button> 
                    : <button>O</button>
                }
            </div>
            <div className={styles['pinned-notes']}>
                {pinnedNotes.slice(skip + 0, skip + 3).map(note => 
                    <div key={note.id}>
                        <h2>{note.title}</h2>
                        <span>{note.notebook}</span>
                        <ReactQuill theme='bubble' readOnly={true} value={note.content}/>
                    </div>
                )}
            </div>
        </SectionCard>
     );
}
 
export default ImportantNotes;