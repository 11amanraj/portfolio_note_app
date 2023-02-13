import styles from './NotesGallery.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';

// const NotesGallery: React.FC<{notebook: notebook, onSelect: (id: string) => void}> = ({notebook, onSelect}) => {
//     return ( 
//         <div className={styles.container}>
//             {notebook.notes.map(book => (
//                 <div onClick={() => onSelect(book.id)} key={book.id} className={styles.note}>
//                     <div>
//                         <h2>{book.title}</h2>
//                         <p>{`by ${book.author}`}</p>
//                     </div>
//                     <p>{book.content}</p>
//                 </div>
//             ))}
//         </div>
//      );
// }

const NotesGallery: React.FC<{id: string | null}> = ({id}) => {
    const [notes, setNotes] = useState<string[]>()

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/notebooks/${id}`)
            .then(response => {
                setNotes(response.data.notes)
            })
    }, [id])

    return (
        <div>
            {notes && notes.map(note => <p key={note}>{note}</p>)}
        </div>
    )
}
 
export default NotesGallery;