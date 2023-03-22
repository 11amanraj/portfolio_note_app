import styles from './Tags.module.css'

const Tags: React.FC<{ tag: string, onDelete?: () => void }> = ({ tag, onDelete }) => {
    return (
        <span className={`${styles.container}`}>
            {/* <span className={`${styles.container} ${styles.active}`}> */}
                <span>{tag}</span>
                <span onClick={onDelete} className={styles.cancel}>X</span>
            {/* <span className={styles.text}>
            </span> */}
            {/* <span className={styles.arrow}></span> */}
        </span>
    );
}

export default Tags;