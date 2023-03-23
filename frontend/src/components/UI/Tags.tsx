import styles from './Tags.module.css'

const Tags: React.FC<{ tag: string, 
    onDelete?: () => void, 
    onSelect: () => void, 
    active: boolean }> = ({ tag, onDelete, active, onSelect }) => {
    return (
        <span 
            onClick={onSelect} 
            className={`${styles.container} ${active ? styles.active : ''}`
        }>
            {tag}
            {/* <span className={`${styles.container} ${styles.active}`}> */}
                {/* <span>{tag}</span> */}
                {/* <span onClick={onDelete} className={styles.cancel}>X</span> */}
            {/* <span className={styles.text}>
            </span> */}
            {/* <span className={styles.arrow}></span> */}
        </span>
    );
}

export default Tags;