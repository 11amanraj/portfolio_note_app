import styles from './EachNote.module.css'

interface note {
    id: number,
    title: string,
    body: string
}

const EachNote: React.FC<{note: note}> = ({note}) => {
    return (
        <div className={styles.container}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
        </div>
    );
}

export default EachNote;