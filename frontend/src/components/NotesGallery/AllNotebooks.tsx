import styles from './AllNotebooks.module.css'
import NotesCollection from './NotesCollection';
import axios from 'axios'
import { useEffect, useState, useRef, useCallback } from 'react';
import { CollectionType, note, notebook } from '../../shared/interfaces/notes';
import Loading from '../UI/Loading';
import Search from '../Operations/Search';

const AllNotebooks = () => {
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

    const galleryView = () => {
        return (
            <section className={styles.collection}>
                <NotesCollection 
                    type={CollectionType.IMPORTANT} 
                    url={'http://localhost:8000/api/notes/important'}
                />
                {notebooks.map(notebook => 
                    <NotesCollection
                        key={notebook.id} 
                        type={CollectionType.NOTEBOOK} 
                        url={`http://localhost:8000/api/notebooks/${notebook.id}`}
                    />)
                }
            </section>
        )
    }

    return ( 
        <div className={styles.container}>
            <Search />
            {/* <section className={styles.search}>
                <input onChange={inputHandler} type='text' placeholder='Search Notebook'/>
            </section> */}
            {
                loading 
                    ? loadingView () 
                    : galleryView()
            }
        </div>
     );
}
 
export default AllNotebooks;