import { useState, useEffect } from 'react'
import { tag } from '../../shared/interfaces/notes'
import styles from './Tags.module.css'
import Modal from '../UI/Modal'
import { note } from '../../shared/interfaces/notes'
import { useAppDispatch, useAppSelector } from '../../store/storeHooks'
import { deleteOneTag } from '../../reducers/tagsReducer'

const Tags: React.FC<{ tag: tag, 
    onSelect?: () => void,
    assignMode?: boolean,
    active: boolean }> = ({ tag, active, onSelect, assignMode = false }) => {

    const [showModal, setShowModal] = useState(false)
    const [notes, setNotes] = useState<note[]>([])

    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const allTags = useAppSelector(state => state.tags)
    
    useEffect(() => {
        if(showModal) {
            const notes = allTags.find(eachTag => eachTag.id === tag.id)?.notes
            notes && setNotes(notes)
        }
    }, [showModal, allTags, tag])

    const selectionHandler = () => {
        setShowModal(prev => !prev)
    }
 
    const modalView = () => {
        const tagDeleteHandler = () => {
            dispatch(deleteOneTag(tag, user.token))
        }

        return (
          <div className={styles.modal}>
            <h3>{tag.title}</h3>
            <button onClick={tagDeleteHandler}>Delete Tag</button>
            <div>
                {notes.map(note => <p key={note.id}>{note.title}</p>)}
            </div>
          </div>  
        )
    }

    return (
        <span 
            onClick={onSelect && assignMode ? onSelect : selectionHandler} 
            className={styles.container}
        >
            <p className={`${styles.title} ${active ? styles.active : ''}`}>
                {tag.title}
            </p>
            {showModal && <Modal>{modalView()}</Modal>}
            {/* {showModal && <TagModal>{modalView()}</TagModal>} */}
        </span>
    );
}

export default Tags;