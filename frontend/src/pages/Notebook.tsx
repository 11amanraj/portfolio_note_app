import { useParams } from 'react-router-dom'
import NotesCollection from '../components/NotesGallery/NotesCollection'
import Search from '../components/Operations/Search'
import { CollectionType } from '../shared/interfaces/notes'
import styles from './Style.module.css'
import SideBar from '../components/Navigation/Sidebar'

const Notebook = () => {
    const params = useParams()

    const url = `http://localhost:8000/api/notebooks/${params.id}`

    return (
        <>
            <SideBar />
            <section className={styles.container}>            
                <Search />
                <NotesCollection
                        renderComponent={true}
                        type={CollectionType.NOTEBOOK}
                        url={url} 
                    /> 
            </section>
        </>
    )
}
 
export default Notebook;