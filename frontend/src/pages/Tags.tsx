import NotesCollection from '../components/NotesGallery/NotesCollection';
import Search from '../components/Operations/Search';
import { CollectionType } from '../shared/interfaces/notes';
import { useContext } from 'react'
import { TagContext } from '../store/TagsContextProvider';
import styles from './Style.module.css'

const Tags = () => {
    const { allTags } = useContext(TagContext)

    return ( 
        <section className={styles.container}>
            <Search />
            {allTags && (allTags.length > 0) && allTags.
                map(tag => <NotesCollection 
                    renderComponent={true} 
                    type={CollectionType.TAG} 
                    url={`http://localhost:8000/api/tags/${tag.id}`}
                    />
            )}
        </section>
     );
}
 
export default Tags;