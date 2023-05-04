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
    const [importantNotes, setImportantNotes] = useState<note[]>([])
    const [showPinned, setShowPinned] = useState(true)
    const { token } = useAppSelector(state => state.user)

    useEffect(() => {
        const fetchAllPinnedNotes = async (token: string) => {
            const notes = await noteService.getPinned(token)
            setImportantNotes(notes)
        }

        const fetchNotebookPinnedNotes = async (id: string, token: string) => {
            const notes = await notebookService.getPinned(id, token)
            setImportantNotes(notes) 
        }

        const fetchAllRecentNotes = async (token: string) => {
            const notes = await noteService.getRecent(token)
            setImportantNotes(notes)
        }

        const fetchNotebookRecentNotes = async (id: string, token: string) => {
            const notes = await notebookService.getRecent(id, token)
            setImportantNotes(notes) 
        }

        if(typeof notebookID === 'string') {
            showPinned 
                ? fetchNotebookPinnedNotes(notebookID, token)
                : fetchNotebookRecentNotes(notebookID, token)
        } else {
            showPinned 
                ? fetchAllPinnedNotes(token)
                : fetchAllRecentNotes(token)
            // fetchAllPinnedNotes(token)
        }
    }, [token, notebookID, showPinned])

    const nextImportantNoteHandler = () => {
        setSkip(prev => prev+1)
        // if(pinnedNotes.length - skip > 3) {
        //     setSkip(prev => prev+1)
        // }
    }
    
    const previousImportantNoteHandler = () => {
        setSkip(prev => prev-1)
        // if(skip > 0) {
        //     setSkip(prev => prev-1)
        // }
    }

    return ( 
        <SectionCard classes={styles.pin}>
            <div className={styles.header}>
                <h2>
                    <button 
                        className={`${showPinned ? styles['active-btn'] : styles['inactive-btn']}`} 
                        onClick={() => setShowPinned(true)}
                    >Pinned Note</button>
                    <button 
                        className={`${!showPinned ? styles['active-btn'] : styles['inactive-btn']}`} 
                        onClick={() => setShowPinned(false)}
                    >Recently Added</button>
                </h2>
                {(skip > 0) 
                    ? <button onClick={previousImportantNoteHandler}>P</button> 
                    : <button>Q</button>
                }
                {(importantNotes.length - skip > 3) 
                    ? <button onClick={nextImportantNoteHandler}>N</button> 
                    : <button>O</button>
                }
            </div>
            <div className={styles['pinned-notes']}>
                {importantNotes.slice(skip + 0, skip + 3).map(note => 
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