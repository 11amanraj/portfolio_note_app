import noteService from '../../services/noteService'
import { useState } from 'react'
import { note, notebook, tag } from '../../shared/interfaces/notes'
import { useAppSelector } from '../../store/storeHooks'
import styles from './Search.module.css'

const Search = () => {
    const [notes, setNotes] = useState<note[]>([])
    const [notebooks, setNotebooks] = useState<notebook[]>([])
    const [tags, setTags] = useState<tag[]>([])
    const [showResults, setShowResults] = useState(false)
    const { token } = useAppSelector(state => state.user)

    const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 0) {
            setShowResults(true)
            const notesTitle = await noteService.searchTitle(e.target.value, token)
            setNotes(notesTitle)
            console.log(notesTitle) 

            // const notesContent = await noteService.searchContent(e.target.value, token)
        } else {
            setShowResults(false)
        }
    }

    return ( 
        <section className={styles.search}>
            <input onChange={inputHandler} type='text' placeholder='Search Notebook'/>
            {showResults && 
                <div className={styles.results}>
                    {notes.length > 0 && notes.map(note => (
                        <div key={note.id}>{note.title}</div>
                    ))}
                </div>
            }
        </section>
     );
}
 
export default Search;