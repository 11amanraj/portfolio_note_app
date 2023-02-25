import { useContext } from 'react';
import styles from './Sidebar.module.css'
import NotebookTitles from './NotebookTitles';
import { Link } from 'react-router-dom';
import { NotebooksContext } from '../../store/NotebooksContextProvider';
import AddNotebook from '../CreateNote/AddNotebook';

const SideBar = () => {
    const { notebooks, loading } = useContext(NotebooksContext)

    // Add loading component here

    return ( 
        <div className={styles.container}>
            <h2>TheNotesApp</h2>
            <input type='text' defaultValue='Search' name='search' id='search-input'/>
            <input type='text' defaultValue='Add Notebook' name='add-notebook' id='add-notebook-input'/>
            {/* <Link to={'/newnote'} className={styles.create}>Create Note</Link> */}
            {notebooks && notebooks.map(notebook => (
                <NotebookTitles key={notebook.id} notebook={notebook}/>
            ))}
            <AddNotebook title='Another Notebook'/>
        </div>
     );
}
 
export default SideBar;
