import { useParams } from 'react-router-dom'
import NotesCollection from '../components/NotesGallery/NotesCollection'
import Search from '../components/Operations/Search'
import { CollectionType } from '../shared/interfaces/notes'
import styles from './Style.module.css'

const Notebook = () => {
    const params = useParams()

    const url = `http://localhost:8000/api/notebooks/${params.id}`

    return (
        <section className={styles.container}>            
            {/* {params.id && <AllNotes type={CollectionType.NOTEBOOK} url={url} id={params.id}/>} */}
            {/* <NotesGallery type={CollectionType.NOTEBOOK} url={url} id={params.id}/> */}
            <Search />
            <NotesCollection
                    type={CollectionType.NOTEBOOK}
                    url={url} 
                /> 
        </section>
    )
}
 
export default Notebook;