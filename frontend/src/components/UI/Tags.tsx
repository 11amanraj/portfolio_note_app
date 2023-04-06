import { useState, useEffect } from 'react'
import { tag } from '../../shared/interfaces/notes'
import TagModal from '../Tags/TagModal'
import styles from './Tags.module.css'
import axios from 'axios'
import Modal from './Modal'
import { note } from '../../shared/interfaces/notes'
import { useAppSelector } from '../../store/storeHooks'

interface tagDetail extends tag {
    notes: note[]
}

const Tags: React.FC<{ tag: tag, 
    onSelect?: () => void,
    assignMode?: boolean,
    active: boolean }> = ({ tag, active, onSelect, assignMode = false }) => {

    const [tagDetail, setTagDetail] = useState<tagDetail | null>(null)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const url = `http://localhost:8000/api/tags/${tag.id}`
    const user = useAppSelector(state => state.user)

    // useEffect(() => {
    // })

    useEffect(() => {
        if(showModal) {
            setLoading(true)
            axios
                .get(url, {
                    headers: {
                        Authorization: user.token
                    }
                })
                .then(response => {
                    setTagDetail(response.data)
                    setLoading(false)
                    console.log(response.data)
                })
                .catch(error => console.log(error))
        }
    }, [showModal, tag, url])

    // console.log(tag)

    const selectionHandler = () => {
        setShowModal(prev => !prev)
    }
 
    const modalView = () => {
        const tagDeleteHandler = () => {
            axios
                .delete(url)
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }

        return (
          <div className={styles.modal}>
            <h3>{tag.title}</h3>
            <button onClick={tagDeleteHandler}>Delete Tag</button>
            <div>
                {tagDetail && tagDetail.notes && tagDetail.notes.map(note => <p>{note.title}</p>)}
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