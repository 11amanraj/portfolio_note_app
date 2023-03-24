import { useContext } from 'react'
import NotesCollection from '../components/NotesGallery/NotesCollection';
import Search from '../components/Operations/Search';
import { CollectionType } from '../shared/interfaces/notes';
import styles from './Style.module.css'
import { NotebooksContext } from '../store/NotebooksContextProvider';

const HomePage = () => {
    const importantUrl = 'http://localhost:8000/api/notes/important'

    const { notebooks } =  useContext(NotebooksContext)

    return (
        <section className={styles.container}>
            <Search />
            <NotesCollection
                description={{title: 'Important Notes'}}  
                renderComponent={true} 
                type={CollectionType.IMPORTANT} 
                url={importantUrl} 
            />
            {notebooks && notebooks.length > 0 && notebooks.map(notebook => 
                <NotesCollection
                    key={notebook.id}
                    renderComponent={true}
                    description={{title: notebook.title}} 
                    type={CollectionType.NOTEBOOK}
                    url={`http://localhost:8000/api/notebooks/${notebook.id}`} 
                /> 
            )}
        </section> 
     );
}
 
export default HomePage;