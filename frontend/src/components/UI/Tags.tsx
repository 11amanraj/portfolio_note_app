import styles from './Tags.module.css'

const Tags: React.FC<{ tag: string, 
    onDelete?: () => void, 
    onSelect: () => void, 
    active: boolean }> = ({ tag, onDelete, active, onSelect }) => {
    return (
        <span 
            onClick={onSelect} 
            className={styles.container}
        >
            <p className={`${styles.title} ${active ? styles.active : ''}`}>
                {tag}
            </p>
        </span>
    );
}

export default Tags;