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
    const [editTag, setEditTag] = useState(false)
 
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const allTags = useAppSelector(state => state.tags)
    
    useEffect(() => {
        if(showModal) {
            const notes = allTags.find(eachTag => eachTag.id === tag.id)?.notes
            notes && setNotes(notes)
        }
    }, [showModal, allTags, tag])

    const showModalHandler = () => {
        setShowModal(true)
    }

    const closeModalHandler = () => {
        setShowModal(true)
        // setShowModal(prev => !prev)
        // setShowModal(false)
    }
 
    const modalView = () => {
        const tagDeleteHandler = () => {
            dispatch(deleteOneTag(tag, user.token))
        }

        const editTagHandler = () => {
            setEditTag(true)
        }

        return (
          <div className={styles.modal}>
            {!editTag 
                ? (<h3>{tag.title}</h3>) 
                : (<form>
                    <input />
                    <button>save tag</button>
                </form>)
            }
            <button onClick={tagDeleteHandler}>Delete Tag</button>
            <button onClick={editTagHandler}>Edit Title</button>
            <div>
                {notes.map(note => <p key={note.id}>{note.title}</p>)}
            </div>
            <button onClick={closeModalHandler}>Close Modal</button>
          </div>  
        )
    }

    console.log(showModal)

    return (
        <span 
            onClick={onSelect && assignMode ? onSelect : showModalHandler} 
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