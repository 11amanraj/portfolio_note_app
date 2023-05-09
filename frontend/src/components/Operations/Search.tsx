import noteService from '../../services/noteService'
import { useState, useEffect } from 'react'
import { note, notebook, tag } from '../../shared/interfaces/notes'
import { useAppSelector } from '../../store/storeHooks'
import styles from './Search.module.css'
import notebookService from '../../services/notebookService'
import tagService from '../../services/tagService'

const Search = () => {
    const [notes, setNotes] = useState<note[]>([])
    const [notebooks, setNotebooks] = useState<notebook[]>([])
    const [tags, setTags] = useState<tag[]>([])
    const [showResults, setShowResults] = useState(false)
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [searchText, setSearchText] = useState('')
    const { token } = useAppSelector(state => state.user)

    const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 0) {
            setShowResults(true)
            const notesTitle = await noteService.searchTitle(e.target.value, token)
            const notebooksTitle = await notebookService.searchTitle(e.target.value, token)
            const tagsTitle = await tagService.searchTitle(e.target.value, token)
            setNotes(notesTitle)
            setNotebooks(notebooksTitle)
            setTags(tagsTitle)
            // console.log(notesTitle) 
            // console.log(notebooksTitle)
            // console.log(tagsTitle)

            // const notesContent = await noteService.searchContent(e.target.value, token)
        } else {
            setShowResults(false)
        }
    }

    // useEffect(() => {
    //     if(searchText.length > 0) {
    //         const fetchData = async () => {
    //             const fetchedNotes = await noteService.searchTitle(searchText, token)
    //             setNotes(fetchedNotes)
    //             console.log(fetchData)
    //         };
        
    //         const timer = setTimeout(async () => {
    //           await fetchData();
    //         }, 2000);
        
    //         return () => clearTimeout(timer);

    //     }
    //   }, [searchText, token]);
    

    // useEffect(() => {
    //     const requestHandler = async (searchText: string) => {

    //     }

    //     // return clearTimeout(() => {

    //     // }, 200)
    //     // if(searchText.length > 0) {
    //     //     setShowResults(true)
    //     //     const notesTitle = await noteService.searchTitle(e.target.value, token)
    //     //     setNotes(notesTitle)
    //     //     console.log(notesTitle) 

    //     //     // const notesContent = await noteService.searchContent(e.target.value, token)
    //     // } else {
    //     //     setShowResults(false)
    //     // }
    // }, [])

    // const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchText(e.target.value)
    // }

    return ( 
        <div className={`${styles.search} ${isInputFocused ? styles.focus : ''}`}>
            {/* <div className={styles.searching}> */}
                <input onChange={inputHandler} onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)} type='text' placeholder='Search Notebook'/>
                <button>Clear</button>
            {/* </div> */}
            {showResults && 
                <div className={styles.results}>
                    {notes.length > 0 && notes.map(note => (
                        <div key={note.id}>{note.title}</div>
                    ))}
                    {notebooks.length > 0 && notebooks.map(notebook => (
                        <div key={notebook.id}>{notebook.title}</div>
                    ))}
                    {tags.length > 0 && tags.map(tag => (
                        <div key={tag.id}>{tag.title}</div>
                    ))}
                </div>
            }
        </div>
     );
}
 
export default Search;