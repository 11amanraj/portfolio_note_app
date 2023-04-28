import styles from './SingleNote.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { note } from '../../shared/interfaces/notes';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from '../UI/Loading';
import noteService from '../../services/noteService';
import { useAppSelector } from '../../store/storeHooks';
import Modal from '../UI/Modal';

const SingleNote: React.FC<{id: string, note: note, onPin?: (updatedNote: note) => void}> = ({id, note, onPin}) => {
    const [loading, setLoading] = useState(false)
    const [transition, setTransition] = useState(false)

    const user = useAppSelector(state => state.user)
    const navigate = useNavigate()
    
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

    const linkTransitionHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setTransition(true)
        e.preventDefault();

        setTimeout(() => navigate(`/notebook/${note.notebook}/note/${note.id}`), 5000);
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

    if(transition) {
        return (
            <div className={styles.transition}>
                <Modal>
                    <div className={styles.child}>Working</div>
                </Modal>
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                <Link onClick={linkTransitionHandler} 
                    to={`/notebook/${note.notebook}/note/${note.id}`} 
                    className={`${styles.inner} ${loading ? styles.loading : ''}`}
                >
                    {loading 
                        ? loadingView() 
                        : displayView()
                    }
                </Link>
            </div>
        );
    }
    
}

export default SingleNote;