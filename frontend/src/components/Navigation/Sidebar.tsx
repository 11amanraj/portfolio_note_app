import { useContext } from 'react';
import styles from './Sidebar.module.css'
import NotebookTitles from './NotebookTitles';
import { Link } from 'react-router-dom';
import { NotebooksContext } from '../../store/NotebooksContextProvider';

const SideBar = () => {
    const { notebooks, loading } = useContext(NotebooksContext)

    // Add loading component here

    return ( 
        <div className={styles.container}>
            <Link to={'/newnote'} className={styles.create}>Create Note</Link>
            {notebooks && notebooks.map(notebook => (
                <NotebookTitles key={notebook.id} notebook={notebook}/>
            ))}
        </div>
     );
}
 
export default SideBar;
