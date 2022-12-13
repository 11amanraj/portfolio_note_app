import Tags from '../UI/Tags';
import styles from './EachNote.module.css'
import { note } from '../../shared/interfaces/notes';

const EachNote: React.FC<{note: note}> = ({note}) => {
    return (
        <div className={styles.container}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            {note.tags.length > 0 
                && <div className={styles.tag}>
                        {note.tags.map(tag => (
                            <Tags key={tag} tag={tag}/>
                        ))}
                    </div> 
            }
        </div>
    );
}

export default EachNote;