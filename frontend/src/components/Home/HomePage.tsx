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

    useEffect(() => {
        setLoading(true)
        const fetchAllNotes = async (token: string) => {
            const fetchedNotes = await noteService.getAll(token)
            const pinned = await noteService.getPinned(token)
            console.log(pinned)
            setNotes(fetchedNotes)
        }
        fetchAllNotes(user.token)
        setLoading(false)

    }, [user.token])

    const pinNoteHandler = (updatedNote: note) => {
        setNotes(notes
            .map(note => note.id === updatedNote.id ? updatedNote : note)
        )
    }
    
    // const importantUrl = 'http://localhost:8000/api/notes/important'

    // const [renderItem, setRenderItem] = useState<number>(0)
    // const { notebooks } =  useContext(NotebooksContext)

    // const [ref, inView] = useInView({triggerOnce: true})

    // useEffect(() => {
    //     if(inView) {
    //         setRenderItem(prev => prev + 1)
    //     }
    // }, [inView])

    // const dispatch = useAppDispatch()

    // const messageHandler = () => {
    //     const id = Math.random().toString()
    //     const notification = {
    //         message: 'Working',
    //         error: false,
    //         id: id
    //     }
    //     dispatch(addOneNotification(notification))
    // }

    // console.log(notes)

    if(loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <>
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