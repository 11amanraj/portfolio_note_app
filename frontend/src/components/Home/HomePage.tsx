import { useContext, useState, useRef, useEffect } from 'react'
import NotesCollection from '../NotesGallery/NotesCollection';
import Search from '../Operations/Search';
import { CollectionType, note } from '../../shared/interfaces/notes';
import styles from './HomePage.module.css'
import { useInView } from 'react-intersection-observer';
import noteService from '../../services/noteService';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import Loading from '../UI/Loading';
import SingleNote from '../NotesGallery/SingleNote';
import { addOneNotification } from '../../reducers/notificationReducer';
import ReactQuill from 'react-quill'
import SectionCard from '../UI/SectionCard';
import Notebook from '../NotesGallery/Notebook';

const HomePage = () => {
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState<note[]>([])
    const [pinnedNotes, setPinnedNotes] = useState<note[]>([])
    const [skip, setSkip] = useState<number>(0)
 
    const user = useAppSelector(state => state.user)
    const notebooks = useAppSelector(state => state.notebooks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setLoading(true)
        const fetchAllNotes = async (token: string) => {
            const fetchedNotes = await noteService.getAll(token)
            const pinned = await noteService.getPinned(token)
            setPinnedNotes(pinned)
            setNotes(fetchedNotes)
        }
        fetchAllNotes(user.token)
        setLoading(false)

    }, [user.token])

    const pinNoteHandler = (updatedNote: note) => {
        const changePinnedNotes = (changedNote: note) => {
            if(updatedNote.pinned) {
                setPinnedNotes(prev => [updatedNote, ...prev])
                dispatch(addOneNotification({
                    message: `${updatedNote.title} pinned`,
                    error: false
                }))
            } else {
                setPinnedNotes(prev => prev.filter(note => note.id !== updatedNote.id))
                dispatch(addOneNotification({
                    message: `${updatedNote.title} unpinned`,
                    error: false
                }))
            }
        }

        changePinnedNotes(updatedNote)
        setNotes(notes
            .map(note => note.id === updatedNote.id ? updatedNote : note)
        )
    }

    const nextPinnedNoteHandler = () => {
        console.log('next')
        setSkip(prev => prev+1)
    }
    
    const previousPinnedNoteHandler = () => {
        if(skip > 0) {
            setSkip(prev => prev-1)
        }
    }

    console.log(notebooks)

    if(loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <>
                <SectionCard classes={styles.pin}>
                    <div>
                        <h2>Pinned Note</h2>
                        <button onClick={previousPinnedNoteHandler}>P</button>
                        <button onClick={nextPinnedNoteHandler}>N</button>
                    </div>
                    {/* <div className={styles['pinned-notes']}>
                        {pinnedNotes.map(note => 
                            <div key={note.id}>
                                <h2>{note.title}</h2>
                                <span>{note.notebook}</span>
                                <ReactQuill theme='bubble' readOnly={true} value={note.content}/>
                            </div>
                        )}
                    </div> */}
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
                {notebooks.map(notebook => <Notebook notebook={notebook} />)}
                {/* <section className={styles.pin}>
                    <div>
                        <h3>Pinned Note</h3>
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
                </section> */}
                <section className={styles['all-notes']}>
                    {notes.map(note => 
                        <SingleNote
                            onPin={pinNoteHandler}
                            key={note.id} 
                            note={note} 
                            id={note.id} 
                        />)}
                </section>
            </>
        )
    }
}
 
export default HomePage;