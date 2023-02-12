import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Sidebar.module.css'
import { notebook } from '../shared/interfaces/notes';

const SideBar: React.FC<{onSelect: (selectedBook: notebook) => void}> = ({onSelect}) => {
    const [notebooks, setNotebooks] = useState<notebook[] | null>(null)

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/notebooks')
            .then(response => 
                setNotebooks(response.data)
            )
    }, [])

    const titleSelectionHandler = (id: string) => {
        const selectedNotebook = notebooks?.filter(notebook => notebook.id === id)
        selectedNotebook && onSelect(selectedNotebook[0])
    }

    return ( 
        <div className={styles.container}>
            {notebooks && notebooks.map(notebook => <p onClick={() => titleSelectionHandler(notebook.id)} key={notebook.id}>{notebook.title}</p>)}
        </div>
     );
}
 
export default SideBar;
