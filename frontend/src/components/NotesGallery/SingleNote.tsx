import styles from './SingleNote.module.css'
import { Link } from 'react-router-dom';
import { note } from '../../shared/interfaces/notes';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from '../UI/Loading';
import noteService from '../../services/noteService';
import { useAppSelector } from '../../store/storeHooks';

const SingleNote: React.FC<{id: string, note: note, onPin?: (updatedNote: note) => void}> = ({id, note, onPin}) => {
    const [loading, setLoading] = useState(false)

    const user = useAppSelector(state => state.user)

    const pinNoteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const update = {
            id: note.id,
            pinned: !note.pinned
        } 

        setLoading(true)
        const updatedNote = await noteService.editOne(update, user.token)
        setLoading(false)
        if(onPin) onPin(updatedNote)
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