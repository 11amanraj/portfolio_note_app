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

const HomePage = () => {
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState<note[]>([])
    const [pinnedNotes, setPinnedNotes] = useState<note[]>([])
 
    const user = useAppSelector(state => state.user)
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
                setPinnedNotes(prev => [...prev, updatedNote])
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

    if(loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <>
                <section className={styles.pin}>
                    {pinnedNotes.map(note => 
                        <SingleNote
                            onPin={pinNoteHandler} 
                            key={note.id} 
                            note={note} 
                            id={note.id} 
                        />)}
                </section>
                <section className={styles.pin}>
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