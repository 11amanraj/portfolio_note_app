import styles from './Tags.module.css'

const Tags: React.FC<{ tag: string }> = ({ tag }) => {
    return (
        <span className={styles.container}>
            <span className={styles.text}>
                <span>{tag} </span>
                <span className={styles.cancel}>X</span>
            </span>
            <span className={styles.arrow}></span>
        </span>
    );
}

export default Tags;