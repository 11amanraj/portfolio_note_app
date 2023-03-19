import { useContext } from 'react'
import { TagContext } from '../../store/TagsContextProvider';
import NotesGrid from './NotesGrid';

const AllTags = () => {
    const { allTags } = useContext(TagContext)
    console.log(allTags)

    return ( 
        <div>
            Working
        </div>
     );
}
 
export default AllTags;