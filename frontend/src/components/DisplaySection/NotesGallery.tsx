import styles from './NotesGallery.module.css'
import { notebook } from '../../shared/interfaces/notes';

const NotesGallery: React.FC<{notebook: notebook, onSelect: (id: string) => void}> = ({notebook, onSelect}) => {
    return ( 
        <div className={styles.container}>
            {notebook.notes.map(book => (
                <div onClick={() => onSelect(book.id)} key={book.id} className={styles.note}>
                    <div>
                        <h2>{book.title}</h2>
                        <p>{`by ${book.author}`}</p>
                    </div>
                    <p>{book.content}</p>
                </div>
            ))}
        </div>
     );
}
 
export default NotesGallery;