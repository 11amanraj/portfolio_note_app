import NotesCollection from '../components/NotesGallery/NotesCollection';
import { CollectionType } from '../shared/interfaces/notes';
import { useParams } from 'react-router-dom'
import Search from '../components/Operations/Search';

const EachTag = () => {
    const params = useParams()
    const url = `http://localhost:8000/api/tags/${params.id}`

    return ( 
        <>
            <Search />
            <NotesCollection type={CollectionType.TAG} url={url}/>
        </>
     );
}
 
export default EachTag;