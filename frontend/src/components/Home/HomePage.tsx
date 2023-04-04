import { useContext, useState, useRef, useEffect } from 'react'
import NotesCollection from '../NotesGallery/NotesCollection';
import Search from '../Operations/Search';
import { CollectionType, note } from '../../shared/interfaces/notes';
import styles from './HomePage.module.css'
import { NotebooksContext } from '../../store/NotebooksContextProvider';
import { useInView } from 'react-intersection-observer';
import noteService from '../../services/noteService';
import { useAppSelector } from '../../store/storeHooks';
import Loading from '../UI/Loading';
import SingleNote from '../NotesGallery/SingleNote';

const HomePage = () => {
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState<note[]>([])

    const user = useAppSelector(state => state.user)

    useEffect(() => {
        setLoading(true)
        const fetchAllNotes = async (token: string) => {
            const fetchedNotes = await noteService.getAll(token)
            setNotes(fetchedNotes)
        }
        fetchAllNotes(user.token)
        setLoading(false)
    }, [user.token])
    
    // const importantUrl = 'http://localhost:8000/api/notes/important'

    // const [renderItem, setRenderItem] = useState<number>(0)
    // const { notebooks } =  useContext(NotebooksContext)

    // const [ref, inView] = useInView({triggerOnce: true})

    // useEffect(() => {
    //     if(inView) {
    //         setRenderItem(prev => prev + 1)
    //     }
    // }, [inView])

    if(loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <section className={styles.container}>
                {notes.map(note => <SingleNote key={note.id} note={note} id={note.id} />)}
            </section>
        )
    }
}
 
export default HomePage;