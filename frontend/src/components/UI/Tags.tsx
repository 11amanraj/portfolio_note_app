import { useState, useEffect } from 'react'
import { tag } from '../../shared/interfaces/notes'
import TagModal from '../Tags/TagModal'
import styles from './Tags.module.css'
import axios from 'axios'
import Modal from './Modal'
import { note } from '../../shared/interfaces/notes'

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

    useEffect(() => {
        if(showModal) {
            setLoading(true)
            axios
                .get(`http://localhost:8000/api/tags/${tag.id}`)
                .then(response => {
                    setTagDetail(response.data)
                    setLoading(false)
                    console.log(response.data)
                })
                .catch(error => console.log(error))
        }
    }, [showModal, tag])

    const selectionHandler = () => {
        setShowModal(prev => !prev)
    }
 
    const modalView = () => {
        return (
          <div className={styles.modal}>
            <h3>{tag.name}</h3>
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
                {tag.name}
            </p>
            {showModal && <Modal>{modalView()}</Modal>}
            {/* {showModal && <TagModal>{modalView()}</TagModal>} */}
        </span>
    );
}

export default Tags;