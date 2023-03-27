import { useState } from 'react'
import TagModal from '../Tags/TagModal'
import styles from './Tags.module.css'
import Modal from './Modal'

interface tag {
    name: string,
    id: string
}

const Tags: React.FC<{ tag: tag, 
    onDelete?: () => void, 
    onSelect: () => void,
    assignMode?: boolean,
    showModal?: boolean,  
    active: boolean }> = ({ tag, onDelete, active, onSelect, showModal, assignMode = false }) => {

    const modalView = () => {
        return (
          <div>
            {tag.name}
          </div>  
        )
    }

    return (
        <span 
            onClick={onSelect} 
            className={styles.container}
            id={`${showModal ? 'tag-modal' : ''}`}
        >
            <p className={`${styles.title} ${active ? styles.active : ''}`}>
                {tag.name}
            </p>
            {showModal && <TagModal>{modalView()}</TagModal>}
        </span>
    );
}

export default Tags;