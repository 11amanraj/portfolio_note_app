import styles from './AllNotes.module.css'
import NotesCollection from './NotesCollection';
import axios from 'axios'
import { useEffect, useState, useRef, useCallback } from 'react';
import { CollectionType, note, notebook } from '../../shared/interfaces/notes';
import Loading from '../UI/Loading';

const AllNotes = () => {
    const [notebooks, setNotebooks] = useState<notebook[]>([{
        title: '',
        id: '',
        notes: [{
            title: '',
            content: '',
            author: '',
            id: '',
            pinned: false,
            dateCreated: new Date(0),
            dateModified: new Date(0),
            stringDateCreated: '',
            stringDateModified: ''
        }]
    }])
    const [loading, setLoading] = useState(false)

    const observer = useRef()

    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:8000/api/notebooks')
            .then(response => {
                setNotebooks(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [])

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 0) {
            console.log(e.target.value)
        }
        // if(e.target.value.length > 0) {
        //     if (type === CollectionType.IMPORTANT) {
        //         axios
        //             .get(`http://localhost:8000/api/notes/search/${e.target.value}`)
        //             .then(notes => setNotes(notes.data))
        //     } else {
        //         axios
        //             .get(`http://localhost:8000/api/notebooks/${id}/search/${e.target.value}`)
        //             .then(notebook => setNotes(notebook.data.notes))
        //     }
        // }
    }

    const loadingView = () => {
        return <Loading />
    }

    const url2 = 'http://localhost:8000/api/notebooks/64173d1f503e6a8f3699a977'
    const url3 = 'http://localhost:8000/api/notebooks/6418645795c0466b50572125'

    const galleryView = () => {
        return (
            <section className={styles.collection}>
                <NotesCollection type={CollectionType.IMPORTANT} url={'http://localhost:8000/api/notes/important'}/>
                <NotesCollection type={CollectionType.NOTEBOOK} url={url2}/>
                <NotesCollection type={CollectionType.NOTEBOOK} url={url3}/>
            </section>
        )
    }

    return ( 
        <div className={styles.container}>
            <section className={styles.search}>
                <input onChange={inputHandler} type='text' placeholder='Search Notebook'/>
            </section>
            {
                loading 
                    ? loadingView () 
                    : galleryView()
            }
            {/* <Loading /> */}
            {/* <section className={styles.collection}>
                <NotesCollection />
                <NotesCollection />
                <NotesCollection />
            </section> */}
        </div>
     );
}
 
export default AllNotes;