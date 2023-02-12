import { notebook } from '../shared/interfaces/notes';
import styles from './DetailedSection.module.css'

const DetailedSection: React.FC<{notebook: notebook | null}> = ({notebook}) => {
    const book = [
        {
            title: 'The First Note',
            content: 'ahdfjg nadskjgn gnajngk akfmglka',
            author: 'John Doe'
        },
        {
            title: 'The Second Note',
            content: 'ahdfjg nadskjgn gnajngk akfmglka',
            author: 'Jane Doe'
        }
    ]

    return ( 
        <div className={styles.container}>
            {book.map(book => (
                <div key={book.title} className={styles.note}>
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
 
export default DetailedSection;