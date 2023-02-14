import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Sidebar.module.css'
import { notebook } from '../../shared/interfaces/notes';
import NotebookTitles from './NotebookTitles';

const SideBar = () => {
    const [notebooks, setNotebooks] = useState<notebook[] | null>(null)

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/notebooks')
            .then(response => 
                setNotebooks(response.data)
            )
    }, [])

    return ( 
        <div className={styles.container}>
            {notebooks && notebooks.map(notebook => (
                <NotebookTitles key={notebook.id} notebook={notebook}/>
            ))}
        </div>
     );
}
 
export default SideBar;
