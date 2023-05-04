import { useEffect, useState } from "react";
import noteService from "../../services/noteService";
import SectionCard from "../UI/SectionCard";
import { note } from "../../shared/interfaces/notes";
import styles from './ImportantNotes.module.css'
import { useAppSelector } from "../../store/storeHooks";
import ReactQuill from "react-quill";
import ElementCard from "../UI/ElementCard";

const ImportantNotes = () => {
    const [skip, setSkip] = useState<number>(0)
    const [pinnedNotes, setPinnedNotes] = useState<note[]>([])
    const { token } = useAppSelector(state => state.user)

    useEffect(() => {
        // setLoading(true)
        const fetchAllNotes = async (token: string) => {
            const pinned = await noteService.getPinned(token)
            setPinnedNotes(pinned)
        }
        fetchAllNotes(token)
        // setLoading(false)
    }, [token])

    const nextPinnedNoteHandler = () => {
        console.log('next')
        setSkip(prev => prev+1)
    }
    
    const previousPinnedNoteHandler = () => {
        if(skip > 0) {
            setSkip(prev => prev-1)
        }
    }

    return ( 
        <SectionCard classes={styles.pin}>
            <div className={styles.header}>
                <h2>Pinned Note</h2>
                <button onClick={previousPinnedNoteHandler}>P</button>
                <button onClick={nextPinnedNoteHandler}>N</button>
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