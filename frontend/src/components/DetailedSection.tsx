import { notebook } from '../shared/interfaces/notes';
import styles from './DetailedSection.module.css'

const DetailedSection: React.FC<{notebook: notebook | null}> = ({notebook}) => {
    if(notebook !== null) {
        return (
            <div className={styles.container}>
                {notebook.notes.map(book => (
                    <div key={book.title} className={styles.note}>
                        <div>
                            <h2>{book.title}</h2>
                            <p>{`by ${book.author}`}</p>
                        </div>
                        <p>{book.content}</p>
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <div>
                Please Select A Notebook
            </div>
        )
        
    }
}
 
export default DetailedSection;