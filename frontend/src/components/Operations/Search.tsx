import styles from './Search.module.css'

const Search = () => {
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 0) {
            console.log(e.target.value)
        }
        // if(e.target.value.length > 0) {
        //     if (type === CollectionType.IMPORTANT) {
        //         axios
        //             .get(`http://localhost:8000/api/notes/search/${e.target.value}`)
        //             .then(notes => setNotes(notes.data))
        //     } else {
        //         axios
        //             .get(`http://localhost:8000/api/notebooks/${id}/search/${e.target.value}`)
        //             .then(notebook => setNotes(notebook.data.notes))
        //     }
        // }
    }

    return ( 
        <section className={styles.search}>
            <input onChange={inputHandler} type='text' placeholder='Search Notebook'/>
        </section>
     );
}
 
export default Search;