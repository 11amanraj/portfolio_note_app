import styles from './NotesCollection.module.css'
import SingleNote from './SingleNote';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { note } from '../../shared/interfaces/notes';

const NotesCollection = () => {
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

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/notes')
            .then(response => setNotes(response.data))
    }, [])

    return ( 
        <section className={styles.container}>
            <div className={styles.backdrop}>
                <div className={styles.title}>
                    <div className={styles.bgd}>
                    </div>
                    <div className={styles.text}>
                        <h1>Important</h1>
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