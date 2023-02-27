import { useContext } from 'react';
import styles from './Sidebar.module.css'
import NotebookTitles from './NotebookTitles';
import { Link } from 'react-router-dom';
import { NotebooksContext } from '../../store/NotebooksContextProvider';
import AddEntry from '../Operations/AddEntry';
import Filter from '../Operations/Filter';

const SideBar = () => {
    const { notebooks, loading, addNotebook } = useContext(NotebooksContext)

    // Add loading component here

    return ( 
        <div className={styles.container}>
            <Link to={'/'}><h2>TheNotesApp</h2></Link>
            <AddEntry addEntry={addNotebook}/>
            <Filter />
            {/* <input type='text' placeholder='Search Your Notes' name='search' id='search-input'/> */}
            {/* <input type='text' placeholder='Add New Notebook' name='add-notebook' id='add-notebook-input'/> */}
            {notebooks && notebooks.map(notebook => (
                <NotebookTitles key={notebook.id} notebook={notebook}/>
            ))}
        </div>
     );
}
 
export default SideBar;
