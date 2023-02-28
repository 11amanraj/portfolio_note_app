import { useEffect, useState } from 'react';
import styles from './Filter.module.css'
import axios from 'axios'
import { note, notebook } from '../../shared/interfaces/notes';
import NotesTitle from '../Navigation/NotesTitle';
import NotebookTitles from '../Navigation/NotebookTitles';

const Filter = () => {
    const [showResult, setShowResult] = useState(false)
    const [input, setInput] = useState('')
    const [notes, setNotes] = useState<note[] | null>(null)
    const [notebooks, setNotebooks] = useState<notebook[] | null>(null)

    useEffect(() => {
        // add debouncing later

        if(input.length > 0) {
            axios
                .get(`http://localhost:8000/api/notes/search/${input}`)
                .then(notes => setNotes(notes.data))

            axios
                .get(`http://localhost:8000/api/notebooks/search/${input}`)
                .then(notebooks => setNotebooks(notebooks.data))
        }
    }, [input])

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 0) {
            setShowResult(true)
            setInput(e.target.value)
        } else {
            setShowResult(false)
        }
    }

    return ( 
        <>
            <input type='text' 
                    placeholder='Search Your Notes' 
                    name='search' 
                    id='search-input'
                    onChange={inputHandler}
            />
            {showResult && 
                <div className={styles.container}>
                    {notebooks && notebooks.length > 0 
                        ? notebooks.map(note => <h4 key={note.id}>{note.title}</h4>) 
                        : <h4>No Match Found</h4>
                    }

                    {notes && notes.length > 0 
                        ? notes.map(note => <h4 key={note.id}>{note.title}</h4>) 
                        : <h4>No Match Found</h4>
                    }
                    {/* {notebooks && notebooks.length > 0 && <NotebookTitles notebook={notebooks[0]}/>}
                    {notes && notes.length > 0 && <NotesTitle note={notes[0]}/>} */}
                </div>
            }
        </>
     );
}
 
export default Filter;