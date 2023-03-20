import styles from './SingleNote.module.css'
import { Link } from 'react-router-dom';
import { note } from '../../shared/interfaces/notes';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from '../UI/Loading';

const SingleNote: React.FC<{id: string}> = ({id}) => {
    const [note, setNote] = useState<note>({
        title: '',
        content: '',
        author: '',
        id: '',
        dateCreated: new Date(0),
        dateModified: new Date(0),
        pinned: false,
        stringDateCreated: '',
        stringDateModified: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get(`http://localhost:8000/api/notes/${id}`)
            .then(response => {
                setNote(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [id])

    const pinNoteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        // improve this function


        console.log(`Original Status ${note.pinned}`)
        console.log(`Original Status reversed ${!note.pinned}`)
        setLoading(true)
        e.preventDefault()
        e.stopPropagation()

        const pinStatus = !note.pinned

        axios
            .put(`http://localhost:8000/api/notes/${note.id}`, {
                pinned: pinStatus,
                dateModified: new Date()
            })
            .then(response => {
                // console.log(response.data.pinned)
                console.log(response.data)
                console.log(`new Status ${response.data.pinned}`)
                setLoading(false)
                setNote(response.data)
            })
            .catch(error => console.log(error))
    }

    const loadingView = () => {
        return (
            <>
                <Loading />
            </>
        )
    }

    const displayView = () => {
        return (
            <>
                <h2>{note.title}</h2>
                <p>{note.stringDateCreated}</p>
                <button onClick={(e) => pinNoteHandler(e)}>
                    {note.pinned ? 'Unpin Note' : 'Pin Note'}
                </button>
            </>
        )
    }
    
    return (
        <div className={styles.container}>
            <Link to={`/notebook/${note.notebook}/note/${note.id}`} className={`${styles.inner} ${loading ? styles.loading : ''}`}>
                {loading 
                    ? loadingView() 
                    : displayView()
                }
            </Link>
        </div>
    );
}

export default SingleNote;