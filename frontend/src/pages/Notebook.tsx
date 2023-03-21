import { useParams } from 'react-router-dom'
import NotesGallery from '../components/DisplaySection/NotesGallery'
import SideBar from '../components/Navigation/Sidebar'
import AllNotes from '../components/NotesGallery/AllNotebooks'
import { CollectionType } from '../shared/interfaces/notes'

const Notebook = () => {
    const params = useParams()

    const url = `http://localhost:8000/api/notebooks/${params.id}`

    return (
        <>
            {/* {params.id && <AllNotes type={CollectionType.NOTEBOOK} url={url} id={params.id}/>} */}
            <NotesGallery type={CollectionType.NOTEBOOK} url={url} id={params.id}/>
        </>
    )
}
 
export default Notebook;