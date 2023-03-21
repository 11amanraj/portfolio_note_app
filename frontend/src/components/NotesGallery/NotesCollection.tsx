import styles from './NotesCollection.module.css'
import SingleNote from './SingleNote';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CollectionType, note } from '../../shared/interfaces/notes';

const NotesCollection: React.FC<{type: string, url: string}> = ({type, url}) => {
    const [notes, setNotes] = useState<note[]>([{
        title: '',
        content: '',
        author: '',
        id: '',
        dateCreated: new Date(0),
        dateModified: new Date(0),
        pinned: false,
        stringDateCreated: '',
        stringDateModified: ''
    }])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get(url)
            .then(response => {
                if(type === CollectionType.NOTEBOOK) {
                    setNotes(response.data.notes)
                    // setLink(`/notebook/${response.data.id}/note/`)
                } else if (type === CollectionType.IMPORTANT) {
                    setNotes(response.data)
                }
                setLoading(false)
            })
    }, [type, url])

    return ( 
        <section className={styles.container}>
            <div className={styles.backdrop}>
                <div className={styles.title}>
                    <div className={styles.bgd}>
                    </div>
                    <div className={styles.text}>
                        <h3>Important</h3>
                        <p>Today</p>
                        <div>Tags</div>
                    </div>
                </div>
                {notes.map(note => <SingleNote key={note.id} id={note.id}/>)}
            </div>
        </section>
     );
}
 
export default NotesCollection;