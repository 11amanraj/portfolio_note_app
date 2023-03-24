import NotesCollection from '../components/NotesGallery/NotesCollection';
import Search from '../components/Operations/Search';
import { CollectionType } from '../shared/interfaces/notes';

const Tags = () => {
    const url = 'http://localhost:8000/api/tags/641b464433f999c895309325'

    return ( 
        <>
            <Search />
            <NotesCollection type={CollectionType.TAG} url={url}/>
        </>
     );
}
 
export default Tags;