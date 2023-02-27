import { useEffect, useState } from 'react';
import styles from './Filter.module.css'
import axios from 'axios'
import { note } from '../../shared/interfaces/notes';

const Filter = () => {
    const [showResult, setShowResult] = useState(false)
    const [input, setInput] = useState('')
    const [searchResults, setSearchResults] = useState<note[] | null>(null)

    useEffect(() => {
        if(input.length > 0) {
            axios
                .get(`http://localhost:8000/api/notes/search/${input}`)
                .then(notes => setSearchResults(notes.data))
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
                    {searchResults && searchResults.length > 0 
                        ? searchResults.map(note => <h4 key={note.id}>{note.title}</h4>) 
                        : <h4>No Match Found</h4>
                    }
                </div>
            }
        </>
     );
}
 
export default Filter;