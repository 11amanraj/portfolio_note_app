import { notebook } from '../../shared/interfaces/notes';
import SectionCard from '../UI/SectionCard';
import styles from './Notebook.module.css'
import { useEffect, useState } from 'react'
import SingleNote from './SingleNote';
import notebookService from '../../services/notebookService';
import { useAppSelector } from '../../store/storeHooks';
import ElementCard from '../UI/ElementCard';

const Notebook: React.FC<{notebook: notebook}> = ({notebook}) => {
    const [notebookDetail, setNotebookDetail] = useState<notebook>({
        id: '',
        title: '',
        notes: []
    })

    const user = useAppSelector(state => state.user)

    useEffect(() => {
        const fetchNotebook = async () => {
            const fetchedNB = await notebookService.getOne(notebook.id, user.token)
            setNotebookDetail(fetchedNB)
            console.log(fetchedNB)
        }

        fetchNotebook()

    }, [notebook, user])

    return ( 
        <SectionCard classes={styles.container}>
            <div className={styles.title}>
                <h2>{notebook.title}</h2>
                <div className={styles.tags}></div>
            </div>
            <ElementCard to='#' className={styles.add}>
                <input></input>
                <h3>Add Note</h3>
            </ElementCard>
            {notebookDetail.notes.map(note => (
                <SingleNote id={note.id} note={note}/>
            ))}
        </SectionCard>
     );
}
 
export default Notebook;